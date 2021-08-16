<template>
    <div>
        <v-btn x-small @click="recalc">Base BreakPoint Display {{ $vuetify.breakpoint.name }}</v-btn>
        {{w}}
        <span v-for="b in Object.entries(bp)" :key="b[0]">
            <span v-if="b[1] == false" class="red mx-1"> {{ b[0] }} </span>
            <span v-else class="green mx-1"> {{ b[0] }} </span>
        </span>
   </div>
</template>

<script>
export default {
    name:"Breakpoints",
    data: () => ({
        bp:{},
        w:0
    }),
    methods: {
        recalc() {
          this.bp = {}
          this.bp = {
            xlOnly     : this.$vuetify.breakpoint.xlOnly
           ,lgOnly     : this.$vuetify.breakpoint.lgOnly
           ,mdOnly     : this.$vuetify.breakpoint.mdOnly
           ,smOnly     : this.$vuetify.breakpoint.smOnly
           ,xsOnly     : this.$vuetify.breakpoint.xsOnly
           ,mobile     : this.$vuetify.breakpoint.mobile
           ,lgAndDown  : this.$vuetify.breakpoint.lgAndDown
           ,mdAndDown  : this.$vuetify.breakpoint.mdAndDown
           ,smAndDown  : this.$vuetify.breakpoint.smAndDown
           ,lgAndUp    : this.$vuetify.breakpoint.lgAndUp             
           ,mdAndUp    : this.$vuetify.breakpoint.mdAndUp
           ,smAndUp    : this.$vuetify.breakpoint.smAndUp
           ,poep    : this.$vuetify.breakpoint.mobileBreakpoint
          }
          this.w =  window.innerWidth
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
          this.w = window.innerWidth
        })
        this.recalc()
    },
    watch: {
        w(){
          if (this.w !=  window.innerWidth) {
              this.recalc()
              console.log(this.w, this.$vuetify.breakpoint.mobile)              
          }
        }
    }
}
</script>

<style scoped>
.rred {background-color:red};
.gggreen {background-color:green};
</style>