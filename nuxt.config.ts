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
    layouts: 'app/layouts',
    plugins: 'app/plugins',
    middleware: 'app/middleware',
  },
  imports: {
    dirs: [
      'kernel/composables/**'
    ]
  },
  // TODO почитать про auto imports, понять чем отличаются components от imports
  // по сути components тоже автоимпортирует
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
  // TODO как минимум нужно вынести это куда нибудь или генерировать на запуске
  serverHandlers: [
    { route: '/api/createGame', handler: '~/entities/game/services/createGame.ts' },
    { route: '/api/gamesByStatus/:status', handler: '~/entities/game/services/getGamesByStatus.ts' },
    { route: '/api/signUp', handler: '~/entities/user/services/createUser.ts' },
    { route: '/api/logout', handler: '~/entities/user/services/logout.ts' },
    { route: '/api/signIn', handler: '~/entities/user/services/userSignIn.ts' },
    { route: '/api/user', handler: '~/entities/user/services/getCurrentUser.ts' },
    { route: '/api/game/:id', handler: '~/entities/game/services/getGame.ts' },
    { route: '/api/game/join/:id', handler: '~/entities/game/services/joinGame.ts' },
  ],
})