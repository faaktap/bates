<template>
  <transition name="fade"
              enter-active-class="fadeIn"
              leave-active-class="fadeOut"
              v-bind="$attrs"
              v-on="hooks">
      <slot></slot>
  </transition>
</template>
<script>
export default {
  props: {
    duration: {  type: Number, default: 500 }
  },
  computed: {
    hooks() {
      return {
        beforeEnter: this.setDuration,
        afterEnter: this.cleanUpDuration,
        beforeLeave: this.setDuration,
        afterLeave: this.cleanUpDuration,
        ...this.$listeners
      };
    }
  },
  methods: {
    setDuration(el) {
      el.style.animationDuration = `${this.duration}ms`;
    },
    cleanUpDuration(el) {
      el.style.animationDuration = "";
    }
  }
};
</script>
<style>
@keyframes fadeIn {
  from {    opacity: 0;  }
  to   {    opacity: 1;  }
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes fadeOut {
  from {    opacity: 1;  }
  to   {    opacity: 0;  }
}
.fadeOut {
  animation-name: fadeOut;
}

//I need to rewrite for keyframes: . . .like above.. opcaity and transform

@keyframes my-transition {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-item {
  transition: all 1.8s ease;
  display: inline-block;
  margin-right: 10px;
}
.list-enter-from,
.list-leave-active,
.list-leave-to {
  transition: all 0.8s ease;
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 1s;
}


</style>