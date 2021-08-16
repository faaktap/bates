<template>
   <v-text-field filled
                 class="ma-2" dense 
                 append-icon="mdi-close"
                 placeholder="search"
                :value="value"
                @input="updateValue"
                @click:append="$emit('clear')"
   />
</template>

<script>
export default {
  name: "BaseSearch",
 props: {
      value: {
        type: String,
        default: ''
      }
    },
  methods: {
      updateValue: function (event) {
        this.$emit('input', event)
      }
  }  
}
</script>
