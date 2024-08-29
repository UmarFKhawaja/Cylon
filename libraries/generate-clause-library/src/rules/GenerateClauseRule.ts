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
import { GenerateBody, GenerateClause, GenerateName } from '../models';
import { GenerateBodyRule } from './GenerateBodyRule';
import { GenerateKeywordRule } from './GenerateKeywordRule';
import { GenerateNameRule } from './GenerateNameRule';

// GenerateClause:
//   GenerateKeyword InsignificantWhitespace GenerateName InsignificantWhitespace GenerateBody

export const GenerateClauseRule: Rule = {
  name: 'GenerateClause',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      GenerateKeywordRule,
      InsignificantWhitespaceRule,
      GenerateNameRule,
      InsignificantWhitespaceRule,
      GenerateBodyRule
    ));
  },
  produce: (context: Context): void => {
    context.assertKeyword('generate');

    context.removeKeyword();

    context.skipWhitespace();

    context.assertModel(ModelType.GENERATE_NAME);

    const generateName: GenerateName = context.removeModel<GenerateName>();

    context.skipWhitespace();

    context.assertModel(ModelType.GENERATE_BODY);

    const generateBody: GenerateBody = context.removeModel<GenerateBody>();

    context.addModel(
      new GenerateClause(generateName, generateBody),
      ModelType.GENERATE_CLAUSE
    );
  }
};
