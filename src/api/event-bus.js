// Create an event bus
//import Vue from 'vue'
//export default new Vue()

import Vue from 'vue';

export const ACTIONS = {
  SNACKBAR: 'snackbar',
};

const EventBus = new Vue();

export default EventBus;