<template>
 <div>

    <table-filter entity="Bate" />

    <table-judge entity="Judges" />

 </div>
</template>

<script>
import TableFilter from '@/components/crud/TableFilter.vue';
import TableJudge from '@/components/crud/TableJudge.vue';
export default {
  name: "Outline",
  components: { TableFilter
              , TableJudge
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