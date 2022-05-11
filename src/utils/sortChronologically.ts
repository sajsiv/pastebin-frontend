import { contentInterface } from "./contentInterface";
export default function sortByDate(
  a: contentInterface,
  b: contentInterface
): number {
  const timeA = new Date(a.creationDate).getTime();
  const timeB = new Date(b.creationDate).getTime();
  return timeA < timeB ? 1 : -1;
}
