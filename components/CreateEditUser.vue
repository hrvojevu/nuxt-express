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
          append-icon="account_box"
          :error-messages="errors.collect('firstName')"
          v-validate="'required'"
          data-vv-name="firstName"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.lastName"
          label="Last Name"
          append-icon="account_box"
          :error-messages="errors.collect('lastName')"
          v-validate="'required'"
          data-vv-name="lastName"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.contactNumber"
          label="Contact Number"
          append-icon="phone_android"
          :error-messages="errors.collect('contactNumber')"
          v-validate="'numeric'"
          data-vv-name="contactNumber"
          data-vv-delay="500"
        ></v-text-field>
        <v-select
          v-bind:items="groups"
          v-model="user.groupId"
          label="Select group"
          single-line
          item-text="name"
          item-value="id"
          persistent-hint
        ></v-select>
        <v-menu
          v-if="!user.id"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Expiry Date"
            v-model="user.expiryDate"
            append-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="user.expiryDate"
                         no-title 
                         scrollable 
                         actions
                         first-day-of-week="1">
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
        <v-layout row wrap v-if="user.id && !user.isAdmin" class="pt-3">
          <v-flex xs6>
            <p>Expiry date:</p>
            <v-icon class="mr-2">event</v-icon>
            <span class="expiry-date" :class="[ isActive ? 'active' : 'inactive' ]">{{ formatDate(user.expiryDate) }}</span>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
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
import addMonths from 'date-fns/add_months'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['dialog', 'initialUser'],
  data () {
    return {
      menu: false,
      user: Object.assign({}, this.initialUser),
      initialExpiryDate: null
    }
  },
  watch: {
    initialUser: function (val) {
      this.user = val
      this.initialExpiryDate = new Date(val.expiryDate)
    }
  },
  computed: {
    ...mapGetters({
      groups: 'groups/all'
    }),
    isActive () {
      return new Date(this.user.expiryDate) > new Date()
    }
  },
  methods: {
    ...mapActions({
      create: 'users/create',
      update: 'users/update'
    }),
    formatDate (value) {
      return value ? format(value, 'DD.MM.YYYY.') : '-'
    },
    renewMembership () {
      this.user.expiryDate = addMonths(new Date(this.initialExpiryDate), 1)
    },
    save () {
      this.$validator.validateAll().then(res => {
        if (res) {
          if (this.user.id) {
            this.update(this.user).then(() => {
              this.clear()
            })
          } else {
            if (!this.user.expiryDate) this.user.expiryDate = addMonths(new Date(), 1)
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
