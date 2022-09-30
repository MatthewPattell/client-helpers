/**
 * Swap object properties values
 * E.g.: { a:1, b:2 } => { a:2, b:1 }
 */
const swapPropValues = <TProps extends Record<string, any>>(props: TProps): TProps => {
  const values = Object.values(props).reverse();

  return Object.keys(props).reduce(
    (res, key, i) => ({
      ...res,
      [key]: values[i],
    }),
    {},
  ) as TProps;
};

export default swapPropValues;
