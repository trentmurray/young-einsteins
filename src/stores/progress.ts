import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ProgressMap } from '@/types/course'
import { COURSE } from '@/data/course'

const STORAGE_KEY = 'spacekidpro_progress_v1'

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function saveProgress(progress: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

export const useProgressStore = defineStore('progress', () => {
  const progress = ref<ProgressMap>(loadProgress())

  // Computed properties
  const totalModules = computed(() => 
    COURSE.reduce((acc, stage) => acc + stage.modules.length, 0)
  )

  const totalCompleted = computed(() => 
    COURSE.reduce((acc, stage) => 
      acc + Object.values(progress.value[stage.id] || {}).filter(Boolean).length, 0
    )
  )

  const totalPercentage = computed(() => 
    (totalCompleted.value / totalModules.value) * 100
  )

  // Actions
  function markModuleComplete(stageId: string, moduleId: string) {
    progress.value = {
      ...progress.value,
      [stageId]: {
        ...(progress.value[stageId] || {}),
        [moduleId]: true
      }
    }
    saveProgress(progress.value)
  }

  function isModuleCompleted(stageId: string, moduleId: string): boolean {
    return !!(progress.value[stageId]?.[moduleId])
  }

  function getStageProgress(stageId: string) {
    const stage = COURSE.find(s => s.id === stageId)
    if (!stage) return { completed: 0, total: 0, percentage: 0 }
    
    const completed = stage.modules.filter(m => 
      isModuleCompleted(stageId, m.id)
    ).length
    
    return {
      completed,
      total: stage.modules.length,
      percentage: (completed / stage.modules.length) * 100
    }
  }

  function isStageLocked(stageIndex: number): boolean {
    if (stageIndex === 0) return false // Stage 1 is always unlocked
    
    const prevStage = COURSE[stageIndex - 1]
    return prevStage.modules.some(m => !isModuleCompleted(prevStage.id, m.id))
  }

  function findNextIncompleteModule() {
    for (let s = 0; s < COURSE.length; s++) {
      const stage = COURSE[s]
      for (let m = 0; m < stage.modules.length; m++) {
        const module = stage.modules[m]
        if (!isModuleCompleted(stage.id, module.id)) {
          return { stageIndex: s, moduleIndex: m }
        }
      }
    }
    // If all completed, return the last module of the last stage
    return { 
      stageIndex: COURSE.length - 1, 
      moduleIndex: COURSE[COURSE.length - 1].modules.length - 1 
    }
  }

  function resetProgress() {
    clearProgress()
    progress.value = {}
  }

  return {
    progress,
    totalModules,
    totalCompleted,
    totalPercentage,
    markModuleComplete,
    isModuleCompleted,
    getStageProgress,
    isStageLocked,
    findNextIncompleteModule,
    resetProgress
  }
})
