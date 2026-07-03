import { describe, it, expect } from 'vitest'

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('My Project! @2024')).toBe('my-project-2024')
  })

  it('trims leading/trailing hyphens', () => {
    expect(slugify('  --hello--  ')).toBe('hello')
  })

  it('collapses multiple separators into one', () => {
    expect(slugify('foo   bar--baz')).toBe('foo-bar-baz')
  })
})
