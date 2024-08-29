import { File, Folder, Item } from '@cylon/common-library';
import { LayoutBody } from './LayoutBody';
import { LayoutName } from './LayoutName';

export class LayoutBlock {
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

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.tsx'));
    items.push(new File(null, 'props.ts'));

    const layout: Item = new Folder(null, this.name.value, items);

    return layout;
  }
}
