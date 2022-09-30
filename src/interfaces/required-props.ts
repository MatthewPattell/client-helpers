export type RequiredProps<T, TKeys extends keyof T> = Partial<T> & Required<Pick<T, TKeys>>;
