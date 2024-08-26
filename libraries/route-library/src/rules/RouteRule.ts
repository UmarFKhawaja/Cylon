import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
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
  produce: (context: Context): void => {
    context.assertKeyword('route');

    context.removeKeyword();

    context.assertWhitespace();

    context.removeWhitespace();

    context.skipWhitespace();

    context.assertModel(ModelType.ROUTE_NAME);

    const routeName: RouteName = context.removeModel<RouteName>();

    context.skipWhitespace();

    const routeBody: RouteBody = context.hasModel(ModelType.ROUTE_BODY)
      ? context.removeModel<RouteBody>()
      : new RouteBody(
        new References()
      );

    context.assertEmpty();

    context.addModel(
      new Route(routeName, routeBody),
      ModelType.ROUTE
    );
  }
};
