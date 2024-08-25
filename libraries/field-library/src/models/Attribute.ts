import { Identifier, TypeName } from '@cylon/core-library';
import { Field } from './Field';

export class Attribute extends Field {
  constructor(name: Identifier, typeName: TypeName) {
    super(name, typeName);
  }
}
