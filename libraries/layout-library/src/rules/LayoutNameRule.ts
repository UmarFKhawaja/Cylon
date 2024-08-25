import { applyRule, Input, ModelType, Output, Result, Rule } from '@cylon/common-library';
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
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = output.removeModel<Identifier>();

    output.addModel(
      new LayoutName(identifier.value),
      ModelType.LAYOUT_NAME
    );
  }
};
