export default function checkExpiry(a: string, b: Date): boolean {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();

  return timeA < timeB;
}
