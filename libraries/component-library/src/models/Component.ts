import { File, Folder, Item } from '@cylon/common-library';
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

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.tsx'));
    items.push(new File(null, 'props.ts'));

    if (this.body.components.length > 0) {
      items.push(this.body.components.render());
    }

    const component: Item = new Folder(null, this.name.value, items);

    return component;
  }
}
