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
        nowAction: 'Teraz',
        resetAction: 'Začať znova',
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
        status_extension: 'Predĺženie',
        status_new: 'Nový lístok',
        price: 'Cena',
      },

      actions: {
        cashAction: 'Platba v hotovosti',
        cardAction: 'Platba kartou',
      },

      priceAlert: {
        title: 'Zmena ceny',
        message: 'Prosím skontrolujte si novú cenu a operáciu opakujte',
        resetAction: 'Začať znova',
        checkAction: 'Skontolovať cenu',
      },

      errorAlert: {
        title: 'Niečo sa pokazilo :(',
        message: 'Začnite proces znova prosím.',
        resetAction: 'Začať znova',
      },

      paymentProgress: {
        title: 'Prebieha platba',
        description: 'Prosím nasledujte informácie na obrazovke',
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
    paymentStatus: {
      success: {
        title: 'Parkovanie uhradené',
        description: 'Parkovací lístok je platný',
      },
      error: {
        title: 'Niečo sa pokazilo :(',
        description: 'Lístok sa nepodarilo zakúpiť, operáciu opakujte',
        action: 'Začať znova',
      },
    },
    transactionsHistory: {
      title: 'História transakcií',

      error: {
        title: 'Niečo sa pokazilo :(',
        description: 'Opakujte potiahnutím z vrchu',
      },
    },
    transactionDetail: {
      title: 'Detail platby',

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
        status_extension: 'Predĺženie',
        status_new: 'Nový lístok',
        price: 'Cena',
      },
      printAction: 'Tlačiť kópiu',
    },
  },
  components: {
    dateTimePicker: {
      saveAction: 'Zvloliť',
      cancelAction: 'Zrušiť',
    },
    userInfo: {
      title: 'Informácie o používateľovi',
      displayName: 'Meno',
      logoutAction: 'Odhlásiť sa',
    },
    logoutSettings: {
      logoutAction: 'Odhlásiť sa',
    },
    terminalSettings: {
      title: 'Nastavenia terminálu (jednorázové)',
      hideFrontActivity: 'hideFrontActivity',
      isKioskMode: 'isKioskMode',
      saveAction: 'Uložiť nastavenia',
    },
    transactionState: {
      NEW: 'Nová transakcia',
      GET_PRICE: 'Kontrola ceny',
      PRICE_WAS_CHANGED: 'Cena sa zmenila',
      GET_PAYMENT_PRICE: 'Pred platbou',
      GET_PAYMENT_PRICE_FAILED: 'Overenie ceny zlyhalo',
      PAYMENT_FAILED: 'Platba zlyhala',
      PAYMENT_AUTH: 'Overenie zlyhalo',
      PAYMENT_SUCCESS: 'Zaplatené',
      TICKET_FAILED: 'Lístok zlyhal',
      SUCCESS: 'Zaplatené',
    },
  },
}
