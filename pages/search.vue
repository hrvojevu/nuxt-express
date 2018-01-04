<template>
  <section class="container">
    <h1 class="title">Pretraži</h1>
    <v-text-field append-icon="search"
                  label="Pretraži"
                  v-model="keyword"
                  single-line
                  hide-details></v-text-field>
    <v-card v-for="user in filtered"
            :key="user.id"
            :class="[ isActive(user.expiryDate) ? 'active' : 'inactive' ]"
            class="mt-2">
      <v-card-title primary-title class="pa-3 title">
        <v-layout row>
          <v-flex xs6>
            <span>{{ user.fullName }}</span>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <span>{{ formatDate(user.expiryDate) }}</span>
            <v-icon>event</v-icon>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </section>
</template>

<script>
import format from 'date-fns/format'
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

export default {
  fetch ({ store }) {
    return axios.get('/users')
      .then(res => {
        store.commit('users/reset', res.data.data)
      })
  },
  data () {
    return {
      user: {},
      keyword: ''
    }
  },
  head () {
    return {
      title: 'Account'
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/all'
    }),
    filtered () {
      return this.users.filter(user => {
        if (this.keyword !== '' && user.role === 'member') return user.fullName.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  },
  methods: {
    formatDate (value) {
      return value ? format(value, 'DD.MM.YYYY.') : '-'
    },
    isActive (val) {
      return new Date(val) > new Date()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';

.container {
  padding-bottom: $footer-offset;
}

.card {

  span {
    font-size: 14px;
  }

  &.active {
    border-left: 10px solid $success;
  }

  &.inactive {
    border-left: 10px solid $error;
  }
}
</style>
