<script setup lang="ts">
import { ref } from 'vue'
import FormInput from './FormInput.vue'

interface Form {
  email: string
  description: string
  city: string
  subscribe: boolean
  interval: string
}

const emit = defineEmits<{
  (e: 'submit', form: Form): void
  (e: 'focus-lost'): void
}>()

const form = ref<Form>({
  email: '',
  description: '',
  city: '',
  subscribe: false,
  interval: ''
})

const customInput = ref('')

const submit = () => {
  emit('submit', form.value)
}

const handleBlur = (event: FocusEvent) => {
  if ((event.relatedTarget as HTMLElement).tagName === 'BUTTON') {
    emit('focus-lost')
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <FormInput v-model="customInput" label="Text Input" data-test="custom-input" ref="formInput" />
    <div data-test="custom-input-value">{{ customInput }}</div>

    <input type="email" v-model="form.email" data-test="input" @blur="handleBlur" />

    <textarea v-model="form.description" />

    <select v-model="form.city">
      <option value="new-york">New York</option>
      <option value="moscow">Moscow</option>
    </select>

    <input type="checkbox" v-model="form.subscribe" />

    <input type="radio" value="weekly" v-model="form.interval" />
    <input type="radio" value="monthly" v-model="form.interval" />

    <button type="submit">Submit</button>
  </form>
</template>
