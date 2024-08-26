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
import { Props } from '@cylon/field-library';
import { Component, ComponentBody, ComponentName, Components } from '../models';
import { ComponentBodyRule } from './ComponentBodyRule';
import { ComponentKeywordRule } from './ComponentKeywordRule';
import { ComponentNameRule } from './ComponentNameRule';

// Component:
//   ComponentKeyword SignificantWhitespace ComponentName InsignificantWhitespace ComponentBody?

export const ComponentRule: Rule = {
  name: 'Component',
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
      : new ComponentBody(new Props(), new Components());

    context.assertEmpty();

    context.addModel(
      new Component(componentName, componentBody),
      ModelType.COMPONENT
    );
  }
};
