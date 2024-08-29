import { Identifier } from '@cylon/core-library';

export type ImportSource =
  | ScopedImportPackage
  | UnscopedImportPackage;

export class ScopedImportPackage {
  protected readonly _scopeName: Identifier;

  protected readonly _packageName: Identifier;

  constructor(scopeName: Identifier, packageName: Identifier) {
    this._scopeName = scopeName;
    this._packageName = packageName;
  }

  get scopeName(): Identifier {
    return this._scopeName;
  }

  get packageName(): Identifier {
    return this._packageName;
  }
}

export class UnscopedImportPackage {
  protected readonly _packageName: Identifier;

  constructor(packageName: Identifier) {
    this._packageName = packageName;
  }

  get packageName(): Identifier {
    return this._packageName;
  }
}
