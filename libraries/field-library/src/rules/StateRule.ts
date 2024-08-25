import {
  applyRule,
  CloseCurlyBracketRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  OpenCurlyBracketRule,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Attribute, Field, Method, State } from '../models';
import { AttributeRule } from './AttributeRule';
import { MethodRule } from './MethodRule';
import { StateKeywordRule } from './StateKeywordRule';

// State:
//   StateKeyword InsignificantWhitespace OpenCurlyBracket ( InsignificantWhitespace ( Attribute | Method ) )* InsignificantWhitespace CloseCurlyBracket

export const StateRule: Rule = {
  name: 'State',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      StateKeywordRule,
      InsignificantWhitespaceRule,
      OpenCurlyBracketRule,
      makeZeroOrMoreRule(
        makeAllRulesRule(
          InsignificantWhitespaceRule,
          makeAnyRulesRule(
            MethodRule,
            AttributeRule
          )
        )
      ),
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (output: Output): void => {
    output.assertKeyword('state');

    output.removeKeyword();

    output.skipWhitespace();

    output.assertOpenCurlyBracket();

    output.removeChar();

    const fields: Field[] = [];

    while (!output.isEmpty) {
      output.skipWhitespace();

      if (output.hasModel(ModelType.ATTRIBUTE)) {
        const attribute: Attribute = output.removeModel<Attribute>();

        fields.push(attribute);
      } else if (output.hasModel(ModelType.METHOD)) {
        const method: Method = output.removeModel<Method>();

        fields.push(method);
      } else {
        break;
      }
    }

    output.assertCloseCurlyBracket();

    output.removeChar();

    output.assertEmpty();

    output.addModel(
      new State(...fields),
      ModelType.STATE
    );
  }
};
