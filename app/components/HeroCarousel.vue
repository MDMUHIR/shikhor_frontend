<script setup lang="ts">
import heroes from '~/data/heroes.json'

const slides = heroes as Array<{ type: string; slug: string; name: string; image: string }>
const index = ref(0)
const tick = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const prevIndex = computed(() => (index.value - 1 + slides.length) % slides.length)
const nextIndex = computed(() => (index.value + 1) % slides.length)

function go(i: number) {
  index.value = (i + slides.length) % slides.length
  tick.value++
  restart()
}

function restart() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    index.value = (index.value + 1) % slides.length
    tick.value++
  }, 5000)
}

onMounted(restart)
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="mb-12 md:mb-16">
    <div class="relative flex items-center justify-center">
      <div
        class="pointer-events-none absolute inset-x-[6%] inset-y-[6%] -z-10 rounded-[2.5rem] bg-gradient-to-r from-oc-primary/20 via-fuchsia-500/10 to-cyan-400/20 blur-3xl"
      />
      <button
        aria-label="Previous slide"
        class="group/peek hidden lg:block absolute left-0 top-1/2 z-0 h-[82%] w-[13%] -translate-y-1/2 overflow-hidden rounded-2xl opacity-50 shadow-xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
        @click="go(prevIndex)"
      >
        <img
          alt=""
          loading="eager"
          class="object-cover"
          style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
          :src="slides[prevIndex]?.image"
        />
        <div
          class="absolute inset-0 bg-gradient-to-l from-black/10 via-black/40 to-black/70 transition-opacity duration-300 group-hover/peek:opacity-60"
        />
      </button>
      <button
        aria-label="Next slide"
        class="group/peek hidden lg:block absolute right-0 top-1/2 z-0 h-[82%] w-[13%] -translate-y-1/2 overflow-hidden rounded-2xl opacity-50 shadow-xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
        @click="go(nextIndex)"
      >
        <img
          alt=""
          loading="eager"
          class="object-cover"
          style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
          :src="slides[nextIndex]?.image"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/70 transition-opacity duration-300 group-hover/peek:opacity-60"
        />
      </button>
      <div
        class="relative z-10 w-full lg:w-[70%] aspect-video overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-black/50 bg-slate-900 transition-transform duration-500 hover:shadow-oc-primary/20"
      >
        <div class="absolute inset-0">
          <a
            class="group/card relative block h-full w-full overflow-hidden"
            href="/courses"
            :aria-label="slides[index]?.name"
          >
            <img
              :alt="slides[index]?.name"
              class="object-contain"
              style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
              :src="slides[index]?.image"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300"
            />
          </a>
        </div>
        <button
          aria-label="Previous slide"
          class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
          @click="go(prevIndex)"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            class="h-3.5 w-3.5 sm:h-4 sm:w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            />
          </svg>
        </button>
        <button
          aria-label="Next slide"
          class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
          @click="go(nextIndex)"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            class="h-3.5 w-3.5 sm:h-4 sm:w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            />
          </svg>
        </button>
        <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          <button
            v-for="(slide, i) in slides"
            :key="slide.slug + i"
            :aria-label="`Go to slide ${i + 1}`"
            class="relative h-1.5 rounded-full overflow-hidden bg-white/30 transition-all duration-300 hover:bg-white/50"
            :class="i === index ? 'w-6 sm:w-8' : 'w-1.5 sm:w-2'"
            @click="go(i)"
          >
            <span
              v-if="i === index"
              :key="`progress-${index}-${tick}`"
              class="absolute inset-y-0 left-0 bg-white rounded-full hero-progress"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
