<template>
  <header class="text-xs-right pa-2">
    <v-menu v-if="authUser" bottom left class="hidden-lg-and-up">
      <v-btn icon slot="activator" dark large>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="logout()">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-snackbar>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authUser: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      out: 'auth/logout'
    }),
    logout () {
      this.out().then(() => {
        this.$nuxt.$router.replace({ path: '/' })
      })
    }
  }
}
</script>
