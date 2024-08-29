import {
  applyRule,
  CloseParenthesisRule,
  ColonRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  OpenParenthesisRule,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier, IdentifierRule, TypeName, TypeNameRule } from '@cylon/core-library';
import { MethodSpan, ParamsSpan } from '../models';
import { ParamsSpanRule } from './ParamsSpanRule';

// MethodSpan:
//   Identifier InsignificantWhitespace OpenParenthesis InsignificantWhitespace ParamsSpan? InsignificantWhitespace CloseParenthesis InsignificantWhitespace Colon InsignificantWhitespace TypeName

export const MethodSpanRule: Rule = {
  name: 'MethodSpan',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      IdentifierRule,
      InsignificantWhitespaceRule,
      OpenParenthesisRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ParamsSpanRule),
      InsignificantWhitespaceRule,
      CloseParenthesisRule,
      InsignificantWhitespaceRule,
      ColonRule,
      InsignificantWhitespaceRule,
      TypeNameRule
    ));
  },
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.skipWhitespace();

    context.assertOpenParenthesis();

    context.removeChar();

    context.skipWhitespace();

    const params: ParamsSpan = context.hasModel(ModelType.PARAMS)
      ? context.removeModel<ParamsSpan>()
      : new ParamsSpan();

    context.skipWhitespace();

    context.assertCloseParenthesis();

    context.removeChar();

    context.assertChar(':');

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.TYPE_NAME);

    const typeName: TypeName = context.removeModel<TypeName>();

    context.addModel(
      new MethodSpan(identifier, params, typeName),
      ModelType.METHOD
    );
  }
};
