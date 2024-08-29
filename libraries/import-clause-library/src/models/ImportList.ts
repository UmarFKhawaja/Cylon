import { Identifier } from '@cylon/core-library';

export type ImportList =
  | CombinedImportList
  | DestructuredImportList
  | NamedImportList;

export class CombinedImportList {
  protected readonly _identifier: Identifier;

  protected readonly _identifiers: Identifier[];

  constructor(identifier: Identifier, identifiers: Identifier[]) {
    this._identifier = identifier;
    this._identifiers = identifiers;
  }
}

export class DestructuredImportList {
  protected readonly _identifiers: Identifier[];

  constructor(identifiers: Identifier[]) {
    this._identifiers = identifiers;
  }
}

export class NamedImportList {
  protected readonly _identifier: Identifier;

  constructor(identifier: Identifier) {
    this._identifier = identifier;
  }
}
