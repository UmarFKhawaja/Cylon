import { Identifier, TypeName } from '@cylon/core-library';
import { FieldSpan } from './FieldSpan';
import { ParamsSpan } from './ParamsSpan';

export class MethodSpan extends FieldSpan {
  protected readonly _params: ParamsSpan;

  constructor(name: Identifier, params: ParamsSpan, typeName: TypeName) {
    super(name, typeName);

    this._params = params;
  }

  get params(): ParamsSpan {
    return this._params;
  }
}
