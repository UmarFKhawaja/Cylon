export abstract class List<T> {
  protected readonly _items: T[];

  protected constructor() {
    this._items = [];
  }

  get isEmpty(): boolean {
    return this._items.length === 0;
  }

  get length(): number {
    return this._items.length;
  }

  abstract get nextIndex(): number;

  abstract add(item: T): void;

  abstract remove(): T;

  peek(): T {
    if (this.isEmpty) {
      throw new Error('PeekListError');
    }

    const item: T = this._items[this.nextIndex] as T;

    return item;
  }
}
