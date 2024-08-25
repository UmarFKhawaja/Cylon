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
import { References, ReferencesRule } from '@cylon/core-library';
import { RouteBody } from '../models';

// RouteBody:
//   OpenCurlyBracket InsignificantWhitespace References InsignificantWhitespace CloseCurlyBracket

export const RouteBodyRule: Rule = {
  name: 'RouteBody',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      ReferencesRule,
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (output: Output): void => {
    output.assertOpenCurlyBracket();

    output.removeChar();

    output.skipWhitespace();

    output.assertModel(ModelType.REFERENCES);

    const references: References = output.removeModel<References>();

    output.skipWhitespace();

    output.assertCloseCurlyBracket();

    output.removeChar();

    output.assertEmpty();

    output.addModel(
      new RouteBody(references),
      ModelType.ROUTE_BODY
    );
  }
};
