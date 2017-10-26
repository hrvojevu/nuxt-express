<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <p v-if="users.length === 0">There are no users</p>
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: user.id }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
    <v-btn color="primary">Add</v-btn>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

export default {
  fetch ({ store }) {
    return axios.get('/users')
      .then(res => {
        store.commit('users/reset', res.data.data)
      })
  },
  async asyncData () {
    let { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    // let { data } = await axios.get('/api/users')
    return { users: data }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isAdmin: 'auth/isAdmin'
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
