// @ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },
  env: {
    "IoTHubSecret": process.env.IoTHubUrl,
  },
  plugins: [
    // { src: '~/plugins/mqtt.js', mode: 'server' }
    // { src: '~/plugins/signalR.js', mode: 'client' },
  ],
})
