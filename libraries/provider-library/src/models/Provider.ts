import { File, Folder, Item } from '@cylon/common-library';
import { ProviderBody } from './ProviderBody';
import { ProviderName } from './ProviderName';

export class Provider {
  protected readonly _name: ProviderName;

  protected readonly _body: ProviderBody;

  constructor(name: ProviderName, body: ProviderBody) {
    this._name = name;
    this._body = body;
  }

  get name(): ProviderName {
    return this._name;
  }

  get body(): ProviderBody {
    return this._body;
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.tsx'));
    items.push(new File(null, 'contexts.ts'));
    items.push(new File(null, 'props.ts'));
    items.push(new File(null, 'types.ts'));

    const provider: Item = new Folder(null, this.name.value, items);

    return provider;
  }
}
