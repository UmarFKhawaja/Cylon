import { Field } from './Field';

export class Props extends Array<Field> {
  constructor(...fields: Field[]) {
    super(...fields);
  }
}
