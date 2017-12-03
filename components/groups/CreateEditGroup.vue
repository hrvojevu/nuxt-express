<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon @click.native="clear()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ group.id ? 'Edit' : 'Add'}} group</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="save()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <form class="form">
        <v-text-field
          v-model="group.name"
          label="Name"
          append-icon="info"
          :error-messages="errors.collect('name')"
          v-validate="'required'"
          data-vv-name="name"
          required
        ></v-text-field>
        <v-text-field
          v-model="group.description"
          label="Description"
          multi-line
        ></v-text-field>
        </v-menu>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['dialog', 'initialGroup'],
  data () {
    return {
      group: Object.assign({}, this.initialGroup)
    }
  },
  watch: {
    initialGroup: function (val) {
      this.group = val
    }
  },
  methods: {
    ...mapActions({
      create: 'groups/create',
      update: 'groups/update'
    }),
    save () {
      this.$validator.validateAll().then(res => {
        if (res) {
          if (this.group.id) {
            this.update(this.group).then(() => {
              this.clear()
            })
          } else {
            this.create(this.group).then(() => {
              this.clear()
            })
          }
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  padding: 24px;
}
</style>
