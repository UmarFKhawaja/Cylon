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
  produce: (output: Output): void => {
    output.assertKeyword('component');

    output.removeKeyword();

    output.assertWhitespace();

    output.removeWhitespace();

    output.skipWhitespace();

    output.assertModel(ModelType.COMPONENT_NAME);

    const componentName: ComponentName = output.removeModel<ComponentName>();

    output.skipWhitespace();

    const componentBody: ComponentBody = output.hasModel(ModelType.COMPONENT_BODY)
      ? output.removeModel<ComponentBody>()
      : new ComponentBody(new Props(), new Components());

    output.assertEmpty();

    output.addModel(
      new Component(componentName, componentBody),
      ModelType.COMPONENT
    );
  }
};
