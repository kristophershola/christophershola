import { useEffect, useState } from 'react'

export default function useMedia(queries: string[], values: number[], defaultValue: number) {
  const [value, set] = useState(() => {
    const index = queries.findIndex(q => matchMedia(q).matches)
    return values[index] ?? defaultValue
  })

  useEffect(() => {
    const handler = () => {
      const index = queries.findIndex(q => matchMedia(q).matches)
      set(values[index] ?? defaultValue)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [queries, values, defaultValue])

  return value
}
