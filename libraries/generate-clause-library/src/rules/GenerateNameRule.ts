import { applyRule, Context, Input, ModelType, Result, Rule } from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { GenerateName } from '../models';

// GenerateName:
//   Identifier

export const GenerateNameRule: Rule = {
  name: 'GenerateName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, IdentifierRule);
  },
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.addModel(
      new GenerateName(identifier.value),
      ModelType.GENERATE_NAME
    );
  }
};
