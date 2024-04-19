import { expect, test } from 'vitest'

const sum = (one,two) => one + two

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
