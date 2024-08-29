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
import { PropsBlock } from '@cylon/field-block-library';
import { ComponentBlock, ComponentBody, ComponentName, ComponentsBlock } from '../models';
import { ComponentBodyRule } from './ComponentBodyRule';
import { ComponentKeywordRule } from './ComponentKeywordRule';
import { ComponentNameRule } from './ComponentNameRule';

// ComponentBlock:
//   ComponentKeyword SignificantWhitespace ComponentName InsignificantWhitespace ComponentBody?

export const ComponentBlockRule: Rule = {
  name: 'ComponentBlock',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      ComponentKeywordRule,
      SignificantWhitespaceRule,
      ComponentNameRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ComponentBodyRule)
    ));
  },
  produce: (context: Context): void => {
    context.assertKeyword('component');

    context.removeKeyword();

    context.assertWhitespace();

    context.removeWhitespace();

    context.skipWhitespace();

    context.assertModel(ModelType.COMPONENT_NAME);

    const componentName: ComponentName = context.removeModel<ComponentName>();

    context.skipWhitespace();

    const componentBody: ComponentBody = context.hasModel(ModelType.COMPONENT_BODY)
      ? context.removeModel<ComponentBody>()
      : new ComponentBody(new PropsBlock(), new ComponentsBlock());

    context.assertEmpty();

    context.addModel(
      new ComponentBlock(componentName, componentBody),
      ModelType.COMPONENT_BLOCK
    );
  }
};
