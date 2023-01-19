export type MatchKeyTypes<T, TY> = { [K in keyof T]-?: T[K] extends TY ? K : never }[keyof T];
