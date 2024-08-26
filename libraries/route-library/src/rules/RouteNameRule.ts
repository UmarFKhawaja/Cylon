import { applyRule, Context, Input, ModelType, Result, Rule } from '@cylon/common-library';
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
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.addModel(
      new RouteName(identifier.value),
      ModelType.ROUTE_NAME
    );
  }
};
