import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Component from './TheSlots.vue'

test('layout default slot', () => {
  const wrapper = mount(Component, {
    slots: {
      default: 'Main Content'
    }
  })

  expect(wrapper.find('main').text()).toContain('Main Content')
})

test('layout named slot', () => {
  const wrapper = mount(Component, {
    slots: {
      header: '<div>Header</div>'
    }
  })

  expect(wrapper.html()).toContain('<div>Header</div>')
})

test('layout multiple slots', () => {
  const wrapper = mount(Component, {
    slots: {
      footer: ['<div id="one">One</div>', '<div id="two">Two</div>']
    }
  })

  expect(wrapper.find('footer').find('#one').exists()).toBe(true)
  expect(wrapper.find('footer').find('#two').exists()).toBe(true)
})

test('scoped slots', () => {
  const wrapper = mount(Component, {
    slots: {
      scoped: `<template #scoped="scope">
        Hello {{ scope.msg }}
        </template>
      `
    }
  })

  expect(wrapper.html()).toContain('Hello world')
})

test('scoped slots bindings exposed as a params object', () => {
  const wrapper = mount(Component, {
    slots: {
      scoped: `Hello {{ params.msg }}` // no wrapping template tag provided, slot scope exposed as "params"
    }
  })

  expect(wrapper.html()).toContain('Hello world')
})
