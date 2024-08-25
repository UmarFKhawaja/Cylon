import { LayoutBody } from './LayoutBody';
import { LayoutName } from './LayoutName';

export class Layout {
  protected readonly _name: LayoutName;

  protected readonly _body: LayoutBody;

  constructor(name: LayoutName, body: LayoutBody) {
    this._name = name;
    this._body = body;
  }

  get name(): LayoutName {
    return this._name;
  }

  get body(): LayoutBody {
    return this._body;
  }
}
