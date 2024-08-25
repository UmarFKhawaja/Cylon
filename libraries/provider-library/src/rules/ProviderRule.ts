import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  Output,
  Result,
  Rule,
  SignificantWhitespaceRule
} from '@cylon/common-library';
import { Props, State, Value } from '@cylon/field-library';
import { Provider, ProviderBody, ProviderName } from '../models';
import { ProviderKeywordRule, ProviderNameRule } from '../rules';
import { ProviderBodyRule } from './ProviderBodyRule';

// Provider:
//   ProviderKeyword SignificantWhitespace ProviderName InsignificantWhitespace ProviderBody?

export const ProviderRule: Rule = {
  name: 'Provider',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      ProviderKeywordRule,
      SignificantWhitespaceRule,
      ProviderNameRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ProviderBodyRule)
    ));
  },
  produce: (output: Output): void => {
    output.assertKeyword('provider');

    output.removeKeyword();

    output.assertWhitespace();

    output.removeWhitespace();

    output.skipWhitespace();

    output.assertModel(ModelType.PROVIDER_NAME);

    const providerName: ProviderName = output.removeModel<ProviderName>();

    output.skipWhitespace();

    const providerBody: ProviderBody = output.hasModel(ModelType.PROVIDER_BODY)
      ? output.removeModel<ProviderBody>()
      : new ProviderBody(
        new Props(),
        new State(),
        new Value()
      );

    output.assertEmpty();

    output.addModel(
      new Provider(providerName, providerBody),
      ModelType.PROVIDER
    );
  }
};
