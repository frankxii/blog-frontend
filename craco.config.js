const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#597ef7',
              '@link-color': 'rgba(0, 0, 0, 0.85)',
              'error-color': '#ff4d4f',
              '@border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}