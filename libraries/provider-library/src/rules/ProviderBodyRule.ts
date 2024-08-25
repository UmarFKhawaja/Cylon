import {
  applyRule,
  CloseCurlyBracketRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  ModelType,
  OpenCurlyBracketRule,
  Output,
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
  produce: (output: Output): void => {
    output.assertOpenCurlyBracket();

    output.removeChar();

    output.skipWhitespace();

    output.assertModel(ModelType.PROVIDER_FIELDS);

    const fields: ProviderFields = output.removeModel<ProviderFields>();

    output.skipWhitespace();

    output.assertCloseCurlyBracket();

    output.removeChar();

    output.assertEmpty();

    output.addModel(
      new ProviderBody(fields.props, fields.state, fields.value),
      ModelType.PROVIDER_BODY
    );
  }
};
