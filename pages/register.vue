<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <form class="form">
        <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="newUser.externalId"
            label="External Id"
            :error-messages="errors.collect('externalId')"
            v-validate="'required'"
            data-vv-name="externalId"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="newUser.firstName"
            label="First Name"
            :error-messages="errors.collect('firstName')"
            v-validate="'required'"
            data-vv-name="firstName"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="newUser.lastName"
            label="Last Name"
            :error-messages="errors.collect('lastName')"
            v-validate="'required'"
            data-vv-name="lastName"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="newUser.email"
            label="E-mail"
            :error-messages="errors.collect('email')"
            v-validate="'required|email'"
            data-vv-name="email"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="newUser.password"
            label="Password"
            :error-messages="errors.collect('password')"
            v-validate="'required'"
            data-vv-name="password"
            min="8"
            :type="'password'"
            counter
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="repeatPassword"
            label="Repeat Password"
            :error-messages="errors.collect('repeatPassword')"
            v-validate="'required'"
            data-vv-name="repeatPassword"
            min="8"
            :type="'password'"
            counter
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-btn color="primary" @click="submit">submit</v-btn>
          <v-btn @click="clear">cancel</v-btn>
        </v-flex>
      </form>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  async asyncData () {
  },
  head () {
    return {
      title: 'Registracija'
    }
  },
  data () {
    return {
      repeatPassword: '',
      newUser: {
        externalId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.name = ''
      this.email = ''
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
