import { File, Folder, Item } from '@cylon/common-library';
import { LayoutBlock } from './LayoutBlock';

export class LayoutsBlock extends Array<LayoutBlock> {
  constructor(...layouts: LayoutBlock[]) {
    super(...layouts);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((layout: LayoutBlock): Item => layout.render()));

    const layouts: Item = new Folder(null, 'layouts', items);

    return layouts;
  }
}
