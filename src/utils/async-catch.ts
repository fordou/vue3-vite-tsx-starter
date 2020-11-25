import { HttpError } from 'http-errors';

export function asyncCatch<T, U = HttpError>(promise: Promise<T>): Promise<[T | null, U | null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null])
    .catch<[null, U]>(err => {
      console.warn(err)
      return [null, err]
    });
}
