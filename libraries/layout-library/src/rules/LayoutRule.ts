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
  produce: (output: Output): void => {
    output.assertKeyword('layout');

    output.removeKeyword();

    output.assertWhitespace();

    output.removeWhitespace();

    output.skipWhitespace();

    output.assertModel(ModelType.LAYOUT_NAME);

    const layoutName: LayoutName = output.removeModel<LayoutName>();

    output.skipWhitespace();

    const layoutBody: LayoutBody = output.hasModel(ModelType.LAYOUT_BODY)
      ? output.removeModel<LayoutBody>()
      : new LayoutBody(
        new References()
      );

    output.assertEmpty();

    output.addModel(
      new Layout(layoutName, layoutBody),
      ModelType.LAYOUT
    );
  }
};
