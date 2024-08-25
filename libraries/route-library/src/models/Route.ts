import { RouteBody } from './RouteBody';
import { RouteName } from './RouteName';

export class Route {
  protected readonly _name: RouteName;

  protected readonly _body: RouteBody;

  constructor(name: RouteName, body: RouteBody) {
    this._name = name;
    this._body = body;
  }

  get name(): RouteName {
    return this._name;
  }

  get body(): RouteBody {
    return this._body;
  }
}
