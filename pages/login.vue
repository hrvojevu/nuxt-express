<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="text-xs-left">
        <h1 class="pt-2 pb-2">Prijava</h1>
        <v-alert v-model="alert.bool" color="warning" icon="priority_high" class="pa-2">{{ alert.message }}</v-alert>
        <form class="form">
          <v-text-field
            light
            v-model="username"
            label="Korisničko ime"
            :error-messages="errors.collect('username')"
            v-validate="'required'"
            data-vv-name="username"
            data-vv-delay="500"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Lozinka"
            :error-messages="errors.collect('password')"
            v-validate="'required|min:4'"
            data-vv-name="password"
            data-vv-delay="500"
            min="4"
            :type="'password'"
            counter
            required
          ></v-text-field>
          <v-btn color="primary" @click="submit()" class="ml-0">prijavi</v-btn>
          <v-btn @click="clear()">odustani</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'login',
  async asyncData () {
  },
  head () {
    return {
      title: 'Prijava'
    }
  },
  data () {
    return {
      alert: { bool: false, message: '' },
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.login({ username: this.username, password: this.password }).then(() => {
            this.$nuxt.$router.replace({ path: '/' })
          }).catch(err => {
            this.alert = { bool: true, message: err }
          })
        }
      })
    },
    clear () {
      this.username = ''
      this.password = ''
      this.$validator.clean()
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 100%;
}
.alert {
  font-weight: 700;
}
</style>
