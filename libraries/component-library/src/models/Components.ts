import { File, Folder, Item } from '@cylon/common-library';
import { Component } from './Component';

export class Components extends Array<Component> {
  constructor(...components: Component[]) {
    super(...components);
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new File(null, 'index.ts'));
    items.push(...this.map((component: Component): Item => component.render()));

    const components: Item = new Folder(null, 'components', items);

    return components;
  }
}
