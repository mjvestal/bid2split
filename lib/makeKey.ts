export default function makeKey(...args: number[]): string {
  return args.join('_');
}