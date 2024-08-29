import { File, Folder, Item } from '@cylon/common-library';
import { ProviderBlock } from './ProviderBlock';

export class ProvidersBlock extends Array<ProviderBlock> {
  constructor(...providers: ProviderBlock[]) {
    super(...providers);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((provider: ProviderBlock): Item => provider.render()));

    const providers: Item = new Folder(null, 'providers', items);

    return providers;
  }
}
