<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    minLength: number
    show: boolean
  }>(),
  {
    show: true
  }
)

const password = ref('')
const greeting = ref('Hello')

const error = computed((): string => {
  if (password.value.length < props.minLength) {
    return `Password must be at least ${props.minLength} characters.`
  }
  return ''
})
</script>

<template>
  <div>
    <div v-if="show">{{ greeting }}</div>
    <input v-model="password" />
    <div v-if="error">{{ error }}</div>
  </div>
</template>
