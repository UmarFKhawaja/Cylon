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
import { Attribute, Field, Method, Props } from '../models';
import { AttributeRule } from './AttributeRule';
import { MethodRule } from './MethodRule';
import { PropsKeywordRule } from './PropsKeywordRule';

// Props:
//   PropsKeyword InsignificantWhitespace OpenCurlyBracket ( InsignificantWhitespace ( Attribute | Method ) )* InsignificantWhitespace CloseCurlyBracket

export const PropsRule: Rule = {
  name: 'Props',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      PropsKeywordRule,
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
    output.assertKeyword('props');

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
      new Props(...fields),
      ModelType.PROPS
    );
  }
};
