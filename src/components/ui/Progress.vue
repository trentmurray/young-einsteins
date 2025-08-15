<template>
  <div class="progress">
    <div 
      class="progress-bar" 
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number
}

defineProps<Props>()
</script>
