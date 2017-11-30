<template>
  <div class="datatable-container">
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="groups"
      v-bind:pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" scope="props">
        <v-tooltip bottom>
          <span slot="activator">{{ props.header.text }}</span>
        </v-tooltip>
      </template>
      <template slot="items" scope="props">
        <tr @click="dialog = true; group = props.item" class="row">
          <td class="text-xs-left">{{ props.item.name }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-left pt-2 pb-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    <create-edit-group 
      :dialog="dialog"
      :initialGroup="group"
      @close="dialog = false; resetGroup()">
    </create-edit-group>
    <v-btn fab color="primary" @click.native.stop="dialog = true; resetGroup()" class="add-btn">
      <v-icon dark>group_add</v-icon>
    </v-btn>
  </div>
</template>


<script>
import CreateEditGroup from './CreateEditGroup'
import { mapGetters } from 'vuex'

export default {
  components: {
    CreateEditGroup
  },
  data () {
    return {
      group: {},
      dialog: false,
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      groups: 'groups/all'
    }),
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.groups.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
    resetGroup () {
      this.group = {
        name: '',
        description: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.datatable-container {
  width: 100%;

  .row {
    cursor: pointer;
  }

  .add-btn {
    position: fixed;
    right: 0;
    bottom: 0px;
  }
}
</style>
