import { useCallback, useEffect, useRef } from "react"

function useTimeout(callback: () => void, delay: number) {
  console.log({ callback, delay })
  const callBackRef = useRef(callback)
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

export {
  useTimeout
}

