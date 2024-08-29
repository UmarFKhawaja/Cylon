import { Identifier, TypeName } from '@cylon/core-library';

export class ParamSpan {
  protected readonly _name: Identifier;

  protected readonly _typeName: TypeName;

  constructor(name: Identifier, typeName: TypeName) {
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
