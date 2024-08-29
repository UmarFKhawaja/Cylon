import {
  applyRule,
  CommaRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { ParamSpan, ParamsSpan } from '../models';
import { ParamSpanRule } from './ParamSpanRule';

// ParamsSpan:
//   ParamSpan ( InsignificantWhitespace Comma InsignificantWhitespace ParamSpan )*

export const ParamsSpanRule: Rule = {
  name: 'ParamsSpan',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      ParamSpanRule,
      makeZeroOrMoreRule(
        makeAllRulesRule(
          InsignificantWhitespaceRule,
          CommaRule,
          InsignificantWhitespaceRule,
          ParamSpanRule
        )
      )
    ));
  },
  produce: (context: Context): void => {
    const params: ParamSpan[] = [];

    {
      context.assertModel(ModelType.PARAM);

      const param: ParamSpan = context.removeModel<ParamSpan>();

      params.push(param);
    }

    while (!context.isEmpty) {
      context.skipWhitespace();

      context.assertChar(',');

      context.removeChar();

      context.skipWhitespace();

      context.assertModel(ModelType.PARAM);

      const param: ParamSpan = context.removeModel<ParamSpan>();

      params.push(param);
    }

    context.assertEmpty();

    context.addModel(
      new ParamsSpan(...params),
      ModelType.PARAMS
    );
  }
};
