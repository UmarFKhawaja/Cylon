import { RouteName } from './RouteName';

export class RouteEntry {
  protected readonly _name: RouteName;

  constructor(name: RouteName) {
    this._name = name;
  }

  get name(): RouteName {
    return this._name;
  }
}
