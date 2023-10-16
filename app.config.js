import 'dotenv/config'

export default {
  expo: {
    name: 'Parksys terminal',
    slug: 'parksys-terminal',
    version: '1.0.40',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    extra: {
      eas: {
        projectId: '18bc52e4-8a3d-4697-a7b5-837ed8a048ba',
      },
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
    owner: 'bratislava',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      enabled: false,
      fallbackToCacheTimeout: 15000,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      package: 'com.bratislava.parksysterminal',
      versionCode: 40,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
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
    // plugins: ['sentry-expo'],
    hooks: {
      postPublish: [
        // {
        //   file: 'sentry-expo/upload-sourcemaps',
        //   config: {
        //     organization: 'bratislava-city-hall', // Sentry Organization settings tab
        //     project: 'parksys-terminal-react-native', //Sentry Settings > General Settings tab
        //     authToken: process.env.SENTRY_AUTH_TOKEN,
        //   },
        // },
      ],
    },
  },
}
