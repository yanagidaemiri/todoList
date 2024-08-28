// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  modules: [
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'M+PLUS+Rounded+1c': [200, 300, 400, 500, 600, 700], // 使用したいフォントとウェイトを指定
    }
  }
})
