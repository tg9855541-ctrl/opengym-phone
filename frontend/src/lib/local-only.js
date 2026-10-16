// The personal static PWA: no backend, no demo data, no upload or cloud account.
export const LOCAL_ONLY = import.meta.env.VITE_LOCAL_ONLY === '1'
export const LOCAL_CONFIG = Object.freeze({ allow_guest: true, default_lang: 'zh', local_only: true })

export async function shareBackup(json, filename) {
  const file = new File([json], filename, { type: 'application/json' })
  if (navigator.canShare?.({ files: [file] })) {
    // The user chooses Save to Files -> iCloud Drive. Resolving this does not attest to iCloud sync.
    await navigator.share({ files: [file], title: 'openGym 备份' })
    return
  }
  const href = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(href), 60_000)
}
