import { ModelType } from './ModelType';

export abstract class Token {
  protected constructor() {
  }
}

export abstract class ValueToken<T> extends Token {
  protected readonly _value: T;

  protected constructor(value: T) {
    super();

    this._value = value;
  }

  get value(): T {
    return this._value;
  }
}

export class CharToken extends ValueToken<string> {
  constructor(value: string) {
    super(value);
  }
}

export class StringToken extends ValueToken<string> {
  constructor(value: string) {
    super(value);
  }
}

export class NumberToken extends ValueToken<number> {
  constructor(value: number) {
    super(value);
  }
}

export class KeywordToken extends Token {
  protected readonly _keyword: string;

  constructor(keyword: string) {
    super();

    this._keyword = keyword;
  }

  get keyword(): string {
    return this._keyword;
  }
}

export class ModelToken extends Token {
  protected readonly _model: object;

  protected readonly _modelType: ModelType;

  constructor(model: object, modelType: ModelType) {
    super();

    this._model = model;
    this._modelType = modelType;
  }

  get model(): object {
    return this._model;
  }

  get modelType(): ModelType {
    return this._modelType;
  }
}
