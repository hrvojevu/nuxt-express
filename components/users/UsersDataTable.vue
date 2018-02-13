<template>
  <div class="datatable-container">
    <v-layout wrap row>
      <v-flex xs6 class="pr-1">
        <v-select
          v-bind:items="filters"
          v-model="selectedFilter"
          label="Odabir"
          single-line
          item-text="name"
          item-value="name"
          return-object
        ></v-select>
      </v-flex>
      <v-flex xs6 class="pl-1">
        <v-text-field
          append-icon="search"
          label="Pretraži"
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
          <td class="text-xs-center pa-0">
            <v-btn fab small
              @click.native.stop="deleteDialog = true; user = props.item"
              color="primary"
              class="elevation-0">
              <v-icon small dark>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-left pt-2 pb-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <delete-dialog
      :name="user.fullName"
      :dialog="deleteDialog"
      @confirm="deleteDialog = false; removeUser(user)"
      @close="deleteDialog = false">
    </delete-dialog>
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
import DeleteDialog from '../common/DeleteDialog'
import CreateEditUser from './CreateEditUser'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DeleteDialog,
    CreateEditUser
  },
  data () {
    return {
      deleteDialog: false,
      selectedFilter: { name: 'All', id: null },
      filters: [ { name: 'All', id: null } ],
      user: {},
      dialog: false,
      search: '',
      pagination: { rowsPerPage: 10 },
      headers: [
        { text: 'Puno ime', align: 'left', value: 'name' },
        { text: 'Datum isteka', align: 'center', value: 'expiryDate' },
        { text: 'Akcije', align: 'center', value: 'actions' }
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
      if (this.selectedFilter.id === null) return this.storeUsers.filter(u => u.role === 'member')
      else return this.storeUsers.filter(u => u.groupId === this.selectedFilter.id)
    }
  },
  methods: {
    ...mapActions({
      remove: 'users/remove'
    }),
    formatDate (value) {
      return value ? format(value, 'DD.MM.YYYY.') : '-'
    },
    resetUser () {
      this.user = {
        firstName: '',
        lastName: '',
        expiryDate: null,
        groupId: null,
        note: null
      }
    },
    isActive (val) {
      return new Date(val) > new Date()
    },
    removeUser () {
      this.remove(this.user).then(() => {
        this.resetUser()
      })
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
