import { applyRule, Input, ModelType, Output, Result, Rule } from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { RouteName } from '../models';

// RouteName:
//   Identifier

export const RouteNameRule: Rule = {
  name: 'RouteName',
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
      new RouteName(identifier.value),
      ModelType.ROUTE_NAME
    );
  }
};
