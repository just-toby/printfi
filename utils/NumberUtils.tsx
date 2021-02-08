export function toInteger(input: number): number {
  if (input < 0) {
    return 0;
  }
  return Math.floor(input);
}
