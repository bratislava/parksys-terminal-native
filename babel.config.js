module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@screens': './screens',
            '@navigation': './navigation',
            '@hooks': './hooks',
            '@images': './assets/images',
            '@utils': './utils',
            '@fonts': './assets/fonts',
            '@lib': './lib',
            '@services': './services',
            '@mock': './__mock__',
            '@custom-types': './types',
            '@models': './models',
            constants: './constants',
          },
        },
      ],
    ],
  }
}
