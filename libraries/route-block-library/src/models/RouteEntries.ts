import { RouteEntry } from './RouteEntry';

export class RouteEntries extends Array<RouteEntry> {
  constructor(...routeEntries: RouteEntry[]) {
    super(...routeEntries);
  }
}
