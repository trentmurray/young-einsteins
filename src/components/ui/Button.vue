<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => [
  'btn',
  {
    'btn-primary': props.variant === 'primary',
    'btn-secondary': props.variant === 'secondary',
    'btn-ghost': props.variant === 'ghost',
  }
])
</script>
