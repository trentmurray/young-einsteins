<template>
  <div class="inline-flex items-center gap-2 rounded-2xl px-3 py-1 bg-slate-100 text-slate-700 text-xs">
    <RocketIcon />
    <span>Stage {{ index + 1 }}</span>
  </div>
</template>

<script setup lang="ts">
import { RocketIcon } from '@/components/icons'

interface Props {
  index: number
}

defineProps<Props>()
</script>
