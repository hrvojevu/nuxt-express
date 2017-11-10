<template>
  <section class="container">
    <users-data-table></users-data-table>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import UsersDataTable from '../components/UsersDataTable'

export default {
  fetch ({ store }) {
    return axios.get('/users')
      .then(res => {
        store.commit('users/reset', res.data.data)
      })
  },
  components: {
    UsersDataTable
  },
  head () {
    return {
      title: 'Admin'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.container {
  padding-bottom: $footer-offset;
}
</style>
