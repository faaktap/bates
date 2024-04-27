<template>
      <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="gray--text" xicon v-bind="attrs" v-on="on" @click="$router.back()" :title="backtitle || 'Go Back'" max-width="150">
          <v-icon>mdi-close</v-icon>Go Back
        </v-btn>
      </template>
    </v-menu>
        <!-- <v-btn x-small @click="$router.back()" :title="backtitle || 'Go Back'" class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
</template>

<script>
export default {
  name:"v-back",
  props:{
    backtitle: {type:String, default:"go back one page"}
  }
}
</script>