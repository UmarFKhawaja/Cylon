import {
  applyRule,
  CloseCurlyBracketRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  OpenCurlyBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { PropsBlock, PropsBlockRule } from '@cylon/field-block-library';
import { ComponentBlock, ComponentBody, ComponentsBlock } from '../models';
import { ComponentsBlockRule } from './ComponentsBlockRule';

// ComponentBody:
//   OpenCurlyBracket InsignificantWhitespace ComponentsBlock? InsignificantWhitespace Props? InsignificantWhitespace ComponentsBlock? InsignificantWhitespace CloseCurlyBracket

export const ComponentBodyRule: Rule = {
  name: 'ComponentBody',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ComponentsBlockRule),
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(PropsBlockRule),
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ComponentsBlockRule),
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    const components: ComponentBlock[] = [];

    if (context.hasModel(ModelType.COMPONENTS_BLOCK)) {
      components.push(...context.removeModel<ComponentsBlock>());
    }

    context.skipWhitespace();

    const props: PropsBlock = context.hasModel(ModelType.PROPS_BLOCK)
      ? context.removeModel<PropsBlock>()
      : new PropsBlock();

    context.skipWhitespace();

    if (context.hasModel(ModelType.COMPONENTS_BLOCK)) {
      components.push(...context.removeModel<ComponentsBlock>());
    }

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new ComponentBody(props, new ComponentsBlock(...components)),
      ModelType.COMPONENT_BODY
    );
  }
};
