module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          ios: '9',
          android: '4',
        },
      },
    ],
  ],
};
