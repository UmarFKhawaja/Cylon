import { Field } from './Field';

export class State extends Array<Field> {
  constructor(...fields: Field[]) {
    super(...fields);
  }
}
