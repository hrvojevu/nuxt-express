<template>
  <div>
    <footer class="hidden-md-and-down">
      Visit our website for more documentation : <a href="https://nuxtjs.org" target="_blank">nuxtjs.org</a>
    </footer>
    <v-bottom-nav
      shift
      :value="true"
      :active.sync="$nuxt.$route.name"
      class="hidden-lg-and-up">
      <v-btn dark to="/" exact>
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn dark to="/account">
        <span>Account</span>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn dark :to="$nuxt.$store.state.auth.authUser ? '/admin' : '/login'">
        <span>Admin</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<style lang="scss" scoped>
span {
  font-weight: 700;
}
</style>
