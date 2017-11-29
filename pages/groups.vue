<template>
  <section class="container">
    <h1 class="title ma-1 mb-4">Groups</h1></v-flex>
    <groups-data-table></groups-data-table>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import GroupsDataTable from '../components/GroupsDataTable'

export default {
  fetch ({ store }) {
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
      title: 'Groups'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
