import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { GenerateClause, GenerateClauseRule } from '@cylon/generate-clause-library';
import { ImportClause, ImportClauseRule } from '@cylon/import-clause-library';
import { FrontendSpec } from '../models';

// FrontendSpec:
//   InsignificantWhitespace ( ImportClause InsignificantWhitespace )* GenerateClause InsignificantWhitespace

export const FrontendSpecRule: Rule = {
  name: 'FrontendSpec',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      makeZeroOrMoreRule(
        makeAllRulesRule(
          InsignificantWhitespaceRule,
          ImportClauseRule
        )
      ),
      InsignificantWhitespaceRule,
      GenerateClauseRule,
      InsignificantWhitespaceRule
    ));
  },
  produce: (context: Context): void => {
    const importClauses: ImportClause[] = [];

    context.skipWhitespace();

    while (!context.isEmpty) {
      if (context.hasModel(ModelType.IMPORT_CLAUSE)) {
        const importClause: ImportClause = context.removeModel<ImportClause>();

        importClauses.push(importClause);

        context.skipWhitespace();
      } else {
        break;
      }
    }

    context.assertModel(ModelType.GENERATE_CLAUSE);

    const generateClause: GenerateClause = context.removeModel<GenerateClause>();

    context.skipWhitespace();

    context.assertEmpty();

    context.addModel(
      new FrontendSpec(importClauses, generateClause),
      ModelType.FRONTEND_SPEC
    );
  }
};
