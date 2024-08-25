import { List } from './List';

export class Stack<T> extends List<T> {
  constructor() {
    super();
  }

  override get nextIndex(): number {
    return this._items.length - 1;
  }

  override add(item: T): void {
    this._items.push(item);
  }

  override remove(): T {
    if (this.isEmpty) {
      throw new Error('RemoveFromStackError');
    }

    const item: T = this._items.pop() as T;

    return item;
  }
}
