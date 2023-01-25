export type RequiredProps<T, TKeys extends keyof T> = Partial<T> & Required<Pick<T, TKeys>>;

export type RequiredOnlyProps<T, TKeys extends keyof T> = T & Required<Pick<T, TKeys>>;
