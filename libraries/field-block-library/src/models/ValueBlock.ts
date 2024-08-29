import { FieldSpan } from './FieldSpan';

export class ValueBlock extends Array<FieldSpan> {
  constructor(...fields: FieldSpan[]) {
    super(...fields);
  }
}
