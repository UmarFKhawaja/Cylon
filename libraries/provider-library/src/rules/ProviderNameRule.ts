import { applyRule, Context, Input, ModelType, Result, Rule } from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { ProviderName } from '../models';

// ProviderName:
//   Identifier

export const ProviderNameRule: Rule = {
  name: 'ProviderName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, IdentifierRule);
  },
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.assertEmpty();

    context.addModel(
      new ProviderName(identifier.value),
      ModelType.PROVIDER_NAME
    );
  }
};
