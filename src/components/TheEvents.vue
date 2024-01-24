<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'increment', count: number): void
  (
    e: 'increment2',
    obj: {
      count: number
      isEven: boolean
    }
  ): void
}>()
const count = ref(0)
const count2 = ref(0)

const handleClick = () => {
  count.value += 1
  emit('increment', count.value)
}
const handleClick2 = () => {
  count2.value += 1
  emit('increment2', {
    count: count2.value,
    isEven: count2.value % 2 === 0
  })
}
</script>

<template>
  <button @click="handleClick" id="button1">Increment</button>
  <button @click="handleClick2" id="button2">Increment</button>
</template>
