import { List } from './List';

export class Queue<T> extends List<T> {
  constructor() {
    super();
  }

  override get nextIndex(): number {
    return 0;
  }

  override add(item: T): void {
    this._items.push(item);
  }

  override remove(): T {
    if (this.isEmpty) {
      throw new Error('RemoveFromQueueError');
    }

    const item: T = this._items.shift() as T;

    return item;
  }
}
