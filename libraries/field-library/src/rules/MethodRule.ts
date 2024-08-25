import {
  applyRule,
  CloseParenthesisRule,
  ColonRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  OpenParenthesisRule,
  Output,
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
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = output.removeModel<Identifier>();

    output.skipWhitespace();

    output.assertOpenParenthesis();

    output.removeChar();

    output.skipWhitespace();

    const params: Params = output.hasModel(ModelType.PARAMS)
      ? output.removeModel<Params>()
      : new Params();

    output.skipWhitespace();

    output.assertCloseParenthesis();

    output.removeChar();

    output.assertColon();

    output.removeChar();

    output.skipWhitespace();

    output.assertModel(ModelType.TYPE_NAME);

    const typeName: TypeName = output.removeModel<TypeName>();

    output.addModel(
      new Method(identifier, params, typeName),
      ModelType.METHOD
    );
  }
};
