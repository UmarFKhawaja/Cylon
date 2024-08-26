import {
  applyRule,
  CloseCurlyBracketRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  OpenCurlyBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { ProviderBody, ProviderFields } from '../models';
import { ProviderFieldsRule } from './ProviderFieldsRule';

// ProviderBody:
//   OpenCurlyBracket InsignificantWhitespace ProviderFields InsignificantWhitespace CloseCurlyBracket

export const ProviderBodyRule: Rule = {
  name: 'ProviderBody',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      ProviderFieldsRule,
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    context.assertModel(ModelType.PROVIDER_FIELDS);

    const fields: ProviderFields = context.removeModel<ProviderFields>();

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new ProviderBody(fields.props, fields.state, fields.value),
      ModelType.PROVIDER_BODY
    );
  }
};
