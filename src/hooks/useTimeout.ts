import { useCallback, useEffect, useRef } from 'react'

type UseTimeoutProps = {
  reset: () => void
  clear: () => void
}

function useTimeout(callback: () => void, delay: number): UseTimeoutProps {
  const callBackRef = useRef(callback)
  // eslint-disable-next-line
  const timeoutRef = useRef<any>()

  useEffect(() => {
    callBackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callBackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

export { useTimeout }
