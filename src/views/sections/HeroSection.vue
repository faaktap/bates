<template>
   <section id="hero-alt" v-if="!$vuetify.breakpoint.smAndDown">
     <v-sheet max-width="100%" 
              :color="color"
              justify="space-around"
              class="text-center" align="center">
      <v-img
        :height="$vuetify.breakpoint.mdAndUp ? breakup1 : breakup2"
        :gradient="gradient"
        :src="picture"
        :color="color"
        flat
        max-width="100%"
        tile
        :cover="true"
      >
        <v-row
          v-if="herotitle"
          align="center"
          class="ma-0 fill-height text-center white--text font-weight-black"
          justify="center"
        >
          <v-col cols="12">
            <div
              :title="herotitle"
              space="2"
              weight="500"
              class="text-h2"
             >
             {{ herotitle }}
            </div>
            <hr
              :color="color"
              dense
            />
            <div
              class="justify-center pa-0 grey--text"
              divider=">"
            ><!--  {{ herotext }} -->
            </div>
          </v-col>
        </v-row>
      </v-img>
      <v-row
          align="center"
          v-if="herotext"
          class="ma-8 fill-height text-justify white--text">
          <v-col cols=12> 
            <h2> {{ herotext }}</h2>
            
            <p v-html="moretext"> </p>
            <v-btn v-if="herobutton" :to="func" :title="herotext"> 
              <v-icon> {{icon}}</v-icon>
              {{ herobutton }}
            </v-btn>
          </v-col>
      </v-row>
    </v-sheet>
   </section>
</template>

<script>
  // Components
  import {
    HexToRGBA,
    RGBAtoCSS,
  } from 'vuetify/lib/util/colorUtils'
  

  export default {
    name: 'SectionHeroAlt',
    props: { name: String
           , bgpicture: String
           , title: {type: String, default: "A Title"}
           , text: String
           , moretext:String
           , button:String
           , icon:String
           , func:String
           , color: String
           , breakup1: {type: String, default: "100"}
           , breakup2: {type: String, default: "55"}
           },
    provide: {
      heading: { align: 'center' },
    },

    data: () => ({
      
    }),

    computed: {
      gradient () {
        const color = `${this.$vuetify.theme.themes.light.secondary}CC`
        const overlay = RGBAtoCSS(HexToRGBA(color))
        ////this.$cs.l('gradien:' , `to top, ${overlay}, ${overlay}`)
        return `to top, ${overlay}, ${overlay}`
      },
      picture () {
        return this.bgpicture ? this.bgpicture : "https://www.zmlrekenaars.co.za/test/img/wall001.jpg"
      },
      herotitle () {
       return this.title ? this.title   : "heroTitle for section" 
      },
      herotext () {
       return this.text ? this.text : ""
      },
      herobutton () {
       return this.button
      },
    },
  }
</script>


