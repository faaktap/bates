<template>

<!-- BALLSUP - keep getting render error - htitle is not defined -->
<v-btn  class="mx-2"
        small
        :title="htitle + ' ' + hicon"
        :icon="$vuetify.breakpoint.smAndDown"
        :to="hto">
         <v-icon :large="$vuetify.breakpoint.smAndDown"
                :color="$vuetify.breakpoint.smAndDown ? 'white' : 'black'"
                left>
                {{ hicon }}
         </v-icon>
        <template v-if="!$vuetify.breakpoint.smAndDown">
        {{ hlabel }}
        </template>

</v-btn>
</template>

<script>
export default {
  name: "BaseIconButton",
  props:[ 'hlabel',
          'htitle',
          'hto',
          'hicon'
  ],
  data: () => ({
    showDate: false,
    htitle:'ss',
    hlabel:'xx'
  }),
  methods:{},
  mounted () {
    if (!this.hto) alert('hto is not defined')
    if (!this.hlabel) alert('hlabel is not defined')
    console.log('start sdfsdfsdf', this.hto, this.hlabel)
  }
}