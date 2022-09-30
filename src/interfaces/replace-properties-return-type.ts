import type { ReplaceReturnType } from './replace-return-type';

/**
 * Replace return type in all properties of interface or type
 */
export type ReplacePropertiesReturnType<TP, TNewType = Promise<void> | void> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [key in keyof TP]: ReplaceReturnType<TP[key], TNewType>;
};
