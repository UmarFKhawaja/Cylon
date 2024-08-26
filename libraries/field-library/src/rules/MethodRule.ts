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
import { Method, Params } from '../models';
import { ParamsRule } from './ParamsRule';

// Method:
//   Identifier InsignificantWhitespace OpenParenthesis InsignificantWhitespace Params? InsignificantWhitespace CloseParenthesis InsignificantWhitespace Colon InsignificantWhitespace TypeName

export const MethodRule: Rule = {
  name: 'Method',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      IdentifierRule,
      InsignificantWhitespaceRule,
      OpenParenthesisRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ParamsRule),
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

    const params: Params = context.hasModel(ModelType.PARAMS)
      ? context.removeModel<Params>()
      : new Params();

    context.skipWhitespace();

    context.assertCloseParenthesis();

    context.removeChar();

    context.assertColon();

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.TYPE_NAME);

    const typeName: TypeName = context.removeModel<TypeName>();

    context.addModel(
      new Method(identifier, params, typeName),
      ModelType.METHOD
    );
  }
};
