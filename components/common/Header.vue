<template>
  <header class="pa-2">
    <v-layout row>
      <v-flex xs-6 class="text-xs-left">
        <nuxt-link to="/">
          <v-avatar>
            <img src="~assets/img/bk-salona.jpg" alt="Logo">
          </v-avatar>
        </nuxt-link>
      </v-flex>
      <v-flex xs-6 class="text-xs-right">
        <v-menu v-if="authUser" bottom>
          <div slot="activator" class="pa-2 user-action">
            {{ authUser.firstName }}
            <v-icon large>view_headline</v-icon>
          </div>
          <v-list>
            <v-list-tile to="/">
              <v-list-tile-title><v-icon class="mr-2">person</v-icon>Članovi</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/groups">
              <v-list-tile-title><v-icon class="mr-2">group</v-icon>Grupe</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/settings">
              <v-list-tile-title><v-icon class="mr-2">settings</v-icon>Postavke</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout()">
              <v-list-tile-title><v-icon class="mr-2">exit_to_app</v-icon>Odjava</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
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
        this.$nuxt.$router.replace({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-action {
  font-size: 16px;
  color: #fff;
  font-weight: 700;

  .icon {
    color: #fff;
  }
}
</style>
