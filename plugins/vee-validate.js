import Vue from 'vue'
import VeeValidate from 'vee-validate'

const min = (field, n) => `Lozinka mora imati najmanje ${n} znaka`

Vue.use(VeeValidate, {
  dictionary: {
    en: {
      custom: {
        name: {
          required: 'Ime mora biti uneseno'
        },
        firstName: {
          required: 'Ime mora biti uneseno'
        },
        lastName: {
          required: 'Prezime mora biti uneseno'
        },
        username: {
          required: 'Korisničko ime mora biti uneseno'
        },
        password: {
          required: 'Lozinka mora biti unesena',
          min
        },
        newPassword: {
          min
        },
        repeatPassword: {
          confirmed: () => 'Lozinke moraju biti jednake',
          min
        },
        contactNumber: {
          numeric: 'Kontakt broj ne smije sadržavati slova i znakove'
        }
      }
    }
  }
})
