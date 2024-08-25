import { AppBody } from './AppBody';
import { AppName } from './AppName';

export class App {
  protected readonly _name: AppName;

  protected readonly _body: AppBody;

  constructor(name: AppName, body: AppBody) {
    this._name = name;
    this._body = body;
  }

  get name(): AppName {
    return this._name;
  }

  get body(): AppBody {
    return this._body;
  }
}
