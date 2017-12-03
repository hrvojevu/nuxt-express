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
              <v-btn fab small color="primary" @click="remove(admin)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
      </v-list>
      <create-admin 
        :dialog="dialog"
        @close="dialog = false">
      </create-admin>
      <v-btn round color="primary" dark  @click.native.stop="dialog = true">Add</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import CreateAdmin from './CreateAdmin'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CreateAdmin
  },
  data () {
    return {
      dialog: false
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
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.tile {
  border-bottom: 1px solid $gray-light;
}
</style>

