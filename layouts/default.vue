<template>
  <v-app light>
    <my-header/>
    <nuxt/>
    <my-footer/>
  </v-app>
</template>

<script>
import MyHeader from '~/components/common/Header.vue'
import MyFooter from '~/components/common/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
