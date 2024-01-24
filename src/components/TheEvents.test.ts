import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Component from './TheEvents.vue'

test('emits an event when clicked', () => {
  const wrapper = mount(Component)

  wrapper.find('#button1').trigger('click')

  expect(wrapper.emitted()).toHaveProperty('increment')
})

test('emits an event with count when clicked', () => {
  const wrapper = mount(Component)

  wrapper.find('#button1').trigger('click')
  wrapper.find('#button1').trigger('click')

  const incrementEvent = wrapper.emitted('increment') as Array<any>

  expect(incrementEvent).toHaveLength(2)
  expect(incrementEvent[0]).toEqual([1])
  expect(incrementEvent[1]).toEqual([2])
})

test('emits an event with count object when clicked', () => {
  const wrapper = mount(Component)

  wrapper.find('#button2').trigger('click')
  wrapper.find('#button2').trigger('click')

  const incrementEvent = wrapper.emitted('increment2')

  expect(incrementEvent).toHaveLength(2)
  if (incrementEvent?.length) {
    expect(incrementEvent[0]).toEqual([
      {
        count: 1,
        isEven: false
      }
    ])
    expect(incrementEvent[1]).toEqual([
      {
        count: 2,
        isEven: true
      }
    ])
  }
})
