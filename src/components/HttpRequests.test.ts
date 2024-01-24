import { mount, flushPromises } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import axios from 'axios'
import Component from './HttpRequests.vue'

const mockPostListResponse = {
  data: {
    posts: [
      { id: 1, title: 'title1' },
      { id: 2, title: 'title2' }
    ]
  }
}

// Following lines tell Vitest to mock any call to `axios.get`
// and to return `mockPostListResponse` instead
vi.spyOn(axios, 'get').mockResolvedValue(mockPostListResponse)

test('loads posts on button click', async () => {
  const wrapper = mount(Component)

  await wrapper.get('button').trigger('click')

  // Let's assert that we've called axios.get the right amount of times and
  // with the right parameters.
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/posts')

  // Wait until the DOM updates.
  await flushPromises()

  // Finally, we make sure we've rendered the content from the API.
  const posts = wrapper.findAll('[data-test="post"]')

  expect(posts).toHaveLength(2)
  expect(posts[0].text()).toContain('title1')
  expect(posts[1].text()).toContain('title2')
})

test('displays loading state on button click', async () => {
  const wrapper = mount(Component)

  // Notice that we run the following assertions before clicking on the button
  // Here, the component should be in a "not loading" state.
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')

  // Now let's trigger it as usual.
  await wrapper.get('button').trigger('click')

  // We assert for "Loading state" before flushing all promises.
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  expect(wrapper.get('button').attributes()).toHaveProperty('disabled')

  // As we did before, wait until the DOM updates.
  await flushPromises()

  // After that, we're back at a "not loading" state.
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')
})
