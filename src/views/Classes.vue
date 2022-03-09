<template>
 <div>
    <table-place  :area="this.area" entity="Location" />
 </div>
</template>

<script>
import TablePlace from '@/components/crud/TablePlace.vue';
export default {
  name: "Classes",
  props:["area"],
  components: {
                TablePlace
              },
  data: () => ({
  }),
  methods:{
  },
  mounted() {
      console.log('Classes : ',this.$options.name)
  }

}
</script>