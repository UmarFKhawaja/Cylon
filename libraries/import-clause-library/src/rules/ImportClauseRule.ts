import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { FromKeywordRule } from '@cylon/core-library';
import { ImportClause, ImportList, ImportSource } from '../models';
import { ImportKeywordRule } from './ImportKeywordRule';
import { ImportListRule } from './ImportListRule';
import { ImportSourceRule } from './ImportSourceRule';

// ImportClause:
//   ImportKeyword InsignificantWhitespace ImportList InsignificantWhitespace FromKeyword InsignificantWhitespace ImportSource

export const ImportClauseRule: Rule = {
  name: 'ImportClause',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      ImportKeywordRule,
      InsignificantWhitespaceRule,
      ImportListRule,
      InsignificantWhitespaceRule,
      FromKeywordRule,
      InsignificantWhitespaceRule,
      ImportSourceRule
    ));
  },
  produce: (context: Context): void => {
    context.assertKeyword('import');

    context.removeKeyword();

    context.skipWhitespace();

    context.assertModel(ModelType.IMPORT_LIST);

    const importList: ImportList = context.removeModel<ImportList>();

    context.skipWhitespace();

    context.assertKeyword('from');

    context.removeKeyword();

    context.skipWhitespace();

    context.assertModel(ModelType.IMPORT_SOURCE);

    const importSource: ImportSource = context.removeModel<ImportSource>();

    context.assertEmpty();

    context.addModel(
      new ImportClause(importList, importSource),
      ModelType.IMPORT_CLAUSE
    );
  }
};
