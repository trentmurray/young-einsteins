<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
    <Header 
      :total-percentage="progressStore.totalPercentage" 
      @continue="continueToNext"
      @reset="reset"
    />

    <main class="max-w-6xl mx-auto px-4 py-6">
      <!-- Overview or Stage Detail -->
      <div v-if="openStageIdx === null" class="animate-fade-in">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StageCard
            v-for="(stage, i) in COURSE"
            :key="stage.id"
            :stage="stage"
            :index="i"
            :locked="progressStore.isStageLocked(i)"
            :completed-count="progressStore.getStageProgress(stage.id).completed"
            :total="stage.modules.length"
            @open="openStage(i)"
          />
        </div>
      </div>

      <div v-else class="animate-fade-in">
        <div class="mb-4 flex items-center gap-3">
          <Button variant="ghost" @click="openStageIdx = null" class="gap-2">
            <ChevronLeftIcon />
            All stages
          </Button>
          <StageChip :index="openStageIdx" />
          <div class="text-lg font-semibold">{{ COURSE[openStageIdx].stage }}</div>
        </div>

        <!-- Stage modules grid or module view -->
        <div v-if="openModuleIdx === null" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card 
            v-for="(module, mi) in COURSE[openStageIdx].modules" 
            :key="module.id" 
            hover
          >
            <CardHeader>
              <CardTitle class="text-base">
                {{ module.title }} 
                <span class="text-slate-400 text-xs">({{ module.id }})</span>
              </CardTitle>
              <div class="text-sm text-slate-600">{{ module.blurb }}</div>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-2 mb-3">
                <span 
                  v-if="progressStore.isModuleCompleted(COURSE[openStageIdx].id, module.id)"
                  class="inline-flex items-center gap-1 text-green-600 text-xs"
                >
                  <CheckCircleIcon />
                  Completed
                </span>
                <span v-else class="inline-flex items-center gap-1 text-slate-500 text-xs">
                  <PlayCircleIcon />
                  Not started
                </span>
              </div>
              <div class="flex items-center gap-2">
                <Button @click="openModule(mi)" class="gap-2">
                  Start
                  <ChevronRightIcon />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <ModulePanel
          v-else
          :stage="COURSE[openStageIdx]"
          :module="COURSE[openStageIdx].modules[openModuleIdx]"
          :completed="progressStore.isModuleCompleted(COURSE[openStageIdx].id, COURSE[openStageIdx].modules[openModuleIdx].id)"
          @back="openModuleIdx = null"
          @complete="markComplete"
        />

        <!-- Stage footer: completion badge -->
        <div class="mt-6 flex items-center justify-between">
          <div class="text-sm text-slate-600">
            Goal: {{ COURSE[openStageIdx].goal }}
          </div>
          <div class="inline-flex items-center gap-2 text-sky-700">
            <AwardIcon />
            <span>Complete every module to unlock the next stage</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-10 border-t">
      <div class="max-w-6xl mx-auto px-4 py-8 text-xs text-slate-500">
        SpaceKidPro · Learning through wonder ✨ — Progress is saved in your browser.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, PlayCircleIcon, AwardIcon } from '@/components/icons'
import { useProgressStore } from '@/stores/progress'
import { COURSE } from '@/data/course'
import Header from '@/components/Header.vue'
import StageCard from '@/components/StageCard.vue'
import StageChip from '@/components/StageChip.vue'
import ModulePanel from '@/components/ModulePanel.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'

const progressStore = useProgressStore()

const openStageIdx = ref<number | null>(null)
const openModuleIdx = ref<number | null>(null)

function reset() {
  progressStore.resetProgress()
  openStageIdx.value = null
  openModuleIdx.value = null
}

function openStage(index: number) {
  openStageIdx.value = index
  openModuleIdx.value = null
}

function openModule(index: number) {
  openModuleIdx.value = index
}

function markComplete() {
  if (openStageIdx.value !== null && openModuleIdx.value !== null) {
    const stage = COURSE[openStageIdx.value]
    const module = stage.modules[openModuleIdx.value]
    progressStore.markModuleComplete(stage.id, module.id)
  }
}

function continueToNext() {
  const { stageIndex, moduleIndex } = progressStore.findNextIncompleteModule()
  openStageIdx.value = stageIndex
  openModuleIdx.value = moduleIndex
}
</script>
