module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
        ],
        alias: {
          '~/*': './src/*',
          '~/pages': './src/pages',
          '~/componets': './src/componets',
          '~/constants': './src/constants',
          '~/hooks': './src/hooks',
          '~/utils': './src/utils',
          '~/config': './src/config',
          '~/assets': './src/assets',
          '~/stores': './src/stores',
          '~/actions': './src/actions',
        },
      },
    ],
  ],
};
