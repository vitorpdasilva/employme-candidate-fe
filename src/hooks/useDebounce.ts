import { useEffect } from 'react'
import { useTimeout } from './useTimeout'

const useDebounce = (callback: () => void, delay: number, dependencies: unknown[]): void => {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}

export { useDebounce }
