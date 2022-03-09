<template>
 <div v-if="dataList && dataHeader" id="printMe">
<div class="print" style="float: left;">DKHS-BTS</div>
<div class="print" style="float: right;">High School De Kuilen Hoërskool</div>
   <v-row no-gutters class="mb-6" >
    <v-col cols="12" class="heading-2 text-center">
      <v-card class="pa-2"  color="blue" >
          VIEWER :  {{ userHeader }}
      </v-card>
    </v-col>
   </v-row>

  <v-card class="ma-2">
   <v-data-table
    :headers="dataHeader"
    :items="dataList"
    :items-per-page="45"
    class="elevation-2"
    disable-pagination
    hide-default-footer
    @click:row="clickOnRow"
   >
   </v-data-table>
 </v-card>
 </div>
</template>


<script>
import printJS from "print-js";
import { zDate } from '@/api/zDate.js';
export default {
    name:"zmlDataTable",
    props: ['dataList', 'userHeader','doPrint'],
    data: () => ({
        dataHeader: [
          {text: 'User',             value: 'user_name' },
          {text: 'Type',             value: 'user_type' }
        ]
    }),
    methods:{
      clickOnRow(p1,p2) {
        console.log('p1 = ', p1)
        console.log('p2 = ', p2)
        this.$emit('clickOnRow',p1,p2)
      },
      onButtonClick(todo,data) {
        console.log(todo, data)
      },
      reBuildHeaders() {
          this.dataHeader = []
          Object.keys(this.dataList[0]).forEach(ele => {
              this.dataHeader.push( {text:ele.toUpperCase(), value:ele } )
          })
      },
      printIt() {
        // console.log(this.$VueHtmlToPaper);
        // this.$htmlToPaper('printMe');
        // alert('wait')
        const style = `
          @page { margin-top: 10px }
          @media print {
          .print  {display:block}\
          body {overflow: auto;height: auto;font:Garamond;}\
          h1 { color: #1c3a1b }\
          heading { color: #1c3a1b }\
          p.bodyText {font-size:10pt}\
          th, td {border-radius:6px; padding: 10px;margin: 10px; border: 1px solid #67656d;}\
          aside {display: none;}\
          main {display: block;}\
         }`
        const headerStyle = "font-weight: 300; align: center;font:Garamond";
          printJS({
           printable: "printMe",
           type: "html",
           header: this.userHeader + " ( " + zDate.format(zDate.todayNoHours(),'yyyy-MM-dd') + " )",
           headerStyle: headerStyle,
           style: style,
           scanStyles: false,
           onPrintDialogClose: () => console.log("The print dialog was closed"),
           onError: e => console.log(e)
          });

/*  Other way of printing the data....
            // Get HTML to print from element
            (this.$refs)
            let prtHtml = '<table style="border-collapse: collapse">'

            prtHtml += '<tr>'
            Object.keys(this.dataList[0]).forEach(ele => {
              prtHtml += '<th class="capitalize-first" style="border: 1px solid #CDCDCD">' + ele + '</th>'
            })
            prtHtml += '</tr>'

            this.dataList.forEach(ele => {
                prtHtml += '<tr>'
                Object.keys(ele).forEach(item => {
                  prtHtml += '<th>' + ele[item] + '</th>'
                })
                prtHtml += '</tr>'
            })
            prtHtml += '</table>'
            // Get all stylesheets HTML
            let stylesHtml = ''
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
              stylesHtml += node.outerHTML;
            }
            // Open the print window
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            WinPrint.document.write(`<!DOCTYPE html>
            <html>
              <head>
                ${stylesHtml}
              </head>
              <body>
                ${prtHtml}
              </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
*/
      }

    },
    computed:{
        listLength() {
            if (this.dataList) {
                return this.dataList.length
            } else {
                return 0
            }
        },
        objectLength() {
            if (this.dataList && this.dataList.length) {
                return Object.entries(this.dataList[0])
            } else {
                return 0
            }
        }

    },
    mounted: function() {
        this.reBuildHeaders()
    },
    watch: {
        listLength () {
          this.reBuildHeaders()
        },
        objectLength () {
          this.reBuildHeaders()
        },
        doPrint () {
          if (this.doPrint > 0) this.printIt()
        }
    }
}
</script>

<style scoped>
.print {display:none;}
@media print {
  body {
    overflow: auto;
    height: auto;
  }
  .scroll-y {
     height: auto;
     overflow: visible;
  }
  .v-dialog--fullscreen {
     position: absolute;
     overflow: visible;
  }
}
.capitalize-first {
  text-transform: lowercase;
}
.capitalize-first::first-letter {
  text-transform: uppercase;
}
</style>