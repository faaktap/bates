<!--template>
  <dialog>
    <div class="dialog__inner">
      <h3>My Dialog</h3>
      <p>Content</p>
      <br>
      <a class="btn" @click="close">Close</a>
    </div>
  </dialog>
</template-->

<template>
<transition name="modal-fade">
 <div class="modal-backdrop">
  <dialog @keydown.esc="close"
            role="dialog"
            class="dialog"
            overlay-color="red"
            :fullscreen="$vuetify.breakpoint.mobile">
    <v-card min-width="300" style="transform: scale(0.875);transform-origin: left;">
      <v-toolbar dense flat color=primary>
        <v-toolbar-title 
               aria-labelledby="modalTitle"
               aria-describedby="modalDescription"
               class="white--text">toool</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4"> message </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click.native="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </dialog>
 </div>
</transition>
</template>

<script>
export default {
  methods: {
    close () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.dialog {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(rgb(161, 88, 88), 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  &__inner {
    background-color: red;
    padding: 30px;
    width: 300px;
  }
}

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
 .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>