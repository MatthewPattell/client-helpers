/* eslint-disable @typescript-eslint/naming-convention */
import type { StringSchema as BaseStringSchema, NumberSchema as BaseNumberSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    stripEmptyString(): BaseStringSchema;
  }

  interface NumberSchema {
    stripEmptyString(): BaseNumberSchema;
  }
}
