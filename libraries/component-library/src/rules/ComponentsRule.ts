import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
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
  produce: (context: Context): void => {
    const components: Component[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasModel(ModelType.COMPONENT)) {
        const component: Component = context.removeModel<Component>();

        components.push(component);
      } else {
        break;
      }
    }

    context.assertEmpty();

    context.addModel(
      new Components(...components),
      ModelType.COMPONENTS
    );
  }
};
