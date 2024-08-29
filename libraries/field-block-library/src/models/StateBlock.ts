import { FieldSpan } from './FieldSpan';

export class StateBlock extends Array<FieldSpan> {
  constructor(...fields: FieldSpan[]) {
    super(...fields);
  }
}
