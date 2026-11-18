<script setup lang="ts">
import instructorGroups from '~/data/instructors.json'

const groups = [
  { title: 'Instructor Panel RMH', list: instructorGroups.rmh },
  { title: 'Instructor Panel RM', list: instructorGroups.rm },
]
</script>

<template>
  <div class="relative min-h-screen">
    <div class="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-[1280px] mx-auto">
        <div class="text-center mb-12 mt-8">
          <h1
            class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-oc-primary/80 via-oc-primary/90 to-oc-primary bg-clip-text text-transparent drop-shadow-lg"
          >
            Our Expert Instructors
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of educators from both RM and RMH platforms
          </p>
        </div>
        <div v-for="group in groups" :key="group.title" class="mb-16">
          <div class="text-center mb-8">
            <h2
              class="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-oc-primary/70 via-oc-primary/85 to-oc-primary bg-clip-text text-transparent"
            >
              {{ group.title }}
            </h2>
            <div
              class="w-24 h-1 bg-gradient-to-r from-oc-primary/60 via-oc-primary/80 to-oc-primary mx-auto rounded-full"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <InstructorCard
              v-for="instructor in group.list"
              :key="`${group.title}-${instructor.id}`"
              :instructor="instructor"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
