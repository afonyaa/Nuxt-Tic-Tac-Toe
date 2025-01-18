export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // todo error Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?
  alias: {
    "@ui": '~/shared/ui',
    "@db": '~/shared/lib/db',
  },
  srcDir: 'src/',
  components: [
    {
      path: '~/shared/ui',
      pathPrefix: false,
    },
  ],
  // serverHandlers: [
  // { 
  // route: '/api/game', handler: '~/entities/game/repository/serviceHandler.ts' 
  // },
  // ],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: '~/shared/ui'
  },
})