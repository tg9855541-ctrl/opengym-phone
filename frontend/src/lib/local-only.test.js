// @vitest-environment happy-dom
import { afterEach, expect, it, vi } from 'vitest'
import { shareBackup } from './local-only.js'

afterEach(() => vi.restoreAllMocks())

it('hands the exact JSON backup to the native share sheet as a named file', async () => {
  const share = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'canShare', { configurable: true, value: () => true })
  Object.defineProperty(navigator, 'share', { configurable: true, value: share })
  const json = '{"workouts":[],"theme":"light"}'
  await shareBackup(json, 'opengym-backup-test.json')
  const file = share.mock.calls[0][0].files[0]
  expect(file.name).toBe('opengym-backup-test.json')
  expect(file.type).toBe('application/json')
  expect(await file.text()).toBe(json)
})

it('leaves cancellation to the caller without reporting an iCloud save', async () => {
  const error = Object.assign(new Error('Cancelled'), { name: 'AbortError' })
  Object.defineProperty(navigator, 'canShare', { configurable: true, value: () => true })
  Object.defineProperty(navigator, 'share', { configurable: true, value: vi.fn().mockRejectedValue(error) })
  await expect(shareBackup('{}', 'backup.json')).rejects.toBe(error)
})
