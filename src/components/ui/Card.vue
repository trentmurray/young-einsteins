<template>
  <div :class="['card', { 'hover:shadow-md transition': hover }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false
})
</script>
