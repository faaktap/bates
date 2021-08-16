<template>
<v-container fluid>

  <v-card color="blue"> d-flex justify-?? mb-2 </v-card>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card
          v-for="j in justify"
          :key="j"
          :class="`d-flex justify-${j} mb-2`"
          color="grey lighten-2"
          flat
          tile>
          <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile> d-flex item {{j}}</v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
      <v-card color="blue"> d-inline-flex justify-?? mb-2 </v-card>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card
          v-for="j in justify"
          :key="j"
          :class="`d-inline-flex justify-${j} mb-2`"
          color="grey lighten-2"
          flat
          tile>
          <v-card v-for="n in 3" :key="n" class="pa-2 ma-2" outlined tile> d-flex-inline item {{j}}</v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-card color="blue"> d-flex specifiy row :https://vuetifyjs.com/en/styles/flex/#flex-direction </v-card>
  <div>
    <v-card
      class="d-flex flex-row mb-6"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item {{ n }} row mb-6
      </v-card>
    </v-card>
    <v-card tile color="blue"> d-flex specifiy row-reverse :https://vuetifyjs.com/en/styles/flex/#flex-direction </v-card>
    <v-card
      class="d-flex flex-row-reverse"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item {{ n }} row-reverse
      </v-card>
    </v-card>
  </div>
<v-card color=blue> flex-column-reverse - to reverse the items (last is displayed first ) </v-card>


<v-card color=light-green> Vuetify also provides us with flex align classes to align content. </v-card>
<v-container>
    <v-row class="text-center">
      <v-col cols="12">
          
        <v-card
          v-for="a in align"
          :key="a"
          :class="`d-flex align-${a} mb-6`"
          flat
          height="100"
          tile
        >
          <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile>item {{a}}</v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

<v-card color=light-green> Align self </v-card>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card
          v-for="j in justify"
          :key="j"
          class="d-flex mb-6"
          height="100"
        >
          <v-card
            v-for="n in 3"
            :key="n"
            class="pa-2"
            :class="[n === 1 && `align-self-${j}`]"
          >{{ n === 1 ? 'Aligned flex item' : 'Flex item' }}  {{j}}</v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

<v-card color=light-green> WRAPPERS </v-card>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="d-flex flex-nowrap py-3" color="grey lighten-2" flat tile>
          <v-card v-for="n in 5" :key="n" class="pa-2" outlined tile>Flex item</v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

<v-container class="grey lighten-5" fluid>
  <v-row> 
    <v-col  :class="classtest">
      <v-card v-for="i in 10" :key="i" color="blue" class="pa-2 ma-2" outlined>
        <v-row>
         <v-col cols="12" md="4" sm="12" > col 1</v-col>
         <v-col cols="12" md="4" sm="12" >col 2</v-col>
         <v-col cols="12" md="4" sm="12" >col 3</v-col>
         <v-col cols="12" sm="12" >
              <v-text-field v-model="classtest" label="Class" />
         </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</v-container>




<v-container>
  <v-row>
    <v-col cols="12" xs="12" md="6" lg="3">
      <v-card v-for="i in 10" :key="i" color="blue" class="ma-2">
        <v-row align="start">
           <v-col cols="6" class="shrink">
             <v-card color="green" class="ma-1">Shrink Stuff {{ i }} </v-card>
           </v-col>
           <v-col cols="6">
             <v-card color=pink class="mx-2 ma-1">
             Other stuff that migh be longins<br>
             and lineends<br>
             And <hr> {{ i }}
             </v-card>
           </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</v-container>

<v-card color="grey"> wat is die ene met abatar? </v-card>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title>
            <v-icon large left>mdi-twitter</v-icon>
            <span class="title font-weight-light">Twitter</span>
          </v-card-title>
<v-card-text class="headline font-weight-bold">"hello world."</v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>James Smith</v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">100</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">100</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>


<v-container>
    <v-row>
      <v-col col="12">
        <v-card max-width="400" class="mx-auto">
          <v-container>
            <v-row dense>
              <v-col v-for="(item, i) in items" :key="i" cols="12">
                <v-card :color="item.color" dark>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="headline" v-text="item.title"></v-card-title>
                      <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                    </div>
                    <v-avatar class="ma-3" size="125" tile>
                      <v-img :src="item.src"></v-img>
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</v-container>
</template>

<script>
export default {
  components: {

  },  
 data: () => ({
  classtest:'col-4 col-sm-6 col-md-8',
  justify: ["start", "end", "center", "space-between", "space-around"],
  align: ["start", "end", "center", "baseline", "stretch"],
 }),
}
</script>

<style scoped>
.active {
  background: purple;
}
h1:hover {
  background: green;
}
</style>