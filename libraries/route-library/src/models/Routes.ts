import { Route } from './Route';

export class Routes extends Array<Route> {
  constructor(...routes: Route[]) {
    super(...routes);
  }
}
