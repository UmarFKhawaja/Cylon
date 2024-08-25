import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  Output,
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
  produce: (output: Output): void => {
    output.skipWhitespace();

    output.assertModel(ModelType.ROUTE_NAME);

    const routeName: RouteName = output.removeModel<RouteName>();

    output.assertEmpty();

    output.addModel(
      new RouteEntry(routeName),
      ModelType.ROUTE_ENTRY
    );
  }
};
