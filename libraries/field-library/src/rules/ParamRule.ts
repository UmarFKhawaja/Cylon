import {
  applyRule,
  ColonRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier, IdentifierRule, TypeName, TypeNameRule } from '@cylon/core-library';
import { Param } from '../models';

// Param:
//   Identifier InsignificantWhitespace Colon InsignificantWhitespace TypeName

export const ParamRule: Rule = {
  name: 'Param',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      IdentifierRule,
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

    context.assertColon();

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.TYPE_NAME);

    const typeName: TypeName = context.removeModel<TypeName>();

    context.addModel(
      new Param(identifier, typeName),
      ModelType.PARAM
    );
  }
};
