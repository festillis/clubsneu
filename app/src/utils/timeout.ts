export const wait = <T>(
  fn: (...args: unknown[]) => T | Promise<T>,
  milliseconds: number
): Promise<T> => {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      const result = fn();
      if (result instanceof Promise) {
        result.then(resolve);
      } else {
        resolve(result);
      }
    }, milliseconds);
  });
};
