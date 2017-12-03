<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Removing {{ name }}!</v-card-title>
      <v-card-text>Are you sure you want to delete {{ name }}?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat="flat" @click.native="clear()">Cancel</v-btn>
        <v-btn color="red darken-1" flat="flat" @click.native="confirm()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['name', 'dialog'],
    methods: {
      confirm () {
        this.$emit('confirm')
      },
      clear () {
        this.$emit('close')
      }
    }
  }
</script>