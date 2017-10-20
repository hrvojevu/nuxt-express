<template>
  <v-app light>
    <my-header/>
    <nuxt/>
    <my-footer/>
  </v-app>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
