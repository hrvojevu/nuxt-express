module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: 'Nuxt.js + Express.js App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/vee-validate.js'],
  css: [
    '~/assets/style/app.styl',
    '~/assets/scss/main.scss'
  ],
  loading: { color: '#3B8070' },
  build: {
    vendor: ['axios', '~/plugins/vuetify.js', '~/plugins/vee-validate.js'],
    extractCSS: true,
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'auth'
  }
}
