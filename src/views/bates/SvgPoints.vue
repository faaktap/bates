<template>
<!-- https://stackoverflow.com/questions/44695560/how-can-i-import-a-svg-file-to-a-vue-component/56855843#56855843 -->
<svg class="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1355.94 410.97"
    @click="showWhat">
  <g id="Performance" @click="select($event)">
      <rect x="598.2" width="167.65" height="26" fill="#d50037"></rect>
      <text><tspan x="45.4844" y="34.5469">Finn</tspan></text>
  </g>
  <g ref="werner1" id="werner" @click="select($event)">
    <rect y ="100" x="598.2" width="167.65" height="26" fill="green"></rect>
      <text x="598.2" y="110" > werner </text>
  </g>
</svg>
</template>

<script>
export default {
  name: "Outline",
  components: {},
  data: () => ({
      sel:'type',
  }),
  methods:{
     select: function(event) {
            let targetId = event.currentTarget.id;
            console.log(targetId); // returns 'foo'
            this.startSomething(targetId)
     },
     showWhat(e1,e2) {
            console.log('showwat:',e1,e2)
     },
     startSomething(x){
            alert('start ' + x)
     },
  },
  mounted() {
      console.log('Table Filter Example : ',this.$options.name)
  }

}
</script>
