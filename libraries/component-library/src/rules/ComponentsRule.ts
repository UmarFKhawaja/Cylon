import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Component, Components } from '../models';
import { ComponentRule } from './ComponentRule';

// Components:
//   ( InsignificantWhitespace Component )*

export const ComponentsRule: Rule = {
  name: 'Components',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeZeroOrMoreRule(
      makeAllRulesRule(
        InsignificantWhitespaceRule,
        ComponentRule
      )
    ));
  },
  produce: (output: Output): void => {
    const components: Component[] = [];

    while (!output.isEmpty) {
      output.skipWhitespace();

      if (output.hasModel(ModelType.COMPONENT)) {
        const component: Component = output.removeModel<Component>();

        components.push(component);
      } else {
        break;
      }
    }

    output.assertEmpty();

    output.addModel(
      new Components(...components),
      ModelType.COMPONENTS
    );
  }
};
