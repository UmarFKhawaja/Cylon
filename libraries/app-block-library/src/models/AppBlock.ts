import { File, Folder, Item } from '@cylon/common-library';
import { AppBody } from './AppBody';
import { AppName } from './AppName';

export class AppBlock {
  protected readonly _name: AppName;

  protected readonly _body: AppBody;

  constructor(name: AppName, body: AppBody) {
    this._name = name;
    this._body = body;
  }

  get name(): AppName {
    return this._name;
  }

  get body(): AppBody {
    return this._body;
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.tsx'));
    items.push(new File(null, 'props.ts'));

    const app: Item = new Folder(null, this.name.value, items);

    return app;
  }
}
