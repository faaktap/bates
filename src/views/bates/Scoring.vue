<template>
 <div>
   <table-judge entity="Judges" />
 </div>
</template>

<script>
import TableJudge from '@/components/crud/TableJudge.vue';
export default {
  name: "Scoring",
  components: { TableJudge
              },

  data: () => ({
      
  }),
  methods:{
  },
  mounted() {
      console.log('Outline',this.$options.name)
  }
    
}
</script>