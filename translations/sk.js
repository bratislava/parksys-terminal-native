export default {
  one: 'Platba',
  two: 'Dva',
  presentPrice: '{{price}}€',
  screens: {
    notFound: {
      title: 'This screen does not exist',
      goHome: 'Go to home screen!',
    },
    enterParkingInfo: {
      title: '1. Platba',

      loading: {
        title: 'Inicializujem formulár',
      },

      error: {
        title: 'Niečo sa pokazilo :(',
        description: 'Nepodarilo sa nám načítať zoznam oblastí.',
        action: 'Skúsiť znova',
      },

      form: {
        ecv: 'ECV',
        ulica: 'Ulica',
        udr: 'UDR',
        time: 'Dátum ukončenia',
        date: 'Čas ukončenia',
        parkingEnd: 'Ukončenie parkovania',
        submitAction: 'Vypočítať cenu',
      },

      formErrors: {
        ecvFormat: 'Značka môže obsahovať iba písmená a čísla.',
        ecvRequired: 'Značka vozidla je povynný údaj.',
        minDate: 'Lístok sa dá zakúpiť iba do budúcnosti',
        maxDate: 'Lístok sa dá zakúpiť na maximálnu dobu 48 hodín.',
      },
    },
    parkingOrderSummary: {
      title: '2. Platba',

      loading: {
        title: 'Zisťujem cenu parkovného',
      },

      error: {
        title: 'Niečo sa pokazilo :(',
        description: 'Začnite proces znova prosím.',
        action: 'Začať znova',
      },

      parkingDescription: {
        ecv: 'ECV',
        street: 'Ulica',
        udr: 'UDR',
        parkingEnd: 'Ukončenie parkovania',
      },
      parkingSummary: {
        duration: 'Dĺžka parkovania',
        durationString: '{{hours}} hodín {{minutes}} minút',
        status: 'Status',
        price: 'Cena',
      },
      actions: {
        cashAction: 'Platba v hotovosti',
        cardAction: 'Platba kartou',
      },
    },
    login: {
      title: 'Parksys terminál',
      description: 'Prosím prihláste sa pomocou Microsoft účtu',

      username: 'Používateľské meno',
      password: 'Heslo',
      submitAction: 'Prihlásiť sa',

      errors: {
        usernameRequired: 'Meno je povinné',
        passwordRequired: 'Heslo je povinné',
        loginError: 'Zlé meno a heslo.',
      },
    },
    settings: {
      title: 'Nastavenia',
    },
    history: {
      title: 'História',
    },
  },
  components: {
    dateTimePicker: {
      saveAction: 'Zvloliť',
      cancelAction: 'Zrušiť',
    },
    userInfo: {
      displayName: 'Meno',
      logoutAction: 'Odhlásiť sa',
    },
  },
}
