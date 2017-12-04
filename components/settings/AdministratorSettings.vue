<template>
  <v-card class="ma-2 elevation-0">
    <v-card-text class="pa-0">
      <v-list subheader>
        <v-subheader>Administrators</v-subheader>
          <v-list-tile avatar v-for="admin in admins" :key="admin.id" class="tile">
            <v-list-tile-avatar>
              <v-icon large>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="admin.fullName"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn fab small color="primary" @click="prepDeleteAdmin(admin)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
      </v-list>
      <delete-dialog
        :name="adminObject.fullName"
        :dialog="deleteDialog"
        @confirm="deleteAdmin()"
        @close="deleteDialog = false; adminObject = {}">
      </delete-dialog>
      <create-admin 
        :dialog="dialog"
        @close="dialog = false">
      </create-admin>
      <v-btn round color="primary" dark  @click.native.stop="dialog = true" class="ml-3">Add</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import CreateAdmin from './CreateAdmin'
import DeleteDialog from '../common/DeleteDialog'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CreateAdmin,
    DeleteDialog
  },
  data () {
    return {
      dialog: false,
      deleteDialog: false,
      adminObject: {}
    }
  },
  computed: {
    ...mapGetters({
      admins: 'users/admins'
    })
  },
  methods: {
    ...mapActions({
      remove: 'users/remove'
    }),
    prepDeleteAdmin (admin) {
      this.deleteDialog = true
      this.adminObject = admin
    },
    deleteAdmin () {
      this.remove(this.adminObject)
      this.deleteDialog = false
      this.adminObject = {}
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.tile {
  border-bottom: 1px solid $gray-light;
}
</style>

