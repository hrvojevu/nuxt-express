<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Brisanje {{ name }}!</v-card-title>
      <v-card-text>Da li si siguran da želiš izbrisati {{ name }}?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat="flat" @click.native="clear()">Odustani</v-btn>
        <v-btn color="red darken-1" flat="flat" @click.native="confirm()">Briši</v-btn>
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