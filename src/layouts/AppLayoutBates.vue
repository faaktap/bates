<template>
  <v-app :dark="$vuetify.theme.dark">
  <!------------------------------------------- N A V I G A T I O N  D R A W E R -->
    <v-navigation-drawer
       v-if="getZml.login.type == 'admin' || getZml.login.userid == 38"
       v-model="drawer"
       :mini-variant="miniVariant"
       :clipped="clipped"
       :fixed="fixedDrawer"
        app
       style="height:"
    >
     <v-card>
      <v-card-title v-if="miniVariant == false">
       <v-layout>
       <v-badge :value="menuBadgeHover"
                 color="deep-purple accent-4"
                 content="settings"
                 right
                 transition="slide-x-transition">
        <v-hover v-model="menuBadgeHover">
          <v-btn icon  @click.stop="showSettingsDialog = true">
         <v-icon color="gray lighten-1"
                large>
          mdi-account
         </v-icon>
          </v-btn>
        </v-hover>
       </v-badge>
        <span class="mt-2 pa-0 subtitle-2" style="overflow: hidden; text-overflow: ellipsis;"> {{ username }} </span>
        <v-spacer />

        <v-btn icon xclass="mt-2 pa-0" x-small
             @click.stop="drawer = !drawer">
        <v-img src="https://kuiliesonline.co.za/img/CleanDKHS.png" max-width="40" class="float-right" contain />
        </v-btn>
        </v-layout>
     </v-card-title>
    </v-card>
    {{ $route.fullPath}}
    <v-list>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
     </v-list>
    </v-navigation-drawer>
  <!------------------------------------------- A P P   B A R -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="secondary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" >
        <v-img src="https:/kuiliesonline.co.za/img/CleanDKHS.png" max-width="40" contain />
      </v-app-bar-nav-icon>

      <v-toolbar-title >
       <zml-title :maintitle="title" />
      </v-toolbar-title>

      <v-spacer />



      <v-btn class="mx-2"
             small
             title="Work Area"
             :icon="$vuetify.breakpoint.smAndDown"
             to="/area">
        <v-icon :large="$vuetify.breakpoint.smAndDown"
                :color="$vuetify.breakpoint.smAndDown ? 'white' : 'black'"
                left>mdi-image-area</v-icon>
        <template v-if="!$vuetify.breakpoint.smAndDown">
        area
        </template>
      </v-btn>

      <v-btn class="mx-2"
             small
             title="Office, Class or Rooms"
             :icon="$vuetify.breakpoint.smAndDown"
             to="/class">
        <v-icon :large="$vuetify.breakpoint.smAndDown"
                :color="$vuetify.breakpoint.smAndDown ? 'white' : 'black'"
                left>mdi-office-building</v-icon>
        <template v-if="!$vuetify.breakpoint.smAndDown">
        location
        </template>
      </v-btn>

      <v-btn class="mx-2"
             small
             title="Categories"
             :icon="$vuetify.breakpoint.smAndDown"
             to="/category">
        <v-icon :large="$vuetify.breakpoint.smAndDown"
                :color="$vuetify.breakpoint.smAndDown ? 'white' : 'black'"
                left>mdi-broom</v-icon>
        <template v-if="!$vuetify.breakpoint.smAndDown">
        Categorize and Refine
        </template>
      </v-btn>

      <v-btn class="mx-2"
             small
             title="reporting"
             :icon="$vuetify.breakpoint.smAndDown"
             to="/reports">
        <v-icon :large="$vuetify.breakpoint.smAndDown"
                :color="$vuetify.breakpoint.smAndDown ? 'white' : 'black'"
                left>mdi-printer</v-icon>
        <template v-if="!$vuetify.breakpoint.smAndDown">
        Reports
        </template>
      </v-btn>

      <login-button small />
      <!-- <v-btn fab small to="/"><v-icon>mdi-home</v-icon></v-btn> -->

    </v-app-bar>
<!------------------------------------------- M A I N  -->
    <v-main>
     <v-container fluid>
      <transition
        name="fade"
        mode="out-in"
        appear
      >
       <slot />
      </transition>
     </v-container>
    </v-main>
<!------------------------------------------- D I A L O G - - S E T T I N G S  -->
 <v-dialog v-model="showSettingsDialog"
          :fullscreen="$vuetify.breakpoint.mobile"
           max-width="600"
           width="auto">
 <zml-close-button @btn-click="showSettingsDialog = false" />
   <v-card class="pa-2" color="gray">
    <base-title-expand  color="gray" >
     <template v-slot:header>
       <v-layout>
         <v-btn icon @click.stop="$vuetify.theme.dark=!$vuetify.theme.dark"
            :title="'Dark = ' + $vuetify.theme.dark"
         ><v-icon>mdi-moon-waning-crescent</v-icon></v-btn>
         <v-btn icon @click.stop="fixedDrawer = !fixedDrawer" title="Fixed Drawer"
         ><v-icon>mdi-drawing </v-icon></v-btn>
         <v-btn icon @click.stop="miniVariant = !miniVariant"
         ><v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon></v-btn>
         <v-btn icon @click.stop="clipped = !clipped" title="Title clipped or not."
         ><v-icon>mdi-application</v-icon></v-btn>
         <v-btn icon  @click.stop="fixed = !fixed"
         > <v-icon>mdi-minus</v-icon></v-btn>
       </v-layout>
     </template>
     <v-simple-table>
     <tr>
      <td>Click here
       <v-btn icon
            :title="'Dark = ' + $vuetify.theme.dark"
            @click.stop="$vuetify.theme.dark=!$vuetify.theme.dark"
       ><v-icon>mdi-moon-waning-crescent</v-icon>
      </v-btn>
       to change from dark to light  </td>
       <td> Dark = {{ $vuetify.theme.dark }}</td>
     </tr>
     <tr>
      <td>Click here
       <v-btn
        icon
        @click.stop="fixedDrawer = !fixedDrawer"
        ><v-icon>mdi-drawing </v-icon>
      </v-btn> to change a fixed Drawer to a floating one.</td>
      <td> Fixed = {{ fixedDrawer }}</td>
     </tr>
     <tr>
       <td>Click here
         <v-btn  icon
                @click.stop="miniVariant = !miniVariant"
         ><v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
         </v-btn> to make drawer smaller or larger </td><td>Smaller = {{ miniVariant}}
       </td>
      </tr>
      <tr>
        <td>Click here
            <v-btn icon
                   @click.stop="clipped = !clipped">
            <v-icon>mdi-application</v-icon>
           </v-btn> to make it clipped </td><td> Clipped = {{ clipped}}
      </td></tr><tr><td>Click here
      <v-btn icon
             @click.stop="fixed = !fixed"
      > <v-icon>mdi-minus</v-icon>
      </v-btn> to make the footer fixed </td><td>Footer Fixed = {{ fixed }}
        </td>
      </tr>
      <tr><td colspan=2><v-text-field v-model="title" label="title"/></td></tr>
      <tr><td colspan=2><v-text-field v-model="username" label="username"/></td></tr>
     </v-simple-table>
    </base-title-expand>
   </v-card>
 </v-dialog>
  </v-app>
</template>

<script>
import { getters } from "@/api/store";
import zmlTitle from '@/components/zmlTitle'
import LoginButton from '@/components/loginButton'
//import BaseIconButton from '@/components/base/BaseIconButton.vue'
export default {
  name:'defaultLayout',
  components:{
     zmlTitle,
     LoginButton,
  },
  data () {
    return {
      getZml: getters.getState({ object: "gZml" }),
      clipped: true,
      drawer: null,
      fixed: false,
      miniVariant: false,
      right: true,
      fixedDrawer:false,
      menuBadgeHover:null,
      username:"Side Menu",
      showSettingsDialog:false,
      navItems:[
    { icon: 'mdi-printer-wireless',    title: 'Reports',       to: '/reports'  },
    { icon: 'mdi-percent',    title: 'Devaluation',       to: '/Outline'  },
    { icon: 'mdi-bookshelf',  title: 'Journal',             to: '/Outline'  },
    { icon: 'mdi-warehouse',      title: 'Stock',             to: '/Outline'  },
      ],
      title: 'Kuilies Inventory'
    }
  },
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition-duration: 1.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>