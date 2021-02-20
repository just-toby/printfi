import FileManagerWebpackPlugin from 'filemanager-webpack-plugin';

// add to config.plugins
new FileManagerWebpackPlugin({
  onEnd: {
    copy: [
      {
        source: `node_modules/@web3-wallets-kit/bitski-connector/assets/bitski-callback.html`,
        destination: `build/bitski-callback.html`,
      },
    ],
  },
})