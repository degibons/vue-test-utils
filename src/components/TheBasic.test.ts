import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Component from './TheBasic.vue'

test('renders a todo', () => {
  const wrapper = mount(Component)

  const todo = wrapper.get('[data-test="todo"')

  expect(todo.text()).toBe('Learn Vue.js 3')
})

test('creates a new todo', async () => {
  const wrapper = mount(Component)
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)

  await wrapper.get('[data-test="new-todo"]').setValue('New Todo')
  await wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
})

test('completes a todo', async () => {
  const wrapper = mount(Component)

  await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

  expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
})
