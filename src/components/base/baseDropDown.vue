<template>
 <div class="text-left">
    <v-menu offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn rounded
               elevation="4"
               v-bind="attrs"
               v-on="on"
               color="primary"
               large
        > 
        <v-icon color="white"> mdi-menu-down   </v-icon> {{ menuName}}
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group
           color="primary"
           :value="selectedItem"
           @change="doChange(selectedItem,$event)"
        >
        <v-list-item 
          v-for="(item, index) in items"
          :key="index"
        >
         <v-list-item-icon> 
             <v-icon> {{ item.icon }} </v-icon>
         </v-list-item-icon>
         <v-list-item-title> 
              {{ item.title }} 
          </v-list-item-title>
        </v-list-item>
       </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
      name: 'baseDropDown',
      props: ['items','disabled','menuName'],
      data: () => ({
        selectedItem:'',
        prevSel:''
      }),      
      methods:{
          //Note, it is IMPORTANT to know what is emitted by your dropdown.
          //In this case, "change" worked - but it might be different for other components.
          doClick(e) {
              this.$emit('input', e)
          },
          doFocus(e) {
              this.$emit('input', e)
          },
          doInput(e) {
              this.$emit('input', e)
          },
          doChange(selectedItem,$event) {
              console.log(selectedItem)
              if ($event > -1) {
                selectedItem = $event
                this.$emit('input', this.items[$event].title)
                this.prevSel = $event
                this.selectedItem = null
                selectedItem = null
              } else {
                this.$emit('input', this.items[this.prevSel].title)
              }
          }
      },
      mounted() {
        this.selectedItem = ''
      }
      /*
      watch:{
          selectedItem(n,o){
              //this.$cs.l('wath: new=', o, 'old=',n)
              if (o != n && this.items[n].title) {
                  this.$emit('input', this.items[n].title)
              }
              //this.selectedItem = null
          }
      }
      */
  }
</script>