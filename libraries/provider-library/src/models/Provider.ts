import { ProviderBody } from './ProviderBody';
import { ProviderName } from './ProviderName';

export class Provider {
  protected readonly _name: ProviderName;

  protected readonly _body: ProviderBody;

  constructor(name: ProviderName, body: ProviderBody) {
    this._name = name;
    this._body = body;
  }

  get name(): ProviderName {
    return this._name;
  }

  get body(): ProviderBody {
    return this._body;
  }
}
