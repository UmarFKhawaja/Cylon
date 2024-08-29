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
import { ComponentBlock, ComponentsBlock } from '../models';
import { ComponentBlockRule } from './ComponentBlockRule';

// ComponentsBlock:
//   ( InsignificantWhitespace ComponentBlock )*

export const ComponentsBlockRule: Rule = {
  name: 'ComponentsBlock',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeZeroOrMoreRule(
      makeAllRulesRule(
        InsignificantWhitespaceRule,
        ComponentBlockRule
      )
    ));
  },
  produce: (context: Context): void => {
    const components: ComponentBlock[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasModel(ModelType.COMPONENT_BLOCK)) {
        const component: ComponentBlock = context.removeModel<ComponentBlock>();

        components.push(component);
      } else {
        break;
      }
    }

    context.assertEmpty();

    context.addModel(
      new ComponentsBlock(...components),
      ModelType.COMPONENTS_BLOCK
    );
  }
};
