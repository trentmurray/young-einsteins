<template>
  <div class="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
      <BookOpenIcon />
      <div class="font-semibold">SpaceKidPro · Space & Physics Course</div>
      <div class="ml-auto flex items-center gap-3 w-full max-w-sm">
        <Progress :value="totalPercentage" />
        <div class="text-xs w-10 text-right">{{ Math.round(totalPercentage) }}%</div>
        <Button variant="secondary" @click="$emit('continue')">
          Continue
          <ChevronRightIcon />
        </Button>
        <Button variant="ghost" @click="$emit('reset')">
          <RefreshIcon />
          Reset
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpenIcon, ChevronRightIcon, RefreshIcon } from '@/components/icons'
import Button from '@/components/ui/Button.vue'
import Progress from '@/components/ui/Progress.vue'

interface Props {
  totalPercentage: number
}

defineProps<Props>()

defineEmits<{
  continue: []
  reset: []
}>()
</script>
