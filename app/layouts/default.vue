<template>
  <div>
    <SiteHeader />
    <div
      class="pt-18 print:pt-0 min-h-screen bg-gradient-to-br from-indigo-200/50 via-purple-200/50 via-pink-200/50 via-blue-50 to-cyan-200/50"
    >
      <slot />
    </div>
    <template v-if="route.path === '/'">
      <SiteFooter />
      <WhatsAppButton />
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
