import { formatDistanceToNow } from "date-fns";

const distanceFromNow = epochDate => `Posted ${formatDistanceToNow(new Date(epochDate))} ago`;

export default distanceFromNow;