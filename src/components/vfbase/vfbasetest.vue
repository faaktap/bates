<template>
<div>
    <BaseBreakpointDisplay />

     <v-card color="blue" class="mx-6 pa-4">
       myschema length = {{  Object.keys(mySchema).length }}   
<v-form v-if="mySchema &&  Object.keys(mySchema).length > 1"
        class="border-frame" color="red"
        >
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        id="myform"
        :model="myModel"
        :schema="mySchema"
        :col=12
        @input="log"
        @click="test"
        @blur="test"
      >
      <template #slot-top-myform>   
          <h4 class="slot">
            Top Slot of 'Form'
          </h4>
      </template>
      <template #slot-bottom-myform>
          <h4 class="slot">
            Bottom Slot of 'Form'
          </h4>  
      </template>
      <!--
      <template #slot-top-key-myform-radioX="{obj,id,index}">
          <h4 class="slot">SlotreplacesItem with Key
             '{{obj.key}}'
            <div>Formbase: {{id}}</div>
            <div>Index: {{index}}</div>
            <div>Obj:{{obj}}</div>  {{ obj.key }}
          </h4>
      </template>
      <template #slot-top-key-myform-group1-name1>
          <p class="slot caption">This is a short summary about name1
          </p> 
      </template>

      <template #slot-top-type-myform-group="{obj}">
          <h4 v-if="obj.key=='group1'" class="slot">
            Slot at Top of Type Group {{ obj.schema.label }}
          </h4>
          <h4 v-else class="slot">
            {{ obj }}
          </h4>
      </template>
      -->
      </v-form-base>  
 <!--
        // compose listener to one or more of following Events:
        @focus= "log"
        @input= "log"
        @click= "log"
        @blur=  "log"        
        @resize= "log"
        @intersect="log"      // intersect - https://vuetifyjs.com/en/directives/intersect
        @clickOutside= "log"  // clickOutside - https://vuetifyjs.com/en/directives/click-outside/
        @swipe=  "log"        // touch events        
        @mouseleave="log"
        @mouseenter="log"
        @dragstart="dragstart"
        @dragover="dragover"
        @drop="drop"
      -->
</v-form>
     </v-card>
     {{ myModel }}
</div>
</template>

<script>

import vFormBase from "@/components/vfbase/vFormBase"
import BaseBreakpointDisplay from "@/components/base/BaseBreakpointDisplay"

//part of schema
//const mask = '####-####-####-####'
const accept = 'image/*'
const options = ['A', 'B', 'Ccccccc']
const subject1 = ['Afrikaans HL', 'Afrikaans 2nd', 'Afrikaans 3rd']
export default {
  name: "vfbasetest",

  components: {BaseBreakpointDisplay
            , vFormBase
            },

  data: () => ({
    myModel: {
      radioX:null,
      radioS1:null,
      radioS2:null,
      name1:'Taleb', 
      check1:true,
          btnToggleSingle: ['B'],
          slider:33,                    
          radio: 'A',
          switch: true,
      name2: 'Base',
      password: 'abcdefgh',
      file: [], // array of File objects
      a1: false,
      a2: false,
    },     
    /*
      SCHEMA
      Order of Props in Schema defines Order of Controls in Form 
      Most controls are based on vuetify and therefore the properties of these controls can be used in 
      
      schema:{ type:'text', hint:'myHint', prependIcon:'print'... } 
      maps to <v-text-fields hint="myHint" prepend-icon="print" > 
      -> https://vuetifyjs.com/en/components/text-fields/   
    */
   mySchema: { 
    radioX: { type: 'radio'
            , label: 'RadioX'
            , options
            , row:true },
    radioS1: { type: 'radio'
             , label: 'Subject1'
             , options: ['Afrikaans HL', 'Afrikaans 2nd', 'Afrikaans 3rd'
                        ,'English Home Language1'
                        ,'English Home Language2'
                        ,'English Home Language3' ]
             , col:12 
             , md:6           
             , row:true },
    radioS2: { type: 'radio'
             , label: 'Subject22'
             , options: subject1
             , col:12        
             , md:6     
             , row:false },
    group1: { type:'group'
            , label:'xxxxxxxxxxxGroup 1'
            , col:12
            , ripple:false
            , class:'title pa-2 rounded elevation-4 col-md-6', 
     schema:{
              name1: { type: 'text', 
                       label:'Naaaaaaame 1' },    
              check1: { type: 'checkbox', 
                       label: 'Checkbox 1',
                       solo:true, 
                       color: 'red' },       
        controls: {
          btnToggleSingle: { type: 'btn-toggle',
                             options, 
                             color:'purple', 
                             multiple: false, 
                             cols:12,
                             class:"col-md-6",
                             tooltip: 'Choose one' },
           // v-slider doesn't work with col:{ cols='auto' }
          slider: { type: 'slider', 
                    color: 'green',
                    tooltip: 'Slider to check',
                    ripple:false,
                    col:6, 
                    thumbSize:18, 
                    thumbLabel:'always' },
          radio: { type: 'radio', label: 'Radio', options, row:true },
          switch: { type:'switch', label:'Switch'}
        }

     }
    },      
    group2: { type:'group', label:'Group 22222222222222222',
              col:12, 
              class:'title pa-2 rounded elevation-4', 
     schema:{           
      name2: {   
        type: 'text',
        solo:true, 
        label:'Label4Name2',
        tooltip:"Can we ass a tooltp here???",
      },     
      password: { 
        type: 'password',
        clearable: true,
        solo:true,
        class:'mx-1 mt-1'
      },        
      file: { 
        type: 'file', 
        label: 'Images', 
        showSize:true,
        counter:true,
        accept, 
        multiple: true,
      },
      a1: { type:'checkbox',
             label:'A-1',
             col:12,
             tooltip: 'Checkboxxxxxxx x x xxxxx'
          },
      a2: { type: 'switch', 
            label: 'B-D-B', 
            value: 'checked', 
            tooltip: 'Tooltip for switch BDB - see explanations',
            color: 'red' },
       }
    }},
    
  }),
  methods:{
      log(a) {
          console.log('LOG A = ', a)
      },
      test(a) {
        let { on, id, index, key, value, obj } = a
        console.log('TEST A = ',a)
        console.log('key = ', a.key)
        console.log('value = ', a.data.key)
        console.log('RadioS2 = ', a.data.radioS2)
        console.log('on,id,index...', on, id, index, key, value, obj)
      }
  }
}
</script>