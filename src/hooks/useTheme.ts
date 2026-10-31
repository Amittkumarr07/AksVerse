import { useEffect, useState } from 'react'

const STORAGE_KEY = 'aks-theme'

/** Dark / light theme. The choice is saved in localStorage and set on <html data-theme>. */
export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem(STORAGE_KEY) !== 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }, [dark])

  return { dark, setDark }
}
