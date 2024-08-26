import {
  applyRule,
  CloseCurlyBracketRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  OpenCurlyBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { RoutesList, RoutesListRule } from '@cylon/route-library';
import { AppBody } from '../models';

// AppBody:
//   OpenCurlyBracket InsignificantWhitespace RoutesList InsignificantWhitespace CloseCurlyBracket

export const AppBodyRule: Rule = {
  name: 'AppBody',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      RoutesListRule,
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.ROUTES_LIST);

    const routesList: RoutesList = context.removeModel<RoutesList>();

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new AppBody(routesList),
      ModelType.APP_BODY
    );
  }
};
