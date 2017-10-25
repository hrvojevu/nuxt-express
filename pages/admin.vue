<template>
  <users-data-table></users-data-table>
</template>

<script>
import { mapActions } from 'vuex'
import UsersDataTable from '../components/UsersDataTable'

export default {
  middleware: 'admin',
  mounted () {
    this.fetchUsers()
  },
  components: {
    UsersDataTable
  },
  head () {
    return {
      title: 'Admin'
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: 'adminUsers/get'
    })
  }
}
</script>

<style scoped lang="scss">

</style>
