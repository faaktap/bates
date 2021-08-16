<template>
    <table-filter />
</template>

<script>
import TableFilter from '@/components/TableFilter';
export default {
  name: "Outline",
  components: {TableFilter
              },

  data: () => ({
      
  }),
  methods:{
  },
  mounted() {
      console.log('MOUUUUNNENJRNWEKJRNWERE',this.$options.name)
  }
    
}
</script>