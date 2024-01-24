import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Component from './PropsContain.vue'

test('renders an error when password length is too short', async () => {
  const wrapper = mount(Component, {
    props: {
      minLength: 10
    }
  })

  await wrapper.find('input').setValue('pass')

  expect(wrapper.html()).toContain('Password must be at least 10 characters')
})

test('renders a greeting conditionally', async () => {
  const wrapper = mount(Component)

  expect(wrapper.html()).toContain('Hello')

  await wrapper.setProps({ show: false })

  expect(wrapper.html()).not.toContain('Hello')
})
