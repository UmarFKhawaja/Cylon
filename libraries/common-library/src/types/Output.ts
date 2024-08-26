import { Item } from './Item';

export class Output {
  protected readonly _item: Item;

  constructor(item: Item) {
    this._item = item;
  }

  get item(): Item {
    return this._item;
  }

  async write(path: string): Promise<void> {
    await this.item.write(path);
  }
}
