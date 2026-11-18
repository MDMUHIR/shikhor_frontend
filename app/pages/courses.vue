<script setup lang="ts">
import courses from '~/data/courses.json'
import combos from '~/data/combos.json'

const filters = [
  { label: 'All Courses', count: 58, match: () => true },
  { label: 'HSC 27', count: 20, match: (c: any) => c.categories?.includes('HSC 27') },
  { label: 'HSC 28', count: 15, match: (c: any) => c.categories?.includes('HSC 28') },
  { label: 'SSC 26', count: 21, match: (c: any) => c.categories?.includes('SSC 26') },
  { label: 'SSC 27', count: 21, match: (c: any) => c.categories?.includes('SSC 27') },
  { label: 'Class 9', count: 18, match: (c: any) => c.categories?.includes('Class 9') },
  { label: 'Class 8', count: 2, match: (c: any) => c.categories?.includes('Class 8') },
]

const active = ref('All Courses')

const filteredCourses = computed(() => {
  const filter = filters.find((f) => f.label === active.value)
  if (!filter || active.value === 'All Courses') return courses
  return courses.filter((course: any) => filter.match(course))
})

const comboMatchers: Record<string, (name: string) => boolean> = {
  'HSC 27': (name) => /HSC/i.test(name) && !/HSC-28/i.test(name),
  'HSC 28': (name) => /HSC-28/i.test(name),
  'SSC 26': (name) =>
    /SSC|SCC-26/i.test(name) && !/SSC ?27|SSC 2027|CLASS 9|HSC/i.test(name),
  'SSC 27': (name) => /(SSC ?27|SSC 2027|FRPB 27)/i.test(name) && !/CLASS 9|HSC/i.test(name),
  'Class 9': (name) => /CLASS 9/i.test(name),
  'Class 8': () => false,
}

const filteredCombos = computed(() => {
  if (active.value === 'All Courses') return combos
  const matcher = comboMatchers[active.value]
  if (!matcher) return []
  return combos.filter((combo: any) => matcher(combo.name))
})
</script>

<template>
  <div class="min-h-screen">
    <div class="w-full max-w-[1280px] mx-auto px-4 py-12 mt-3">
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-3 mb-6">
          <div class="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="w-8 h-8 text-white"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <h1
            class="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent"
          >
            All Courses
          </h1>
        </div>
      </div>
      <div class="flex flex-wrap gap-1 sm:gap-4 justify-center mb-8 sm:mb-12 max-w-full">
        <button
          v-for="filter in filters"
          :key="filter.label"
          class="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-base sm:text-base flex-shrink-0"
          :class="
            active === filter.label
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
          "
          @click="active = filter.label"
        >
          <span class="whitespace-nowrap truncate">{{ filter.label }}</span>
          <span
            class="text-xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0"
            :class="active === filter.label ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'"
          >{{ filter.count }}</span>
        </button>
      </div>

      <template v-if="filteredCombos.length">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Combos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 items-stretch">
          <ComboCard v-for="combo in filteredCombos" :key="combo.name" :combo="combo" />
        </div>
      </template>

      <h2 class="text-xl font-semibold text-gray-800 mb-4">Courses</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <CourseCard v-for="course in filteredCourses" :key="course.name" :course="course" />
      </div>
      <p v-if="!filteredCourses.length" class="text-center text-gray-600 py-12">No courses found.</p>
    </div>
  </div>
</template>
