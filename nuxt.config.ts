export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  routeRules: {
    '/auth/**': { ssr: false },
  },
  alias: {
    "@ui": '~/shared/ui',
    "@db": '~/shared/lib/db',
  },
  srcDir: 'src/',
  dir: {
    pages: 'app/routes',
    layouts: 'app/layouts'
  },
  components: [
    {
      path: '~/shared/ui',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: '~/shared/ui'
  },
  // TODO - это очень неудобно
  serverHandlers: [
    { route: '/api/createGame', handler: '~/entities/game/services/createGame.ts' },
    { route: '/api/gamesByStatus/:status', handler: '~/entities/game/services/getGamesByStatus.ts' },
  ]
})