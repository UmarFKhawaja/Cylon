import { applyRule, Input, ModelType, Output, Result, Rule } from '@cylon/common-library';
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
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = output.removeModel<Identifier>();

    output.addModel(
      new ComponentName(identifier.value),
      ModelType.COMPONENT_NAME
    );
  }
};
