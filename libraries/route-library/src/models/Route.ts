import { File, Folder, Item } from '@cylon/common-library';
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

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.tsx'));
    items.push(new File(null, 'props.ts'));

    const route: Item = new Folder(null, this.name.value, items);

    return route;
  }
}
