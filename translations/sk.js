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
      title: 'Platba',

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
        time: 'Čas ukončenia',
        date: 'Dátum ukončenia',
        parkingEnd: 'Ukončenie parkovania',
        submitAction: 'Vypočítať cenu',
        nowAction: 'Teraz',
        resetAction: 'Vynulovať',
      },

      formErrors: {
        ecvFormat: 'Značka môže obsahovať iba písmená a čísla.',
        ecvRequired: 'Značka vozidla je povynný údaj.',
        minDate: 'Lístok sa dá zakúpiť iba do budúcnosti',
        maxDate: 'Lístok sa dá zakúpiť na maximálnu dobu 48 hodín.',
      },
    },
    parkingOrderSummary: {
      title: 'Platba',

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
        payAction: 'Zaplatiť parkovné',
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
        title: 'Kontrolujem informácie',
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
    payByCash: {
      status: {
        title: 'Vyžiadajte Sumu',
        description: 'Po zaplatení potvrďte platbu',
      },
      errorStatus: {
        title: 'Niečo sa pokazilo :(',
        description: 'Začnite znova',
        action: 'Začať znova',
      },
      successStatus: {
        title: 'Lístok aktivovaný',
        description: 'Môžete vytlačiť potvrdenky',
        merchantPrint: 'Tlač obchodník',
        clientPrint: 'Tlač klient',
        backAction: 'Nový lístok',
      },
      actions: {
        confirmAction: 'Zaplatené',
        cancelAction: 'Zrušiť',
      },
    },
    transactionsHistory: {
      title: 'História',

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
        paymentTime: 'Čas a dátum platby',
        paymentType: 'Spôsob platby',
        paymentType_card: 'Karta',
        paymentType_cash: 'Hotovosť',
        paymentType_none: 'Nezaplatený',
      },
      printAction: 'Tlačiť kópiu',
      printError: 'Nastala chyba pri tlačení',
    },
    payByCard: {
      status: {
        title: 'Prebieha platba kartou',
        description: 'Nasledujte inštrukcie na obrazovke',
      },
      errorStatus: {
        title: 'Niečo sa pokazilo :(',
        description: 'Začnite znova',
        action: 'Začať znova',
      },
      successStatus: {
        title: 'Lístok aktivovaný',
        description: 'Môžete vytlačiť potvrdenky',
        merchantPrint: 'Tlač obchodník',
        clientPrint: 'Tlač klient',
        backAction: 'Nový lístok',
      },
      actions: {
        confirmAction: 'Zaplatené',
        cancelAction: 'Zrušiť',
      },
    },
    sessionClose: {
      title: 'Uzávierka',
      subTitle: 'Uzávierka terminálu',
      person: 'Zodpovedná osoba',
      cash: 'Vyzbierané v hotovosti',
      card: 'Vyzbierané platobnou kartou',
      count: 'Počet transakcií celkom',
      createdAt: 'Dátum a čas začatia',
      id: 'Identifikátor relácie',
      logout: 'Odhlásiť',
    },
    home: {
      payment: 'Platba',
      history: 'História',
      settings: 'Nastavenia',
      closeSession: 'Uzávierka',
    },
    parkinOrderPaymentType: {
      title: 'Spôsob platby',
      card: 'Kartou',
      cash: 'V hotovosti',
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
      sessionAction: 'Uzávierka',
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
    sessionProvider: {
      title: 'Načítavam reláciu',
      description: 'Počkajte prosím',
      descriptionError: 'Nepodarilo sa vytvoriť reláciu, skúste neskôr',
    },
  },
}
