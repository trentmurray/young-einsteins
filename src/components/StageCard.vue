<template>
  <Card :hover="!locked" :class="{ 'opacity-60': locked }">
    <CardHeader>
      <div class="flex items-center gap-2">
        <StageChip :index="index" />
        <span v-if="locked" class="inline-flex items-center gap-1 text-xs text-slate-500">
          <LockIcon />
          Locked
        </span>
        <span v-else-if="completedCount === total" class="inline-flex items-center gap-1 text-xs text-green-600">
          <CheckCircleIcon />
          Completed
        </span>
      </div>
      <CardTitle class="text-lg mt-2">{{ stage.stage }}</CardTitle>
      <div class="text-sm text-slate-600">Goal: {{ stage.goal }}</div>
    </CardHeader>
    <CardContent>
      <div class="text-xs text-slate-500 mb-3">Progression link: {{ stage.progression }}</div>
      <div class="flex items-center gap-3">
        <div class="w-full max-w-xs">
          <Progress :value="percentage" />
        </div>
        <div class="text-xs tabular-nums">{{ completedCount }}/{{ total }}</div>
        <Button @click="$emit('open')" :disabled="locked" class="ml-auto">
          {{ locked ? 'Complete previous stage' : 'Open' }}
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LockIcon, CheckCircleIcon } from '@/components/icons'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Progress from '@/components/ui/Progress.vue'
import StageChip from '@/components/StageChip.vue'
import type { Stage } from '@/types/course'

interface Props {
  stage: Stage
  index: number
  locked: boolean
  completedCount: number
  total: number
}

const props = defineProps<Props>()

defineEmits<{
  open: []
}>()

const percentage = computed(() => Math.round((props.completedCount / props.total) * 100))
</script>
