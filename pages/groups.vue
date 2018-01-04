<template>
  <section class="container">
    <h1 class="title ma-1 mb-4">Grupe</h1>
    <groups-data-table></groups-data-table>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import GroupsDataTable from '../components/groups/GroupsDataTable'

export default {
  async asyncData ({ store }) {
    return axios.get('/groups')
      .then(res => {
        store.commit('groups/reset', res.data.data)
      })
  },
  components: {
    GroupsDataTable
  },
  head () {
    return {
      title: 'Grupe'
    }
  }
}
</script>
