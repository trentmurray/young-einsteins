<template>
  <div class="mt-4 space-y-3">
    <div class="font-medium">Quick Check</div>
    <div class="text-sm">{{ quiz.q }}</div>
    <div class="grid gap-2">
      <button
        v-for="(option, index) in quiz.options"
        :key="index"
        @click="setChoice(index)"
        :class="[
          'rounded-2xl px-3 py-2 border text-left',
          choice === index ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:bg-slate-50'
        ]"
      >
        {{ option }}
      </button>
    </div>
    <div class="flex items-center gap-3">
      <Button @click="submit" class="gap-2">
        <PlayCircleIcon />
        Submit
      </Button>
      <span class="text-sm text-slate-600">{{ feedback }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlayCircleIcon } from '@/components/icons'
import Button from '@/components/ui/Button.vue'
import type { Quiz as QuizType } from '@/types/course'

interface Props {
  quiz: QuizType
}

const props = defineProps<Props>()

const emit = defineEmits<{
  pass: []
}>()

const choice = ref<number | null>(null)
const feedback = ref<string>('')

function setChoice(index: number) {
  choice.value = index
}

function submit() {
  if (choice.value === props.quiz.answerIndex) {
    feedback.value = "Nice! That's correct."
    setTimeout(() => emit('pass'), 500)
  } else {
    feedback.value = "Not quite — try again!"
  }
}
</script>
