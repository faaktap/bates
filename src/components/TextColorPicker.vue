<template>
 <div>

   <v-container class="grey lighten-5" fluid>
     <v-row xno-gutters> 
     <v-col cols="12" sm="7" lg="5" v-for="(c,i) in baseColors" 
            :key="i" 
     >
     <v-card color="yellow" class="text-center ma-0">

     <v-row no-gutters>
      <v-col cols="12" sm="6" lg="4"  v-for="(t,j) in tint" :key="j">
       <v-card color="gray lighten-5" class="text-center ma-1">
         <!-- on small it is 4 columsn, on md it is taken up 3 cols and on large it is 2 columns-->
         <v-row no-gutters>
          <v-col cols="12" md="4" v-for="(v,k) in variant" :key="k" class="ma-1 pa-1">
           <template v-if="v=='1' && t=='darken'">
             <v-card class="ma-1 text-center" 
                    :color="c + ' ' + t + '-' + v" > {{c}}  {{t}} {{v}}</v-card>
            </template>
            <template v-else>
            <v-card min-width=70 
                     :color="c + ' ' + t + '-' + v" 
                     @click="colorSelected(c + ' ' + t + '-' + v)"
                     class="ma-1 text-center"
            > {{c.substr(0,2) }}   {{ t.substr(0,1) + v}}    </v-card>
            </template>
           
         </v-col>
        </v-row>   
         </v-card>            
      </v-col>
     </v-row>       
     </v-card>
    </v-col>
     </v-row>
   </v-container>

       <!-- important grid tip - use cols for the v-for!!!! -->
   <v-container class="grey lighten-5">
      <v-row no-gutters>
       <v-col cols="12" md="2" lg="1'" 
              color="blue" 
              v-for="(v,k) in [1,2,3,4,5,6,7]" :key="k" 
              class="ma-2 pa-0">
         <v-card color="red"> Playground {{v}} of 7 cards  
          <v-row>           
           <v-col cols="12" md="6" v-for="(w,i) in [1,2,3,4]" :key="i">
            <v-card 
                    color="green"
                    tile 
                    class="ma-1 pa-0 text-center"
            >
               inside playground {{i}} of 3
            </v-card>
           </v-col>
         </v-row>               
         </v-card>
       </v-col>
     </v-row>   
    </v-container>    

   below is sm=4 (3 cards in a row), and inside is sm=6 (2 cards in a row)
   maar hy fit net 2 kaarte in 'n ry - hoekom?
   <v-container class="grey lighten-5" fluid>
      <v-row no-gutters>
       <v-col cols="12" sm="4" v-for="(v,k) in [1,2,3,4]" :key="k" class="ma-2 pa-0">
         <v-card color="red" tile > {{k}} of  {{v}} cards sm=4 </v-card>
          <v-row>           
           <v-col cols="3" sm="6" v-for="(w,i) in [1,2,3,4,5]" :key="i">
            <v-card 
                    color="green"
                    tile 
                    class="ma-1 pa-0 text-center"
            >
                {{i}} of {{w}} cards sm=6
            </v-card>
           </v-col>
         </v-row>               
       </v-col>
     </v-row>   
    </v-container>    

 </div>
</template>


<script>
export default {
   name:"TextColorPicker",
   props:[],
   data: () => ({
      loading:false,
      baseColors:['red','pink','lightpink','green','teal','lime','yellow'
                ,'amber','orange'
                ,'purple','magenta'
                ,'indigo','blue', 'lightblue','darkblue', 'darkblueshade'
                ,'gray','neutralgray'
                ,'lightgray','white','brown'
                ],
      tint:['darken','lighten','accent'],
      variant:[1,2,3,4],
      col:null
   }),
   computed: {
        interface: {
          get() {
              return this.value
            },
            set(val) {
              this.$emit('input', val)
            }
        }
    },
    methods:{
       colorSelected(color) {
          this.col = color
          //this.$emit('input', color)
       }
   },
}
</script>