import type { FC, PropsWithChildren } from 'react';

/**
 * Custom Type for a React functional component with props AND CHILDREN
 */
export type FCC<TP = Record<string, any>> = FC<PropsWithChildren<TP>>;
