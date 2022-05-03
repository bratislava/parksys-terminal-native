import 'dotenv/config'

export default {
  name: 'Parksys terminal',
  owner: 'bratislava',
  slug: 'parksys-terminal',
  version: '1.0.16',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 15000,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    softwareKeyboardLayoutMode: 'pan',
    package: 'com.bratislava.parksysterminal',
    versionCode: 16,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  extra: {
    dev: process.env.__DEV__ ? true : false,
    pricingApiUrl: process.env.__DEV__
      ? process.env.PRICING_API_URL
      : 'https://nest-parking-backend.bratislava.sk',
    papayaApiUrl: process.env.PAPAYA_API_URL,
    enableMockApi: process.env.ENABLE_MOCK_API,
    apiTimeout: process.env.API_TIMEOUT,
    azureClientId: process.env.AZURE_AUTH_CLIENT_ID,
    azureTenantId: process.env.AZURE_AUTH_TENANT_ID,
    mockApiDelay: process.env.MOCK_API_DELAY,
    // googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  },
  packagerOpts: {
    config: 'metro.config.js',
    sourceExts: [
      'expo.ts',
      'expo.tsx',
      'expo.js',
      'expo.jsx',
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'wasm',
      'svg',
    ],
  },
  plugins: ['sentry-expo'],
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'bratislava-city-hall', // Sentry Organization settings tab
          project: 'parksys-terminal-react-native', //Sentry Settings > General Settings tab
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
}
