<template>
  <users-data-table></users-data-table>
</template>

<script>
import UsersDataTable from '../components/UsersDataTable'

export default {
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
