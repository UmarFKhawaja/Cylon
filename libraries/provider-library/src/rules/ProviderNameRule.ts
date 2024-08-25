import { applyRule, Input, ModelType, Output, Result, Rule } from '@cylon/common-library';
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
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = output.removeModel<Identifier>();

    output.assertEmpty();

    output.addModel(
      new ProviderName(identifier.value),
      ModelType.PROVIDER_NAME
    );
  }
};
