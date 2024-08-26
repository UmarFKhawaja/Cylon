import {
  applyRule,
  CloseCurlyBracketRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  OpenCurlyBracketRule,
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
  produce: (context: Context): void => {
    context.assertKeyword('props');

    context.removeKeyword();

    context.skipWhitespace();

    context.assertOpenCurlyBracket();

    context.removeChar();

    const fields: Field[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasModel(ModelType.ATTRIBUTE)) {
        const attribute: Attribute = context.removeModel<Attribute>();

        fields.push(attribute);
      } else if (context.hasModel(ModelType.METHOD)) {
        const method: Method = context.removeModel<Method>();

        fields.push(method);
      } else {
        break;
      }
    }

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new Props(...fields),
      ModelType.PROPS
    );
  }
};
