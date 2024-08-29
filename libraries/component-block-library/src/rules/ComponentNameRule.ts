import { applyRule, Context, Input, ModelType, Result, Rule } from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { ComponentName } from '../models';

// ComponentName:
//   Identifier

export const ComponentNameRule: Rule = {
  name: 'ComponentName',
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
      new ComponentName(identifier.value),
      ModelType.COMPONENT_NAME
    );
  }
};
