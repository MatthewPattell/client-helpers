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
    return this.transform((__, value: string) => (value === '' ? null : Number(value)));
  });
  addMethod(number, 'replaceComma', function () {
    return this.transform((__, val: string | number) =>
      typeof val === 'string' ? Number(val.replace(/,/, '.')) : val,
    );
  });
}

export default ExtendYupValidation;
