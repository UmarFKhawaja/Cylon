import {
  applyRule,
  CloseCurlyBracketRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  OpenCurlyBracketRule,
  Output,
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
  produce: (output: Output): void => {
    output.assertOpenCurlyBracket();

    output.removeChar();

    output.skipWhitespace();

    output.assertModel(ModelType.ROUTES_LIST);

    const routesList: RoutesList = output.removeModel<RoutesList>();

    output.skipWhitespace();

    output.assertCloseCurlyBracket();

    output.removeChar();

    output.assertEmpty();

    output.addModel(
      new AppBody(routesList),
      ModelType.APP_BODY
    );
  }
};
