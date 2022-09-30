/**
 * Replace return type in provided function
 */
export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn = void> = (
  ...a: Parameters<T>
) => TNewReturn;
