export abstract class TypeName {
  protected constructor() {
  }
}

export class VoidTypeName extends TypeName {
  constructor() {
    super();
  }
}

export class NonVoidTypeName extends TypeName {
  protected readonly _dataType: string;

  constructor(dataType: string) {
    super();

    this._dataType = dataType;
  }

  get dataType(): string {
    return this._dataType;
  }
}
