// @vitest-environment happy-dom
import { afterEach, expect, it, vi } from 'vitest'
vi.mock('./local-only.js', async original => ({ ...(await original()), LOCAL_ONLY: true }))
import { setLang, t, getLang, exerciseNameFor } from './i18n.js'
import names from '../exercise-names/zh.js'

afterEach(() => vi.unstubAllGlobals())

it('renders Chinese UI and exercise names when network requests fail', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  await setLang('en')
  await setLang('zh', false)
  expect(getLang()).toBe('zh')
  expect(t('Settings')).toBe('设置')
  expect(t('Export backup (JSON)')).toBe('导出备份（JSON）')
  expect(document.documentElement.lang).toBe('zh')
  const [id, translated] = Object.entries(names)[0]
  expect(exerciseNameFor({ id, n: 'Exercise' })).toBe(translated)
  expect(fetch).not.toHaveBeenCalled()
})
