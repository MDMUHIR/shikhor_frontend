import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Redwans Method',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            "Redwans Method is a comprehensive online learning platform that provides a diverse array of courses delivered by highly qualified and skilled educators. We commenced our online teaching services in 2023, and within a remarkably short period, we have engaged over 500,000 students nationwide. Our mission is to ensure that quality education is accessible to all individuals, including those in remote areas.",
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/courses', '/instructors', '/learn', '/exams'],
    },
  },
})
