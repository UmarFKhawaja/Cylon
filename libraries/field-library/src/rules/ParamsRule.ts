import {
  applyRule,
  CommaRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  Output,
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
  produce: (output: Output): void => {
    const params: Param[] = [];

    {
      output.assertModel(ModelType.PARAM);

      const param: Param = output.removeModel<Param>();

      params.push(param);
    }

    while (!output.isEmpty) {
      output.skipWhitespace();

      output.assertComma();

      output.removeChar();

      output.skipWhitespace();

      output.assertModel(ModelType.PARAM);

      const param: Param = output.removeModel<Param>();

      params.push(param);
    }

    output.assertEmpty();

    output.addModel(
      new Params(...params),
      ModelType.PARAMS
    );
  }
};
