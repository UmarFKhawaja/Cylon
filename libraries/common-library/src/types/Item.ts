import { join as joinPath } from 'path';
import { Log } from './Log';

export abstract class Item {
  protected _parent: Folder | null;

  protected readonly _name: string;

  protected constructor(parent: Folder | null, name: string) {
    this._parent = parent;
    this._name = name;
  }

  get parent(): Folder | null {
    return this._parent;
  }

  set parent(value: Folder) {
    this._parent = value;
  }

  get name(): string {
    return this._name;
  }

  get location(): string {
    return this.parent ? joinPath(this.parent.location, this.name) : this.name;
  }

  abstract get items(): Item[];

  abstract write(path: string): Promise<void>;
}

export class Folder extends Item {
  protected readonly _items: Item[];

  constructor(parent: Folder | null, name: string, items: Item[]) {
    super(parent, name);

    this._items = items.map((item: Item): Item => {
      item.parent = this;

      return item;
    });
  }

  override get items(): Item[] {
    return this._items.reduce(
      (items: Item[], item: Item): Item[] =>
        items.concat([item, ...item.items]),
      []
    );
  }

  override async write(path: string): Promise<void> {
    Log.info(joinPath(path, this.location));

    for (const item of this.items) {
      await item.write(path);
    }
  }
}

export class File extends Item {
  constructor(parent: Folder | null, name: string) {
    super(parent, name);
  }

  override get items(): Item[] {
    return [];
  }

  override async write(path: string): Promise<void> {
    Log.info(joinPath(path, this.location));
  }
}
