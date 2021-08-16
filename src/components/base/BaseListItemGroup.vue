<template>
   <v-list-item-group>      
    <v-list-item v-for="btn in buttons[buttonType]" 
                 :key="btn.btn"
                 v-show="btn.optional == 1">  
        <v-list-item-icon>
         <v-icon>
          {{ btn.icon }}
         </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
         <v-list-item-title :title="btnTip(btn)" 
                          @click="doTask(btn.func)">
          {{ btnText(btn.btn) }}
         </v-list-item-title>
       </v-list-item-content>
    </v-list-item>   
   </v-list-item-group>
</template>

<script>
export default {
    name:"Base List Item Group",
    props: {btn:Object},
}
</script>