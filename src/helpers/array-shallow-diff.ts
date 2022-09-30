import _ from 'lodash';

/**
 * Return shallow difference between two array for value
 */
const arrayShallowDiff = (array1: Record<string, any>[], array2: Record<string, any>[]) =>
  // eslint-disable-next-line @typescript-eslint/unbound-method
  _.differenceWith(array1, array2, _.isEqual) as Record<string, any>[];

/**
 * Return object with shallow difference between two array for value and count
 */
const arrayShallowDiffForRemove = (
  array1: Record<string, any>[],
  array2: Record<string, any>[],
) => {
  const fieldsToRemove = _.difference(_.map(array2, 'id'), _.map(array1, 'id'));

  return {
    fieldsToUpdate: arrayShallowDiff(array1, array2),
    fieldsToRemove,
  };
};

export { arrayShallowDiff, arrayShallowDiffForRemove };
