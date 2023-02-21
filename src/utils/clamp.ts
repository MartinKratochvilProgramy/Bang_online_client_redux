export default function clamp (num: number, max: number): number {
  // clamps number between 0 and max
  if (num === max) {
    return 0
  } else if (num > max) {
    return num % max
  } else {
    return num
  }
}
