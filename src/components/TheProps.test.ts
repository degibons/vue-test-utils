import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Component from './TheProps.vue'

test('renders a profile link', () => {
  const wrapper = mount(Component)

  expect(wrapper.get('#profile').text()).toEqual('My Profile')
})

test('does not renders an admin link', () => {
  const wrapper = mount(Component)

  expect(wrapper.find('#admin').exists()).toBe(false)
})

test('renders an admin link', () => {
  const wrapper = mount(Component, {
    props: {
      admin: true
    }
  })

  expect(wrapper.get('#admin').text()).toEqual('Admin')
})

test('does not show the user dropdown', () => {
  const wrapper = mount(Component)

  expect(wrapper.get('#user-dropdown').isVisible()).toBe(false)
})
