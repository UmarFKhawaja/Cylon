import { Identifier, TypeName } from '@cylon/core-library';
import { FieldSpan } from './FieldSpan';

export class AttributeSpan extends FieldSpan {
  constructor(name: Identifier, typeName: TypeName) {
    super(name, typeName);
  }
}
