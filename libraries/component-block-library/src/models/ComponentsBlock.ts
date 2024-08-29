import { File, Folder, Item } from '@cylon/common-library';
import { ComponentBlock } from './ComponentBlock';

export class ComponentsBlock extends Array<ComponentBlock> {
  constructor(...components: ComponentBlock[]) {
    super(...components);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((component: ComponentBlock): Item => component.render()));

    const components: Item = new Folder(null, 'components', items);

    return components;
  }
}
