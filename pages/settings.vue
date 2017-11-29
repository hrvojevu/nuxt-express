<template>
  <section>
    <h1 class="title ma-1">Settings</h1></v-flex>
    <profile-update></profile-update>
  </section>
</template>

<script>
import ProfileUpdate from '~/components/ProfileUpdate'

export default {
  components: {
    ProfileUpdate
  },
  head () {
    return {
      title: 'Settings'
    }
  }
}
</script>
