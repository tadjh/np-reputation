export function composeKey(str: string, num: number): string {
  return `${str}-${num}`;
}

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
