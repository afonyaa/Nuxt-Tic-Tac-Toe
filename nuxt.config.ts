// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

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

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: '~/shared/ui'
  },
})