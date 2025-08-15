<template>
  <div class="animate-fade-in">
    <Card class="shadow-lg">
      <CardHeader>
        <div class="flex items-center gap-2 text-slate-600 text-xs mb-1">
          <button class="inline-flex items-center gap-1 hover:underline" @click="$emit('back')">
            <ChevronLeftIcon />
            Back to stage
          </button>
          <span>•</span>
          <StageChip :index="Number(stage.id.replace('s', '')) - 1" />
        </div>
        <CardTitle class="text-xl">
          {{ module.title }} 
          <span class="text-slate-400 text-sm">({{ module.id }})</span>
        </CardTitle>
        <div class="text-sm text-slate-600">{{ module.blurb }}</div>
      </CardHeader>
      <CardContent>
        <div class="grid gap-3">
          <div 
            v-for="(line, i) in module.learn" 
            :key="i" 
            class="rounded-2xl bg-slate-50 p-3 text-sm"
          >
            {{ line }}
          </div>
        </div>
        <Quiz :quiz="module.quiz" @pass="$emit('complete')" />
        <div v-if="completed" class="mt-4 inline-flex items-center gap-2 text-green-700">
          <CheckCircleIcon class="h-5 w-5"/>
          <span>Module completed!</span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, CheckCircleIcon } from '@/components/icons'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import StageChip from '@/components/StageChip.vue'
import Quiz from '@/components/Quiz.vue'
import type { Stage, Module } from '@/types/course'

interface Props {
  stage: Stage
  module: Module
  completed: boolean
}

defineProps<Props>()

defineEmits<{
  back: []
  complete: []
}>()
</script>
