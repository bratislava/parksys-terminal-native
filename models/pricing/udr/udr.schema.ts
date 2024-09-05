import * as Yup from 'yup'

//left commented properties in case we need them in future
export const udrsOnlineValidation = Yup.object({
  features: Yup.array().of(
    Yup.object({
      properties: Yup.object({
        //       //       // OBJECTID: Yup.number().required(), // 2
        //       //       // 'Mestská časť': Yup.string().required(), // "Nové Mesto"
        //       //       // 'Kód rezidentskej zóny': Yup.string().required(), // "NM1"
        Názov: Yup.string().required(), // "Jiskrova + Belehradská"
        //       //       // 'Časové obmedzenie dĺžky parkovania (min)': Yup.number().required(), // 0
        //       //       // 'Úvodný bezplatný čas parkovania (min)': Yup.number().required(), // 0
        //       //       // 'Obmedzené len pre RPK, APK': Yup.string().required(), // "N/A"
        //       //       // 'Výnimka zo spoplatnenia (RPK, APK)': Yup.string().required(), // "0-24"
        //       //       // 'Výnimka z obmedzenia dĺžky parkovania (RPK, APK)':
        //       //       //   Yup.string().required(), // "N/A"
        'UDR ID': Yup.number().required(), // 3101
        //       //       // 'Vyhradené parkovacie státie (sk)': Yup.string().required(), // "verejné"
        //       //       // GlobalID: Yup.string().required(), // "7cde9a70-0018-4074-b1ac-390f6e6767e0"
        //       //       // GlobalID_A: Yup.string().required(), // "{1DFADE72-2D43-4B25-BCF8-D93C4A420151}"
        //       //       // Obvod: Yup.number().required(), // 663.67564614531
        //       //       // Plocha: Yup.number().required(), // 5041.11415570715
        Status: Yup.string().required(), //'active'
        //       //       // 'ODP Platnosť RPK a APK': Yup.string().required(), //'NM1, SM1'
        //       //       // web: Yup.string().required(), // 'ano'
        //       //       // 'export partneri': Yup.string().required(), // 'ano'
        //       //       // 'Informácia RPK (sk)': Yup.string().required().nullable(), // null
        //       //       // 'Informácia NPK (sk)': Yup.string().required().nullable(), // null
        //       //       // 'Informácia RPK (en)': Yup.string().required().nullable(), // null
        //       //       // 'Informácia NPK (en)': Yup.string().required().nullable(), // null
        //       //       // 'Vyhradené parkovacie státie (en)': Yup.string().required(), //'public'
        //       //       // 'Čas spoplatnenia (sk)': Yup.string().required(), //'pracovné dni 8-24'
        //       //       // 'Čas spoplatnenia (en)': Yup.string().required(), //'workdays 8-24'
        //       //       // 'Cena (eur/h)': Yup.number().required(), //1.5
        //       //       // 'Doplnková informácia (sk)': Yup.string().required().nullable(), // null
        //       //       // 'Doplnková informácia (en)': Yup.string().required().nullable(), // null
        //       //       // 'Víkendy a sviatky': Yup.string().required().nullable(), // null
      }),
    })
  ),
})

export const getUdrsOnlineResValidation = udrsOnlineValidation
