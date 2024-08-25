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
import { RouteEntries, RoutesList } from '../models';
import { RoutesKeywordRule } from './RoutesKeywordRule';
import { RouteEntriesRule } from './RouteEntriesRule';

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
  produce: (output: Output): void => {
    output.assertKeyword('routes');

    output.removeKeyword();

    output.skipWhitespace();

    output.assertOpenCurlyBracket();

    output.removeChar();

    output.skipWhitespace();

    output.assertModel(ModelType.ROUTE_ENTRIES);

    const routeEntries: RouteEntries = output.removeModel<RouteEntries>();

    output.skipWhitespace();

    output.assertCloseCurlyBracket();

    output.removeChar();

    output.assertEmpty();

    output.addModel(
      new RoutesList(routeEntries),
      ModelType.ROUTES_LIST
    );
  }
};
