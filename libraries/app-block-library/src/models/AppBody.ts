import { RoutesList } from '@cylon/route-block-library';

export class AppBody {
  protected readonly _routesList: RoutesList;

  constructor(routesList: RoutesList) {
    this._routesList = routesList;
  }

  get routesList(): RoutesList {
    return this._routesList;
  }
}
