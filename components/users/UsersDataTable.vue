<template>
  <div class="datatable-container">
    <v-layout wrap row>
      <v-flex xs6 class="pr-1">
        <v-select
          v-bind:items="filters"
          v-model="selectedFilter"
          label="Select"
          single-line
          item-text="name"
          item-value="name"
          return-object
        ></v-select>
      </v-flex>
      <v-flex xs6 class="pl-1">
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="users"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" scope="props">
        <v-tooltip bottom>
          <span slot="activator">{{ props.header.text }}</span>
          <span>{{ props.header.text }}</span>
        </v-tooltip>
      </template>
      <template slot="items" scope="props">
        <tr @click="dialog = true; user = props.item" class="row">
          <td class="text-xs-left">{{ props.item.firstName + ' ' + props.item.lastName }}</td>
          <td class="text-xs-center">
            <span>{{ formatDate(props.item.expiryDate) }}</span>
            <v-icon dark small :class="[ isActive(props.item.expiryDate) ? 'active' : 'inactive' ]">event</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-left pt-2 pb-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <create-edit-user 
      :dialog="dialog"
      :initialUser="user"
      @close="dialog = false; resetUser()">
    </create-edit-user>
    <v-btn fab color="primary" @click.native.stop="dialog = true; resetUser()" class="add-btn">
      <v-icon dark>person_add</v-icon>
    </v-btn>
  </div>
</template>


<script>
import format from 'date-fns/format'
import CreateEditUser from './CreateEditUser'
import { mapGetters } from 'vuex'

export default {
  components: {
    CreateEditUser
  },
  data () {
    return {
      selectedFilter: { name: 'All', id: null },
      filters: [ { name: 'All', id: null } ],
      user: {},
      dialog: false,
      search: '',
      pagination: { rowsPerPage: 10 },
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Expiry Date', align: 'center', value: 'expiryDate' }
      ]
    }
  },
  created () {
    this.filters.push.apply(this.filters, this.groups.map(grp => {
      return { name: grp.name, id: grp.id }
    }))
  },
  computed: {
    ...mapGetters({
      storeUsers: 'users/all',
      groups: 'groups/all'
    }),
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.users.length / this.pagination.rowsPerPage) : 0
    },
    users () {
      if (this.selectedFilter.id === null) return this.storeUsers.filter(u => !u.isAdmin)
      else return this.storeUsers.filter(u => u.groupId === this.selectedFilter.id)
    }
  },
  methods: {
    formatDate (value) {
      return value ? format(value, 'DD.MM.YYYY.') : '-'
    },
    resetUser () {
      this.user = {
        firstName: '',
        lastName: '',
        expiryDate: null,
        groupId: null
      }
    },
    isActive (val) {
      return new Date(val) > new Date()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.datatable-container {
  width: 100%;

  .row {
    cursor: pointer;
  }

  .inactive {
    color: $error;
  }

  .active {
    color: $success;
  }

  .add-btn {
    position: fixed;
    right: 0;
    bottom: 0px;
  }
}
</style>
