<template>
<!-- Small buttons in the tables - delete, edit, etc -->
    <v-btn class="mx-1"
           x-small
           @click="$emit('click')"
           :tip="tip"
    >
        <v-icon  small
                :color="color"
                class="my-1"
        >
                {{ rIcon }}
        </v-icon>
        <template v-if="!$vuetify.breakpoint.mdAndDown">
             {{ text }}
        </template>
    </v-btn>

</template>

<script>
export default {
    name:"ZTableBtn",
    props:{
          tip:   {default:"tip"}
         ,color: {default:"primary"}
         ,text:  {default:"btn"}
         ,icon:  {icon:"mdi-tooltip-text-outline"}
    },
    computed:{
        rIcon() {
            switch (this.text) {
                case "edit"  : return "mdi-circle-edit-outline"
                case "delete": return "mdi-delete"
                case "add"   : return "mdi-plus-box-outline"
                default      : return this.icon;
            }
        }
    }
}
</script>