<template>
  <section class="container">
    <h1 class="title ma-1 mb-4">Postavke</h1>
    <profile-update></profile-update>
    <administrator-settings v-if="isSuperuser"></administrator-settings>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import ProfileUpdate from '~/components/settings/ProfileUpdate'
import AdministratorSettings from '~/components/settings/AdministratorSettings'
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ store }) {
    return axios.get('/users').then(users => {
      store.commit('users/reset', users.data.data)
    })
  },
  components: {
    ProfileUpdate,
    AdministratorSettings
  },
  head () {
    return {
      title: 'Postavke'
    }
  },
  computed: {
    isSuperuser () {
      return this.authUser && this.authUser.role === 'superuser'
    },
    ...mapGetters({
      authUser: 'auth/user'
    })
  }
}
</script>
