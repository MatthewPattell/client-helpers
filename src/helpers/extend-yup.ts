import { string, number, addMethod } from 'yup';

/**
 * ExtendYupValidation
 * @constructor
 */
function ExtendYupValidation(): void {
  addMethod(string, 'stripEmptyString', function () {
    return this.transform((value: string) => (value === '' ? null : value));
  });
  addMethod(number, 'stripEmptyString', function () {
    return this.transform((__, value: string) => (value === '' ? null : value));
  });
}

export default ExtendYupValidation;
