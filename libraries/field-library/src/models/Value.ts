import { Field } from './Field';

export class Value extends Array<Field> {
  constructor(...fields: Field[]) {
    super(...fields);
  }
}
