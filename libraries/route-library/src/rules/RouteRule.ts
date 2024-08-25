import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  Output,
  Result,
  Rule,
  SignificantWhitespaceRule
} from '@cylon/common-library';
import { References } from '@cylon/core-library';
import { Route, RouteBody, RouteName } from '../models';
import { RouteKeywordRule, RouteNameRule } from '../rules';
import { RouteBodyRule } from './RouteBodyRule';

// Route:
//   RouteKeyword SignificantWhitespace RouteName InsignificantWhitespace RouteBody?

export const RouteRule: Rule = {
  name: 'Route',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      RouteKeywordRule,
      SignificantWhitespaceRule,
      RouteNameRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(RouteBodyRule)
    ));
  },
  produce: (output: Output): void => {
    output.assertKeyword('route');

    output.removeKeyword();

    output.assertWhitespace();

    output.removeWhitespace();

    output.skipWhitespace();

    output.assertModel(ModelType.ROUTE_NAME);

    const routeName: RouteName = output.removeModel<RouteName>();

    output.skipWhitespace();

    const routeBody: RouteBody = output.hasModel(ModelType.ROUTE_BODY)
      ? output.removeModel<RouteBody>()
      : new RouteBody(
        new References()
      );

    output.assertEmpty();

    output.addModel(
      new Route(routeName, routeBody),
      ModelType.ROUTE
    );
  }
};
