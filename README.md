# Bratislava Parking Native

React Native Expo app. Bootstraped with expo typescript tabs example.

## Development

Install:

```
yarn
```

Run for all platforms

```
yarn start
```

This will guide you how to open it locally on iOs simulator (if available), Android emulator (also if available) or web browser.

If you want to develop on your device, from [Expo Go](https://expo.io/client) application (downlaoaded from Play store). ping Martin Pinter to get it.

To get Env keys:

- SENTRY_AUTH_TOKEN
  1. Log in to [Sentry](https://sentry.io/settings/account/api/auth-tokens/) with `inovacie.bratislava` gmail account
  2. Proceed to Settings -> Account -> API -> Auth Tokens
  3. Get Auth token with scope: org:read, project:releases, project:write

For help reach to @mpinter (Martin Pinter) or @Balros (Adam Grund)

### Auth

This app uses Azure login. You need to configure:

- AZURE_AUTH_TENANT_ID (settings/tenant id)
- AZURE_AUTH_CLIENT_ID (registered apps -> manifest)

in env variables to be able to use login. You can obtain these from [Azure](https://portal.azure.com/).

For more information use [Expo AuthSession](https://docs.expo.dev/guides/authentication/#azure) tutorial in Expo docs.

### ENV variables

- all possible variables are in .env.XXX.template files
  - APP config
    - ENABLE_MOCK_API (enable mocking api)
    - MOCK_API_DELAY (add delay to calls)
    - SENTRY_AUTH_TOKEN
    - API_TIMEOUT (cancel call after xxx MS, 0 = no timeout)
  - API URLS
    - PRICING_API_URL (pricing api)
    - PAPAYA_API_URL (terminal api)

### Project structure

- \_\_mock\_\_ (mocking api)
- assets (static assets)
- components (generic components of app)
  - form (form components)
  - ui (ui components as Buttons, Pickers...)
  - ...
- hooks (react hooks)
- models (DTO + validations files)
- navigation (react navigation navigators)
- screens (screens)
- services
  - external (api calls)
  - internal (internal services)
- translations
- types
- utils

### File naming

- api files (.api.ts)
- services (.service.ts)
- styles (.styled.ts)
- validation (.schema.ts)
- mock (.mock.ts)
- definitions (.d.ts)

### Running on device

You need the [Expo Go](https://expo.io/client) application installed on your device. With Android you only need to scan the QR shown to you after `yarn start`. On iOs you may need access to the bratislava expo organisation - ping Martin Pinter to get it.

### Running on POS terminals

You can only test some functionality on POS terminals, like card payment or receipt printing. Some should always be available in the office, ask Martin Pinter or Adam Grund. On staging, non-production terminals you can test card payments with (most of your) regular credit/debit cards, without them taking any money out of your account.

On staging terminals, you can run the app using Expo Go just like on any other android - if you have trouble with the setup and need to access Settings / Turn on Developer mode or options, follow [instructions here](https://barclaycard.mpymnt.com/pax-a920-faq.html)

You can also test built `.apk`-s on the terminal like so:

`adb install name-of-the-file.apk`

To get the app onto production terminals (at least one in the office as well), you need to follow the Release section.

## Fetching data

We use [React Query](https://react-query.tanstack.com) to fetch data - it's giving it's default configuration and behaviour a quick look [here](https://react-query.tanstack.com/guides/important-defaults).

Fetching with React Query looks something like the following:

```ts
const { isLoading, data, error } = useQuery('uniqueKey', fetcherFunction)
```

The first (key) param is used as the cache key - `useQuery` used in two different places with the same key should

The fetcher functions reside in `api.ts` - please use the name of the fn as the key (as long as they all reside in same file this should guarantee uniqueness) - if the resource uses a parameter (i.e. you're fetching a resource by it's id), the key should be an array with the name of the functions and all parameters used:

```ts
useQuery('getStations', getStations)
useQuery(['getStationById', id], () => getStationsById(id))
```

## Validating data

We use [yup](https://github.com/jquense/yup). Useful not only as a sanity check but also to provide you with types and autocomplete. Validations reside in `validation.ts`.

## Papaya Docs

[Papaya docs](https://github.com/papayapos/ekasa)

## Release

Empty `.easignore` file [info](https://forums.expo.dev/t/eas-ignore-gitignore/70423)

POS terminals have their own proprietary store, Papaya handles all communication with that:

To release new `.apk` to Papaya terminals:

1. Bump the `version` and `versionCode` in `app.config.js` - these are visible from app settings and help us determine which version is live for the users
2. In `.env` file erase enviroment variable `__DEV__` if it is present
3. Run `eas build -p android` inside the project
4. wait for [Expo](https://expo.dev/accounts/bratislava/projects/parksys-terminal/builds) to build new `.apk` & download it once ready
5. Send the `.apk` to the contact persons mentioned in [deploy email addresses](https://magistratba.sharepoint.com/:fl:/g/contentstorage/CSP_e7fd7f53-9abe-456a-b0e1-7cc0c63e3f1a/Ebp9TgttV3VHhmxgwlqD9YEBiLmHzFeLB2AcwhTsT0RHXA?e=3BRaKw&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9lN2ZkN2Y1My05YWJlLTQ1NmEtYjBlMS03Y2MwYzYzZTNmMWEmZD1iJTIxVTNfOTU3NmFha1d3NFh6QXhqNF9Hc3RnWmNMRlhXQkR2Z2F4bHUxdEdsNGZsSnk2d2ZCeFRvWi00aXZqZ0o4ayZmPTAxWVJNMktXRjJQVkhBVzNLWE9WRFlNM0RBWUpOSUg1TUImYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dFlXZHBjM1J5WVhSaVlTNXphR0Z5WlhCdmFXNTBMbU52Ylh4aUlWVXpYemsxTnpaaFlXdFhkelJZZWtGNGFqUmZSM04wWjFwalRFWllWMEpFZG1kaGVHeDFNWFJIYkRSbWJFcDVObmRtUW5oVWIxb3ROR2wyYW1kS09HdDhNREZaVWsweVMxZERRMUUyTTB4Qk5VODBOMFpHVEVVMFIwNVFTbGRLUlVoYVVRJTNEJTNEJTIyJTJDJTIyaSUyMiUzQSUyMmU1Mjg3MTAzLWQ4MTEtNGJhYi05ODhlLTM5YmRhZDY4Y2NiYSUyMiU3RA%3D%3D).
6. After 1-3 days, verify that the version is live on the production POS terminal
