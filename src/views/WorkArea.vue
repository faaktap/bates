<template>
 <div>
    <table-work-area entity="Location Area" />
 </div>
</template>

<script>
import TableWorkArea from '@/components/crud/TableWorkArea.vue';
export default {
  name: "Outline",
  components: {
                TableWorkArea
              },

  data: () => ({

  }),
  methods:{
  },
  mounted() {
      console.log('Workarea : ',this.$options.name)
  }

}
</script>