import { File, Folder, Item } from '@cylon/common-library';
import { RouteBlock } from './RouteBlock';

export class RoutesBlock extends Array<RouteBlock> {
  constructor(...routes: RouteBlock[]) {
    super(...routes);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((route: RouteBlock): Item => route.render()));

    const routes: Item = new Folder(null, 'routes', items);

    return routes;
  }
}
