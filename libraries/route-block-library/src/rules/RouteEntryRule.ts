import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { RouteEntry, RouteName } from '../models';
import { RouteNameRule } from './RouteNameRule';

// RouteEntry:
//   InsignificantWhitespace RouteName

export const RouteEntryRule: Rule = {
  name: 'RouteEntry',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      InsignificantWhitespaceRule,
      RouteNameRule
    ));
  },
  produce: (context: Context): void => {
    context.skipWhitespace();

    context.assertModel(ModelType.ROUTE_NAME);

    const routeName: RouteName = context.removeModel<RouteName>();

    context.assertEmpty();

    context.addModel(
      new RouteEntry(routeName),
      ModelType.ROUTE_ENTRY
    );
  }
};
