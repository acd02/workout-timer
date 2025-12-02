/**
 * Creates an array containing a range of integers, inclusive of both endpoints.
 *
 * @example
 *
 * const result = range(2, 4)
 * // result === [2, 3, 4]
 */
export function range(start: number, end: number): number[] {
  if (start < 0 || end < 0) return []

  return Array.from(Array(end + 1).keys()).slice(start)
}

/**
 * Appends an element or an array of elements to the end of an array, creating a new array.
 *
 * If the item to append is an array, each element of that array is appended individually.
 *
 * @example
 *
 * const nums = [1, 2]
 * const result = append(nums, 3)
 * // result === [1, 2, 3]
 *
 * @example
 *
 * const nums = [1, 2]
 * const result = append(nums, [3, 4])
 * // result === [1, 2, 3, 4]
 */
export function append<T>(arr: T[], item: T | T[]): T[] {
  if (Array.isArray(item)) {
    return arr.concat(item)
  }

  const cpy = arr.slice()
  cpy.push(item)

  return cpy
}

/**
 * Prepends an element or an array of elements to the front of an array, creating a new array.
 *
 * If the item to prepend is an array, each element of that array is prepended individually.
 *
 * @example
 *
 * const nums = [1, 2]
 * const result = prepend(nums, 3)
 * // result === [3, 1, 2]
 *
 * @example
 *
 * const nums = [1, 2]
 * const result = prepend(nums, [3, 4])
 * // result === [3, 4, 1, 2]
 */
export function prepend<T>(arr: T[], item: T | T[]): T[] {
  if (Array.isArray(item)) {
    return item.concat(arr)
  }

  const copy = arr.slice()
  copy.unshift(item)

  return copy
}
