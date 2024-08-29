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
import { PropsBlock, StateBlock, ValueBlock } from '@cylon/field-block-library';
import { ProviderBlock, ProviderBody, ProviderName } from '../models';
import { ProviderKeywordRule, ProviderNameRule } from '../rules';
import { ProviderBodyRule } from './ProviderBodyRule';

// ProviderBlock:
//   ProviderKeyword SignificantWhitespace ProviderName InsignificantWhitespace ProviderBody?

export const ProviderBlockRule: Rule = {
  name: 'ProviderBlock',
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
        new PropsBlock(),
        new StateBlock(),
        new ValueBlock()
      );

    context.assertEmpty();

    context.addModel(
      new ProviderBlock(providerName, providerBody),
      ModelType.PROVIDER_BLOCK
    );
  }
};
