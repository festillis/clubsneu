import { Safe } from './safe';

export type NeedsAuth<T> =
  | {
      needsAuth: true;
    }
  | {
      needsAuth: false;
      data: Safe<T>;
    };
