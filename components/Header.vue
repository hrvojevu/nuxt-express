<template>
  <header class="text-xs-left pl-0 pr-0">
    <v-menu offset-y class="hidden-lg-and-up">
      <v-btn flat dark color="secondary" slot="activator">
        <v-icon dark large>view_headline</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/admin">
          <v-list-tile-title>Admin</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout()">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-snackbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
