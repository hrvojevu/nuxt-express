<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon @click.native="clear()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ user.id ? 'Izmjeni' : 'Dodaj'}} člana</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="save()">spremi</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <form class="form">
        <v-text-field
          v-model="user.firstName"
          label="Ime"
          append-icon="account_box"
          :error-messages="errors.collect('firstName')"
          v-validate="'required'"
          data-vv-name="firstName"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.lastName"
          label="Prezime"
          append-icon="account_box"
          :error-messages="errors.collect('lastName')"
          v-validate="'required'"
          data-vv-name="lastName"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.contactNumber"
          label="Kontakt broj"
          append-icon="phone_android"
          :error-messages="errors.collect('contactNumber')"
          v-validate="'numeric'"
          data-vv-name="contactNumber"
          data-vv-delay="200"
        ></v-text-field>
        <v-select
          v-bind:items="groups"
          v-model="user.groupId"
          label="Odaberi grupu"
          single-line
          item-text="name"
          item-value="id"
          persistent-hint
        ></v-select>
        <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px">
          <v-text-field
            slot="activator"
            label="Datum isteka"
            v-model="dateFormatted"
            @blur="user.expiryDate = parseDate(dateFormatted)"
            append-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="user.expiryDate"
            @input="dateFormatted = formatDate($event)"
            no-title
            scrollable
            actions
            first-day-of-week="1">
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">odustani</v-btn>
                <v-btn flat color="primary" @click="save">spremi</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
        <v-text-field
          v-model="user.note"
          label="Bilješke"
          multi-line>
        </v-text-field>
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
      dateFormatted: null
    }
  },
  watch: {
    initialUser: function (val) {
      this.user = Object.assign({}, val)
      if (val.expiryDate) {
        this.user.expiryDate = new Date(val.expiryDate)
        this.dateFormatted = this.formatDate(val.expiryDate)
      } else {
        this.dateFormatted = null
      }
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
    parseDate (date) {
      if (!date) {
        return null
      }

      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    formatDate (value) {
      return value ? format(value, 'DD.MM.YYYY.') : '-'
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
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

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
