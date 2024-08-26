import { File, Folder, Item } from '@cylon/common-library';
import { Route } from './Route';

export class Routes extends Array<Route> {
  constructor(...routes: Route[]) {
    super(...routes);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((route: Route): Item => route.render()));

    const routes: Item = new Folder(null, 'routes', items);

    return routes;
  }
}
