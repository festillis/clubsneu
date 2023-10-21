export type Safe<T> =
  | {
      hasError: false;
      data: T;
    }
  | {
      hasError: true;
      errorText: string;
    };
