import { useCallback, useEffect, useRef } from 'react'

// eslint-disable-next-line
export function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number): (...args: T) => void {
  const timeoutRef = useRef<number | null>(null)

  const debouncedFunction = useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedFunction
}
