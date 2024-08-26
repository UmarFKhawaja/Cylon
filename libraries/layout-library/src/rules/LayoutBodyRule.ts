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
import { References, ReferencesRule } from '@cylon/core-library';
import { LayoutBody } from '../models';

// LayoutBody:
//   OpenCurlyBracket InsignificantWhitespace References InsignificantWhitespace CloseCurlyBracket

export const LayoutBodyRule: Rule = {
  name: 'LayoutBody',
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
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.REFERENCES);

    const references: References = context.removeModel<References>();

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new LayoutBody(references),
      ModelType.LAYOUT_BODY
    );
  }
};
