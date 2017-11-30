<template>
  <section>
    <profile-update></profile-update>
    <administrator-settings v-if="isSuperuser"></administrator-settings>
  </section>
</template>

<script>
import ProfileUpdate from '~/components/ProfileUpdate'
import AdministratorSettings from '~/components/AdministratorSettings'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProfileUpdate,
    AdministratorSettings
  },
  head () {
    return {
      title: 'Settings'
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
