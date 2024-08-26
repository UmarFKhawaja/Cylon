import { File, Folder, Item } from '@cylon/common-library';
import { Layout } from './Layout';

export class Layouts extends Array<Layout> {
  constructor(...layouts: Layout[]) {
    super(...layouts);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((layout: Layout): Item => layout.render()));

    const layouts: Item = new Folder(null, 'layouts', items);

    return layouts;
  }
}
