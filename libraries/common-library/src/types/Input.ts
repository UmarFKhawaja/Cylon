import { readStream } from '../methods';

export class Input {
  protected _text: string;

  protected _index: number;

  protected _length: number;

  protected _level: number;

  protected constructor(text: string) {
    this._text = text;
    this._index = 0;
    this._length = text.length;
    this._level = 0;
  }

  static async fromStream(stream: NodeJS.ReadStream): Promise<Input> {
    const text: string = await readStream(stream);

    const input: Input = new Input(text);

    return input;
  }

  static fromText(text: string): Input {
    const input: Input = new Input(text);

    return input;
  }

  static fromPath(path: string): Input {
    const text: string = '';

    const input: Input = new Input(text);

    return input;
  }

  get hasMoreInput(): boolean {
    return this._index < this._length;
  }

  get index(): number {
    return this._index;
  }

  get length(): number {
    return this._length;
  }

  get level(): number {
    return this._level;
  }

  get char(): string {
    return this._text[this._index]!;
  }

  setIndex(index: number): void {
    if (index > this._length) {
      throw new Error('SetIndexError');
    }

    this._index = index;
  }

  incrementIndex(): void {
    if (this._index > this._length) {
      throw new Error('IncrementIndexError');
    }

    this._index++;
  }

  decrementIndex(): void {
    if (this._index === 0) {
      throw new Error('DecrementIndexError');
    }

    this._index--;
  }

  increaseLevel(): void {
    this._level++;
  }

  decreaseLevel(): void {
    if (this._level > 0) {
      this._level--;
    }
  }
}
