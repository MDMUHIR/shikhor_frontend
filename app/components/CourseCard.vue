<script setup lang="ts">
const props = defineProps<{
  course: {
    name: string
    alt: string
    image: string
    batch: string
    students: number
    price: string
    original: string
    off: string
    coupon: string
    couponOff: string
    prebook: boolean
    slug: string
    prebookEndsAt: string | null
    categories: string[]
  }
}>()

const now = useState<number>(`prebook-course-${props.course.slug || props.course.name}`, () => Date.now())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  now.value = Date.now()
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const remaining = computed(() => {
  if (!props.course.prebook || !props.course.prebookEndsAt) return 0
  const end = new Date(props.course.prebookEndsAt).getTime()
  return Math.max(0, end - now.value)
})

const countdown = computed(() => {
  const total = remaining.value
  const days = Math.floor(total / 86400000)
  const hours = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    days: `${days}d`,
    time: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
  }
})

const showCountdown = computed(
  () => props.course.prebook && !!props.course.prebookEndsAt && remaining.value > 0,
)

const badge = computed(() => {
  const category = props.course.categories?.[0]
  const map: Record<string, string> = {
    'HSC 27': 'HSC',
    'HSC 28': 'HSC 28',
    'SSC 26': 'SSC',
    'SSC 27': 'SSC 27',
    'Class 9': 'SSC 28',
    'Class 8': 'Class 8',
  }
  return (category && map[category]) || props.course.batch
})
</script>

<template>
  <div class="group cursor-pointer h-full flex">
    <div class="group cursor-pointer h-full w-full">
      <a
        :href="course.slug ? `/courses/${course.slug}` : '/courses'"
        class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col"
      >
        <div class="relative overflow-hidden aspect-video">
          <img
            :alt="course.alt || course.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            :src="course.image"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div class="absolute top-4 left-4 flex flex-wrap gap-1">
            <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">{{ badge }}</span>
          </div>
          <div class="absolute top-4 right-4">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              class="w-6 h-6 text-white opacity-80"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"
              />
            </svg>
          </div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">{{ course.batch }}</span>
            <div class="flex items-center gap-1">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3.5 h-3.5 text-yellow-500 fill-current"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span class="text-xs font-medium text-gray-600" />
            </div>
          </div>
          <div class="mb-3">
            <h3
              class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem] leading-tight"
            >
              {{ course.name }}
            </h3>
            <div v-if="course.students" class="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span class="font-medium">{{ course.students }} students</span>
            </div>
          </div>
          <div class="flex-grow" />
          <div class="mt-auto space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-blue-600">{{ course.price }}</span>
                <span v-if="course.original" class="text-gray-400 line-through text-sm">{{ course.original }}</span>
              </div>
              <span
                v-if="course.off"
                class="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded"
              >{{ course.off }}</span>
            </div>
            <div
              v-if="course.coupon"
              class="p-2 bg-yellow-50 border border-yellow-200 rounded-md flex items-center gap-2 text-yellow-800 text-xs"
            >
              <span class="font-medium">Coupon: <b>{{ course.coupon }}</b></span>
              <span class="text-yellow-700">({{ course.couponOff }})</span>
            </div>
            <div
              v-if="showCountdown"
              class="mt-2 p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800 text-xs"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3.5 h-3.5 flex-shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span class="font-medium">Prebook ends in:</span>
              <div class="flex items-center gap-1">
                <span class="font-bold">{{ countdown.days }}</span>
                <span class="font-bold">{{ countdown.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
