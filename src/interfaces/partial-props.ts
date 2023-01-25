export type PartialProps<T, TKeys extends keyof T> = Omit<T, TKeys> & Partial<Pick<T, TKeys>>;
