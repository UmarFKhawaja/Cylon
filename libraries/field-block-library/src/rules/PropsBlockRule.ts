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
import { AttributeSpan, FieldSpan, MethodSpan, PropsBlock } from '../models';
import { AttributeSpanRule } from './AttributeSpanRule';
import { MethodSpanRule } from './MethodSpanRule';
import { PropsKeywordRule } from './PropsKeywordRule';

// PropsBlock:
//   PropsKeyword InsignificantWhitespace OpenCurlyBracket ( InsignificantWhitespace ( AttributeSpan | MethodSpan ) )* InsignificantWhitespace CloseCurlyBracket

export const PropsBlockRule: Rule = {
  name: 'PropsBlock',
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
            MethodSpanRule,
            AttributeSpanRule
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

    const fields: FieldSpan[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasModel(ModelType.ATTRIBUTE)) {
        const attribute: AttributeSpan = context.removeModel<AttributeSpan>();

        fields.push(attribute);
      } else if (context.hasModel(ModelType.METHOD)) {
        const method: MethodSpan = context.removeModel<MethodSpan>();

        fields.push(method);
      } else {
        break;
      }
    }

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new PropsBlock(...fields),
      ModelType.PROPS_BLOCK
    );
  }
};
