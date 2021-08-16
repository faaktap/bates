<template>
 <v-btn  icon small 
         absolute top right
         title="Click here to close"
         v-on:click="clickedIt()"
         ><v-icon color="indigo">mdi-close</v-icon>
 </v-btn>
</template>
<script>
export default {
    methods:{
        clickedIt() {
            this.$emit('btn-click',1)
        }
    }
}
</script>
