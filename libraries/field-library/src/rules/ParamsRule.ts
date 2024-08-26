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
import { Param, Params } from '../models';
import { ParamRule } from './ParamRule';

// Params:
//   Param ( InsignificantWhitespace Comma InsignificantWhitespace Param )*

export const ParamsRule: Rule = {
  name: 'Params',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      ParamRule,
      makeZeroOrMoreRule(
        makeAllRulesRule(
          InsignificantWhitespaceRule,
          CommaRule,
          InsignificantWhitespaceRule,
          ParamRule
        )
      )
    ));
  },
  produce: (context: Context): void => {
    const params: Param[] = [];

    {
      context.assertModel(ModelType.PARAM);

      const param: Param = context.removeModel<Param>();

      params.push(param);
    }

    while (!context.isEmpty) {
      context.skipWhitespace();

      context.assertComma();

      context.removeChar();

      context.skipWhitespace();

      context.assertModel(ModelType.PARAM);

      const param: Param = context.removeModel<Param>();

      params.push(param);
    }

    context.assertEmpty();

    context.addModel(
      new Params(...params),
      ModelType.PARAMS
    );
  }
};
