import { File, Folder, Item } from '@cylon/common-library';
import { Provider } from './Provider';

export class Providers extends Array<Provider> {
  constructor(...providers: Provider[]) {
    super(...providers);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((provider: Provider): Item => provider.render()));

    const providers: Item = new Folder(null, 'providers', items);

    return providers;
  }
}
