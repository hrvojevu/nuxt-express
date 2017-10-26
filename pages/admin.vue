<template>
  <users-data-table></users-data-table>
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
  middleware: 'admin',
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

</style>
