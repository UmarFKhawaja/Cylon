import { Identifier, TypeName } from '@cylon/core-library';

export abstract class FieldSpan {
  protected readonly _name: Identifier;

  protected readonly _typeName: TypeName;

  protected constructor(name: Identifier, typeName: TypeName) {
    this._name = name;
    this._typeName = typeName;
  }

  get name(): Identifier {
    return this._name;
  }

  get typeName(): TypeName {
    return this._typeName;
  }
}
