<template>
  <section class="container">
    Admin
  </section>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  middleware: 'admin',
  async asyncData () {
  },
  head () {
    return {
      title: 'Admin'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
