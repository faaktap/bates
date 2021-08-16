<template>
 <div class="text-left">
    <v-menu offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
               elevation="4"
               v-bind="attrs"
               v-on="on"
               :color="color"
               class="ma-2 no-uppercase"
               rounded
               min-width="150"
        > {{ menuName }}
        </v-btn>
      </template>

      <v-list dense>
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
             <v-icon small> {{ item.icon }} </v-icon>
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
      name: 'baseBasicDropDown',
      props: ['items','disabled','menuName', 'color'],
      data: () => ({
        selectedItem:'',
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
              if ($event > -1) {
                selectedItem = $event
                this.$emit('input', this.items[$event].title)
              }
          }
      },
      /*
      watch:{
          selectedItem(n,o){
              tconsole.lg('wath: new=', o, 'old=',n)
              if (o != n && this.items[n].title) {
                  this.$emit('input', this.items[n].title)
              }
              //this.selectedItem = null
          }
      }
      */
  }
</script>

<style scoped>
.no-uppercase {
     text-transform: none;
}
</style>