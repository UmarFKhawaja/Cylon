import { ImportList } from './ImportList';
import { ImportSource } from './ImportSource';

export class ImportClause {
  protected readonly _importList: ImportList;

  protected readonly _importSource: ImportSource;

  constructor(importList: ImportList, importSource: ImportSource) {
    this._importList = importList;
    this._importSource = importSource;
  }

  get importList(): ImportList {
    return this._importList;
  }

  get importSource(): ImportSource {
    return this._importSource;
  }
}
