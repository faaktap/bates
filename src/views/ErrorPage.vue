<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <template v-if="Message.length">
            <div class="display-3 mt-5">That is an error</div>
            <div class="display-3 mt-5">{{ message }}</div>
            <v-btn to="/login"> Login </v-btn>
          </template>
          <template v-else>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">Page not found.</div>
            <div class="grey--text lighten-5 ma-3">
              The page you are trying to get to never existed in this reality,
              or has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-2 ma-2">
              <br />
              <br />Try going back to home page and repeating your action. Or,
              contact helpdesk for support.
            </div>
          </v-card>
          </template>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
export default {
    name:"ErrorPage",
    props: {message:{type:String, default: ''}
    },
    data: () => ({
      Message: "",
    }),
    mounted() {
       console.log('check dire route : ', this.$route.params)
       console.log(this.$route)
       this.Message = this.message
    }
}
</script>

<style>
  .paragraph-text {
    font-size: 18px;
  }
</style>