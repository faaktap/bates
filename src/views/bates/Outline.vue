<template>
    <table-filter>
      <v-card color="green">
       <h1 class="text-center"> Some stuff </h1>
      </v-card>
    </table-filter>
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