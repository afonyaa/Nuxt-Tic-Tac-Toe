// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  alias: {
    "@ui": '~/shared/ui',
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
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     */
    componentDir: '~/shared/ui'
  }
})