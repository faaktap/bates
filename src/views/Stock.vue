<template>
  <table-stock :roomname="room" entity="Stock" />
</template>

<script>
import TableStock from '@/components/crud/TableStock.vue';
export default {
  name: "Stock",
  components: {
       TableStock
              },
  props:{
      room:{default:''}
  },
  data: () => ({

  }),
  methods:{
  },
  mounted() {
      console.log('STOCK : ',this.$options.name, this.room)
  }

}
</script>