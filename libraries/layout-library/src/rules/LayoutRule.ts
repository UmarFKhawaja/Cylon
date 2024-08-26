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
import { References } from '@cylon/core-library';
import { Layout, LayoutBody, LayoutName } from '../models';
import { LayoutKeywordRule, LayoutNameRule } from '../rules';
import { LayoutBodyRule } from './LayoutBodyRule';

// Layout:
//   LayoutKeyword SignificantWhitespace LayoutName InsignificantWhitespace LayoutBody?

export const LayoutRule: Rule = {
  name: 'Layout',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      LayoutKeywordRule,
      SignificantWhitespaceRule,
      LayoutNameRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(LayoutBodyRule)
    ));
  },
  produce: (context: Context): void => {
    context.assertKeyword('layout');

    context.removeKeyword();

    context.assertWhitespace();

    context.removeWhitespace();

    context.skipWhitespace();

    context.assertModel(ModelType.LAYOUT_NAME);

    const layoutName: LayoutName = context.removeModel<LayoutName>();

    context.skipWhitespace();

    const layoutBody: LayoutBody = context.hasModel(ModelType.LAYOUT_BODY)
      ? context.removeModel<LayoutBody>()
      : new LayoutBody(
        new References()
      );

    context.assertEmpty();

    context.addModel(
      new Layout(layoutName, layoutBody),
      ModelType.LAYOUT
    );
  }
};
