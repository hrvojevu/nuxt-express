<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="text-xs-left">
        <h1 class="pt-2 pb-2">Login</h1>
        <form class="form">
          <v-text-field
            light
            v-model="email"
            label="E-mail"
            :error-messages="errors.collect('email')"
            v-validate="'required|email'"
            data-vv-name="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :error-messages="errors.collect('password')"
            v-validate="'required|min:4'"
            data-vv-name="password"
            min="4"
            :type="'password'"
            counter
            required
          ></v-text-field>
          <v-btn color="primary" @click="submit()" class="ml-0">login</v-btn>
          <v-btn @click="clear()">cancel</v-btn>
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
      title: 'Login'
    }
  },
  data () {
    return {
      email: '',
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
          this.login({ email: this.email, password: this.password }).then(() => {
            this.$nuxt.$router.replace({ path: '/' })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    clear () {
      this.email = ''
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
</style>
