import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Component from './TheForm.vue'

test('sets the value', async () => {
  const wrapper = mount(Component)
  const input = wrapper.find('input')

  await input.setValue('my@mail.com')

  expect(input.element.value).toBe('my@mail.com')
})

test('trigger a submit event', async () => {
  const wrapper = mount(Component)

  await wrapper.find('button').trigger('click')

  expect(wrapper.emitted()).toHaveProperty('submit')
})

test('emits the input to its parent', async () => {
  const wrapper = mount(Component)

  await wrapper.find('input').setValue('my@mail.com')
  await wrapper.find('button').trigger('click')

  const submitEvent = wrapper.emitted('submit') as Array<any>

  expect(submitEvent[0][0]).toBe('my@mail.com')
})
