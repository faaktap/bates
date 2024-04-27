<template>
 <v-btn  icon small
         absolute top right
         title="Click here to close"
         v-on:click="$emit('btn-click',1)"
         ><v-icon color="indigo">mdi-close</v-icon>
 </v-btn>
</template>
<script>
export default {

}
</script>
