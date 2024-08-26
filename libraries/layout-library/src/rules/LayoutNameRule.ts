import { applyRule, Context, Input, ModelType, Result, Rule } from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { LayoutName } from '../models';

// LayoutName:
//   Identifier

export const LayoutNameRule: Rule = {
  name: 'LayoutName',
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
      new LayoutName(identifier.value),
      ModelType.LAYOUT_NAME
    );
  }
};
