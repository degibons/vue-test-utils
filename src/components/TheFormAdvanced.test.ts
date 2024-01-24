import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Component from './TheFormAdvanced.vue'

test('submits a form', async () => {
  const wrapper = mount(Component)

  const email = 'name@mail.com'
  const description = 'Lorem ipsum dolor sit amet'
  const city = 'moscow'

  await wrapper.find('input[type=email]').setValue(email)
  await wrapper.find('textarea').setValue(description)
  await wrapper.find('select').setValue(city)
  await wrapper.find('input[type=checkbox]').setValue()
  await wrapper.find('input[type=radio][value=monthly]').setValue()

  await wrapper.find('form').trigger('submit.prevent')

  const submitEvent = wrapper.emitted('submit') as Array<any>

  expect(submitEvent[0][0]).toStrictEqual({
    email,
    description,
    city,
    subscribe: true,
    interval: 'monthly'
  })
})

test('emits an event only if you lose focus to a button', () => {
  const wrapper = mount(Component)

  const componentToGetFocus = wrapper.find('button')

  wrapper.find('[data-test="input"]').trigger('blur', {
    relatedTarget: componentToGetFocus.element
  })

  expect(wrapper.emitted('focus-lost')).toBeTruthy()
})

test('fills in the form', async () => {
  const wrapper = mount(Component)
  const text = 'Text'

  await wrapper.find('[data-test="custom-input"] input').setValue(text)

  expect(wrapper.find('[data-test="custom-input-value"]').text()).toBe(text)
})

test('fills in the form', async () => {
  const wrapper = mount(Component)
  const text = 'Text'

  await wrapper.findComponent({ ref: 'formInput' }).setValue(text)

  expect(wrapper.find('[data-test="custom-input-value"]').text()).toBe(text)
})
