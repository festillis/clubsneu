export const undefinedIfEmpty = <T>(array: T[]) => {
  return array && array.length > 0 ? array : undefined;
};
