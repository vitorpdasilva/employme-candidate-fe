import { UseMutateFunction } from '@tanstack/react-query'

export type GenericMutationHookResponse<ResponseShape, InputShape> = {
  loading: boolean
  error: Error | null
  onCall: UseMutateFunction<ResponseShape, Error, InputShape, unknown>
}
