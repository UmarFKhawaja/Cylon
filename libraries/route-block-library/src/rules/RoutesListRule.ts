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
import { RouteEntries, RoutesList } from '../models';
import { RouteEntriesRule } from './RouteEntriesRule';
import { RoutesKeywordRule } from './RoutesKeywordRule';

// RoutesList:
//   RoutesKeyword InsignificantWhitespace OpenCurlyBracket InsignificantWhitespace RouteEntries InsignificantWhitespace CloseCurlyBracket

export const RoutesListRule: Rule = {
  name: 'RoutesList',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      RoutesKeywordRule,
      InsignificantWhitespaceRule,
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      RouteEntriesRule,
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertKeyword('routes');

    context.removeKeyword();

    context.skipWhitespace();

    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.ROUTE_ENTRIES);

    const routeEntries: RouteEntries = context.removeModel<RouteEntries>();

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new RoutesList(routeEntries),
      ModelType.ROUTES_LIST
    );
  }
};
