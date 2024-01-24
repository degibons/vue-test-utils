<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const update = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label>
    {{ label }}
    <input type="text" :value="modelValue" @input="update" />
  </label>
</template>
