import { GenerateBody } from './GenerateBody';
import { GenerateName } from './GenerateName';

export class GenerateClause {
  protected readonly _name: GenerateName;

  protected readonly _body: GenerateBody;

  constructor(name: GenerateName, body: GenerateBody) {
    this._name = name;
    this._body = body;
  }

  get name(): GenerateName {
    return this._name;
  }

  get body(): GenerateBody {
    return this._body;
  }
}
