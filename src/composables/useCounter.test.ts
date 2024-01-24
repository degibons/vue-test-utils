import { expect, test } from 'vitest'
import { useCounter } from './useCounter'

test('increase counter on call', () => {
  const { counter, increase } = useCounter()

  expect(counter.value).toBe(0)

  increase()

  expect(counter.value).toBe(1)
})
