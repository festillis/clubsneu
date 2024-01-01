export type Safe<T> =
  | {
      hasError: false;
      data: T;
    }
  | {
      hasError: true;
      errorText: string;
    };

export const toSafe = async <T>(
  fn: (...args: unknown[]) => T | Promise<T>
): Promise<Safe<T>> => {
  try {
    const data = await Promise.resolve(fn());
    return { hasError: false, data };
  } catch (e) {
    return { hasError: true, errorText: (e as Error).message };
  }
};
