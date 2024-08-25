import { Identifier, TypeName } from '@cylon/core-library';
import { Field } from './Field';
import { Params } from './Params';

export class Method extends Field {
  protected readonly _params: Params;

  constructor(name: Identifier, params: Params, typeName: TypeName) {
    super(name, typeName);

    this._params = params;
  }

  get params(): Params {
    return this._params;
  }
}
