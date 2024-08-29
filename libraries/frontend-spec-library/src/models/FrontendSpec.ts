import { Item } from '@cylon/common-library';
import { GenerateClause } from '@cylon/generate-clause-library';
import { ImportClause } from '@cylon/import-clause-library';

export class FrontendSpec {
  protected readonly _importClauses: ImportClause[];
  protected readonly _generateClause: GenerateClause;

  constructor(
    importClauses: ImportClause[],
    generateClause: GenerateClause
  ) {
    this._importClauses = importClauses;
    this._generateClause = generateClause;
  }

  get importClauses(): ImportClause[] {
    return this._importClauses;
  }

  get generateClause(): GenerateClause {
    return this._generateClause;
  }

  render(): Item {
    throw new Error();
  }
}
