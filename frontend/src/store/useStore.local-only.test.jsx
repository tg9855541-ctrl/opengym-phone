// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
vi.mock('../lib/local-only.js', async original => ({ ...(await original()), LOCAL_ONLY: true }))
import { useStore, freshState } from './useStore.js'
import { effectiveLang } from '../lib/default-lang.js'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(() => { throw new Error('A static local profile must not call a backend') }))
  useStore.setState({ S: freshState(), user: null, ready: false, config: null })
})
afterEach(() => { vi.unstubAllGlobals(); localStorage.clear() })

it('boots with empty real records and Chinese, without backend requests or demo history', async () => {
  await useStore.getState().boot()
  const { S, config, ready } = useStore.getState()
  expect(ready).toBe(true)
  expect(useStore.getState().isGuest()).toBe(true)
  expect(S.workouts).toEqual([])
  expect(S.bodyweight).toEqual([])
  expect(localStorage.getItem('gym_demo_seeded_v1')).toBeNull()
  expect(effectiveLang(S, config)).toBe('zh')
  expect(fetch).not.toHaveBeenCalled()
})

it('saves a local edit and keeps it over another boot without seeding or uploading', async () => {
  await useStore.getState().boot()
  useStore.getState().update(s => { s.theme = 'light' })
  expect(JSON.parse(localStorage.getItem('gym_state_v1')).theme).toBe('light')
  await useStore.getState().boot()
  expect(useStore.getState().S.theme).toBe('light')
  expect(fetch).not.toHaveBeenCalled()
})
