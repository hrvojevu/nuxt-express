<template>
  <v-card class="elevation-0 text-xs-left">
    <v-subheader class="subheader">Profil</v-subheader>
    <v-card-text>
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
        name="newPassword"
        label="Nova lozinka"
        hint="At least 4 characters"
        v-model="newPassword"
        min="4"
        :append-icon="isPwdVisible ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (isPwdVisible = !isPwdVisible)"
        :type="isPwdVisible ? 'text' : 'password'"
        counter
        :error-messages="errors.collect('newPassword')"
        v-validate="'min:4'"
        data-vv-name="newPassword"
      ></v-text-field>
      <v-text-field
        label="Ponovi lozinku"
        hint="Najmanje 4 znaka"
        v-model="repeatPassword"
        min="4"
        type="password"
        counter
        :error-messages="errors.collect('repeatPassword')"
        v-validate="'confirmed:newPassword|min:4'"
        data-vv-name="repeatPassword"
      ></v-text-field>

      <v-btn round color="primary" dark @click="save()" class="ml-0">spremi</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isPwdVisible: false,
      newPassword: '',
      repeatPassword: ''
    }
  },
  created () {
    this.user = Object.assign({}, this.authUser)
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      update: 'auth/update',
      logout: 'auth/logout'
    }),
    save () {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.user.password = this.repeatPassword
          this.update(this.user).then(() => {
            if (this.user.password) {
              this.logout().then(() => {
                this.$nuxt.$router.replace({ path: '/login' })
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.subheader {
  color: rgba(0,0,0,.54);
}
</style>
