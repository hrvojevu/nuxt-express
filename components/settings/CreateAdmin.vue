<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon @click.native="clear()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add administrator</v-toolbar-title>
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
          v-model="user.username"
          label="Username"
          append-icon="account_box"
          :error-messages="errors.collect('username')"
          v-validate="'required'"
          data-vv-name="username"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          hint="At least 4 characters"
          v-model="user.password"
          min="4"
          :append-icon="isPwdVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (isPwdVisible = !isPwdVisible)"
          :type="isPwdVisible ? 'text' : 'password'"
          counter
          :error-messages="errors.collect('password')"
          v-validate="'min:4'"
          data-vv-name="password"
        ></v-text-field>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['dialog'],
  data () {
    return {
      isPwdVisible: false,
      user: {}
    }
  },
  created () {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'users/create'
    }),
    reset () {
      this.user = {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      }
      this.$validator.reset()
    },
    save () {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.user.role = 'admin'
          this.create(this.user).then(() => {
            this.clear()
          })
        }
      })
    },
    clear () {
      this.reset()
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.form {
  padding: 24px;
}
</style>
