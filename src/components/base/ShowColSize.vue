<template>
<v-container fluid style="display:none">
<v-row>
   <v-row v-for="i in 12" :key="i">
      <v-col cols="1" style="background-color:#2E7D32;">{{i}}</v-col>
   </v-row>
   <v-col cols="12" style="background-color:purple">
     <template v-if="$vuetify.breakpoint.xlOnly"> xlOnly </template>
     <template v-if="$vuetify.breakpoint.lgOnly"> lgOnly </template>
     <template v-if="$vuetify.breakpoint.mdOnly"> mdOnly </template>
     <template v-if="$vuetify.breakpoint.smOnly"> smOnly </template>
     <template v-if="$vuetify.breakpoint.xsOnly"> xsOnly </template>
     <template v-if="$vuetify.breakpoint.mobile"> mobile </template>
     <template v-if="$vuetify.breakpoint.smAndDown"> smAndDown </template>
     <template v-if="$vuetify.breakpoint.smAndUp"> smAndUp  </template>
     <template v-if="$vuetify.breakpoint.mdAndDown"> mdAndDown </template>
     <template v-if="$vuetify.breakpoint.mdAndUp"> mdAndUp  </template>
     <template v-if="$vuetify.breakpoint.lgAndDown"> lgAndDown </template>
     <template v-if="$vuetify.breakpoint.lgAndUp"> lgAndUp  </template>
   </v-col>
   <v-col cols="12" style="background-color:red;">
       vb.name={{ $vuetify.breakpoint.name }} , 
       vmBnumber={{ $vuetify.mobileBreakpoint }}
   </v-col>
</v-row>
</v-container>
</template>
