<template>
  <component :is="layout">

   <div  v-if="demo == 1" class="info">*APPLAYOUT*</div>
    <!--transition name="fade" mode="out-in"-->
    <slot />
    <!--/transition-->
   <div  v-if="demo == 1" class="info">*APPLAYOUT*</div>

  </component>
</template>

<script>
import  {zmlConfig } from '@/api/constants.js'
export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || zmlConfig.defaultLayout
      return () => import(`@/layouts/${layout}.vue`)
    }
  },
  data: () => ({
    demo:1,
  }),
  mounted: function () {
      this.demo = zmlConfig.demo
  }
}
</script>

<style scoped>
.info {
  background-color:gray;
  text-align: center;
  height: 5rem;
}
</style>