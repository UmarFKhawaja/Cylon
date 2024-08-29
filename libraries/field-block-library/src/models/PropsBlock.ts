import { FieldSpan } from './FieldSpan';

export class PropsBlock extends Array<FieldSpan> {
  constructor(...fields: FieldSpan[]) {
    super(...fields);
  }
}
