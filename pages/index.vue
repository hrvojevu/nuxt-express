<template>
  <section class="container">
    <users-data-table></users-data-table>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import UsersDataTable from '../components/UsersDataTable'

export default {
  async asyncData ({ store }) {
    let [users, groups] = await Promise.all([
      axios.get('/users'),
      axios.get('/groups')
    ])
    store.commit('users/reset', users.data.data)
    store.commit('groups/reset', groups.data.data)
  },
  components: {
    UsersDataTable
  },
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>
