<template>
  <section class="container">
    <img v-if="error.statusCode === 404" src="~assets/img/404.png" alt="Logo" class="mt-5">
    <h1 v-else class="status-code mt-5">
      {{ error.statusCode }}
    </h1>
    <h2 class="message">
      {{ error.message }}
    </h2>
    <v-btn v-if="error.statusCode === 404" to="/" color="primary" class="elevation-0">Homepage</v-btn>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.status-code {
  font-size: 5em;
  font-weight: 700;
}

.message {
  font-size: 2em;
  color: $gray-dark;
}
</style>
