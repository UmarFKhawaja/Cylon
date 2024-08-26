import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
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
  produce: (context: Context): void => {
    context.assertKeyword('provider');

    context.removeKeyword();

    context.assertWhitespace();

    context.removeWhitespace();

    context.skipWhitespace();

    context.assertModel(ModelType.PROVIDER_NAME);

    const providerName: ProviderName = context.removeModel<ProviderName>();

    context.skipWhitespace();

    const providerBody: ProviderBody = context.hasModel(ModelType.PROVIDER_BODY)
      ? context.removeModel<ProviderBody>()
      : new ProviderBody(
        new Props(),
        new State(),
        new Value()
      );

    context.assertEmpty();

    context.addModel(
      new Provider(providerName, providerBody),
      ModelType.PROVIDER
    );
  }
};
