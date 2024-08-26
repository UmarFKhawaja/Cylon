import { applyRule, Context, Input, ModelType, Result, Rule } from '@cylon/common-library';
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
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.addModel(
      new AppName(identifier.value),
      ModelType.APP_NAME
    );
  }
};
