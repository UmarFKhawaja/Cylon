import { ComponentBody } from './ComponentBody';
import { ComponentName } from './ComponentName';

export class Component {
  protected readonly _name: ComponentName;

  protected readonly _body: ComponentBody;

  constructor(name: ComponentName, body: ComponentBody) {
    this._name = name;
    this._body = body;
  }

  get name(): ComponentName {
    return this._name;
  }

  get body(): ComponentBody {
    return this._body;
  }
}
