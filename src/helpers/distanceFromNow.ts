import { formatDistanceToNow } from "date-fns"

const distanceFromNow = (epochDate: Date) =>  (
  `Posted ${formatDistanceToNow(new Date(epochDate))} ago`
)

export default distanceFromNow
