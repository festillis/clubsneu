import server$ from 'solid-start/server';
import { Safe } from '~/types/safe';

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

// export const runOnServer = async <T>(
//   fn: (...args: unknown[]) => T | Promise<T>
// ): Promise<T> => {
//   const serverFn = server$(fn);
//   return await serverFn();
// };

// export const toSafeServerFn = <T>(
//   fn: (...args: unknown[]) => T | Promise<T>
// ) => {
//   return toSafe(server$(fn));
// };
