<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon @click.native="clear()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ user.id ? 'Edit' : 'Add'}} user</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="save()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <form class="form">
        <v-text-field
          v-model="user.firstName"
          label="First Name"
          :error-messages="errors.collect('firstName')"
          v-validate="'required'"
          data-vv-name="firstName"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.lastName"
          label="Last Name"
          :error-messages="errors.collect('lastName')"
          v-validate="'required'"
          data-vv-name="lastName"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.contactNumber"
          label="Contact Number"
          :error-messages="errors.collect('contactNumber')"
          v-validate="'numeric'"
          data-vv-name="contactNumber"
        ></v-text-field>
        <v-text-field
          v-model="user.address"
          label="Address"
          :error-messages="errors.collect('address')"
          data-vv-name="address"
        ></v-text-field>
        <v-layout row wrap v-if="user.id" class="pt-3">
          <v-flex xs5>
            <p>Expiry date:</p>
            <span class="expiry-date" :class="[ isActive ? 'active' : 'inactive' ]">{{ formatDate(user.expiryDate) }}</span>
          </v-flex>
          <v-flex xs4 class="text-xs-left">
            <v-btn fab color="primary" @click="renewMembership()" class="mt-2">
              <v-icon dark>refresh</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['dialog', 'initialUser'],
  data () {
    return {
      user: Object.assign({}, this.initialUser),
      initialExpiryDate: null
    }
  },
  watch: {
    initialUser: function (val) {
      this.user = val
      if (!this.initialExpiryDate) this.initialExpiryDate = val.expiryDate
    }
  },
  computed: {
    ...mapGetters({
    }),
    isActive () {
      return new Date(this.user.expiryDate) > new Date()
    }
  },
  methods: {
    ...mapActions({
      create: 'adminUsers/create',
      update: 'adminUsers/update'
    }),
    formatDate (value) {
      return value ? format(value, 'DD.MM.YYYY.') : '-'
    },
    renewMembership () {
      let date = new Date(this.initialExpiryDate)
      date.setMonth(date.getMonth() + 1)
      this.user.expiryDate = date
    },
    save () {
      this.$validator.validateAll().then(res => {
        if (res) {
          if (this.user.id) {
            this.update(this.user).then(() => {
              this.clear()
            })
          } else {
            let date = new Date()
            date.setMonth(date.getMonth() + 1)
            this.user.expiryDate = date
            this.create(this.user).then(() => {
              this.clear()
            })
          }
        }
      })
    },
    clear () {
      this.$validator.reset()
      this.initialExpiryDate = null
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.form {
  padding: 24px;

  .expiry-date {
    font-weight: 700;
    font-size: 16px;
    
    &.inactive {
      color: $error;
    }

    &.active {
      color: $success;
    }
  }
}
</style>
