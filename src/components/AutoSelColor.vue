<template>
<div>
    <v-autocomplete 
        v-if="cols && cols.length > 0"
        cache-items
        clearable
        open-on-clear
        v-model="what"
        v-on:input="$emit('input', what)"
        :items="cols"
        label="Colors">
    </v-autocomplete> <!--//return-object -->
   <div v-else>
     (No Subject Data Available)
   </div>

</div>
</template>


<script>
export default {
   name: "AutoSelColor",
   props:[],
   data: () => ({
      loading:false,
      baseColors:['red','green','blue','yellow','pink','purple','indigo','teal','lime','orange','brown','amber'],
      tint:['darken','lighten','accent'],
      variant:[1,2,3,4],
      cols:['red','blue'],
      search: null,
      what: null,

   }),
   methods:{
    buildIt() {
     console.info('START with BuildIT')
     this.cols.push('red')
     for (let i=0; i<this.baseColors.length; i++) {
      for (let j=0; j<this.tint.length; j++) {
         for (let k=0; k<this.variant.length; k++) {
             this.cols.push( this.baseColors[i] + ' ' + this.tint[j] + '-' + this.variant[k] )
         }
      }
     }
     console.info('done with BuildIT')
    }
   },
   mounted: function () {
    if (this.cols.length < 4) {  this.buildIt() }
    this.what = this.cols.find(item => item == this.initialValue)
   },
   watch: { 
    initialValue() {
       if (this.cols.length < 4) {  this.buildIt() }
       this.what = this.cols.find(item => item.id == this.initialValue)
    }
   }
}
</script>