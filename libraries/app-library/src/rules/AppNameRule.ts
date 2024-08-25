import { applyRule, Input, ModelType, Output, Result, Rule } from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { AppName } from '../models';

// AppName:
//   Identifier

export const AppNameRule: Rule = {
  name: 'AppName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, IdentifierRule);
  },
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = output.removeModel<Identifier>();

    output.addModel(
      new AppName(identifier.value),
      ModelType.APP_NAME
    );
  }
};
