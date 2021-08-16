<template>

<v-tooltip bottom>
  <template v-slot:activator="{ on, attrs }">
    <v-btn :color="color" dark v-bind="attrs" v-on="on" 
            small
           :x-small="$vuetify.breakpoint.smAndDown == true"
           class="ma-2 pa-2"
          @click="$emit('clicked')">
          <v-icon small v-if="icon && $vuetify.breakpoint.xs == false"> {{ icon }} </v-icon>  {{ btnFace }}
    </v-btn>
  </template>
  <span>{{ toolTip }}</span>
  </v-tooltip>
 
</template>
<script>
export default {
    name:"zmlButtonTool",
    props:['btnFace', 'color', 'toolTip','icon', 'size']
}
</script>