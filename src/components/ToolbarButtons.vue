<!--
   This is a grouping together of actions. 
     If vertical is true, it will build them in a line via buttons.
   If vertical is false, we build a list.
   If prop vertical is false, it will built the in a vertical list. via list items
   If btn.optional is 1, then we do not display it in toolbar.
   If btn.optional is 0, then we do not display it in dropdown. 
   Therefore - IT IS USED IN TWO PLACES!
   We call doStuff to execute any action, expect i18n translate is done in here.
-->
<template>
 <div>
<!--  m= {{ $vuetify.breakpoint.mobile }} sm={{ $vuetify.breakpoint.smAndDown }} -->
{{ menuDisplay }} {{ buttonGroup }}
    <template v-if="menuDisplay == 'horizontal'">
      <v-btn v-for="btn in buttons[ buttonGroup[0] ]" 
            :key="btn.btn" 
            class="ma-2"
            :x-small="$vuetify.breakpoint.smAndDown == true"
            :title="btnTip(btn)" 
            @click="doTask(btn.func)" 
            v-show="!btn.optional == 1"> 

        <v-icon :small="$vuetify.breakpoint.smAndDown == true" class="ma-1">
          {{ btn.icon }}
        </v-icon>
        <div v-if="!$vuetify.breakpoint.smAndDown">
          {{ btnText(btn.btn) }}
        </div>

      </v-btn>
      <!--/div-->
    </template>
    <template v-if="menuDisplay == 'vertical'">
     <v-list color="primary">

      <!--subheader on dropdown, to "group" button -->
      <!--v-subheader> 
        {{ buttonGroup }}
      </v-subheader-->

      <v-list-item-group>      
       <v-list-item v-for="btn in buttons[buttonGroup[0]]" 
                 :key="btn.btn"
                 v-show="btn.optional == 4">   <!--Should be 1, but we want to hide them -->
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

     </v-list>
    </template>

    <template v-if="menuDisplay == 'shortcutlist'">
       <!-- {{ menuDisplay }} -->
    <v-layout color="blue-grey lighten-5" >
      <v-flex>
      <v-card xs12 sm6 class="pa-2"  
              color="blue-grey lighten-5" 
              width="99%"
              v-for="toolGroup in buttonGroup"  :key="toolGroup"> 
               <!-- {{ buttons[toolGroup] }} -->
               <i>{{ toolGroup }}</i>
        <v-layout row wrap>
        <v-flex xs12 sm6 class="pa-1"
               v-for="btn in buttons[toolGroup]"  :key="btn.btn">   
       <v-card max-width="400"  class="ma-2" 
               color="grey lighten-5"
               :x-small="$vuetify.breakpoint.smAndDown == true">   
        <v-card-title>
         <v-btn small @click="doTask(btn.func)" :title="btnTip(btn)"> 
           <v-icon small>{{ btn.icon }}</v-icon>
           {{ btnText(btn.btn) }} 
         </v-btn>
        </v-card-title>         
       </v-card>
      </v-flex>       
       </v-layout>
      </v-card>
      </v-flex>

    </v-layout>
    </template>


 </div>
</template>

<script>
//
// button names, function and doStuff to execute them...
//
import { doStuff,buttons } from '@/api/buttons'
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
export default {
 name: "ToolbarButtons",
 props:{ menuDisplay: {type:String, required:true}, 
         buttonGroup: {type:Array, required:true},
       },
 components: {},
 data: () => ({
   buttons: buttons,
 }),
 methods: {
   btnText(p1) { return this.$t('btn.' + p1) },
   btnTip(p1) { return this.$t('btn.tip'+p1.btn) },  
   doTask(task) {
     /* Boring tasks about router, done in buttons.js */
     if (!doStuff(this.$router,task)) {
        /* If doStuff above cannot handle the task, we switch to local tasks */
        switch (task) {
          case "testConfirm":
             infoSnackbar('Hello from snackbar!');
             this.$root.$confirm(this.Delete, this.AreYouSure, { color: 'red' })
                               .then((confirm) => {
                                                  if (confirm) { 
                                                    infoSnackbar('Jy het confirm! Baie mooi!')
                                                  } else {
                                                    errorSnackbar('Hoekom nie?')
                                                  }
                                 })
             break
          case "switchLocale": 
            return this.switchLocale ()
          default:      
            alert('we do not understand : ' + task)
        }
     }
   },
   switchLocale () {
     if (this.$i18n.locale === 'af') {
         this.$i18n.locale = 'en'
     } else {
         this.$i18n.locale = 'af'
     }
     localStorage.setItem('currentLocale',this.$i18n.locale)
   }
 },
 computed: {
   AreYouSure()    { return this.$t('message.AreYouSure') },
   Delete()        { return this.$t('message.Delete') },
   displayLocale() {
      let other = 'af'
      if (this.$i18n.locale === 'af') {
        other = 'en'
      }
      return other
   }
 },
 mounted: function () {
   //MNT TBB
   console.log   ('mounting :', this.$options.name
                           , 'c=', this.$children.length
                           , this.menuDisplay
                           , this.buttonGroup
              )
   
 }
}
</script>

