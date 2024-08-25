import {
  applyRule,
  ColonRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  Output,
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
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = output.removeModel<Identifier>();

    output.skipWhitespace();

    output.assertColon();

    output.removeChar();

    output.skipWhitespace();

    output.assertModel(ModelType.TYPE_NAME);

    const typeName: TypeName = output.removeModel<TypeName>();

    output.addModel(
      new Param(identifier, typeName),
      ModelType.PARAM
    );
  }
};
