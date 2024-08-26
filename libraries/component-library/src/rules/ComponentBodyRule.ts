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
import { Props, PropsRule } from '@cylon/field-library';
import { Component, ComponentBody, Components } from '../models';
import { ComponentsRule } from './ComponentsRule';

// ComponentBody:
//   OpenCurlyBracket InsignificantWhitespace Components? InsignificantWhitespace Props? InsignificantWhitespace Components? InsignificantWhitespace CloseCurlyBracket

export const ComponentBodyRule: Rule = {
  name: 'ComponentBody',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ComponentsRule),
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(PropsRule),
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(ComponentsRule),
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    const components: Component[] = [];

    if (context.hasModel(ModelType.COMPONENTS)) {
      components.push(...context.removeModel<Components>());
    }

    context.skipWhitespace();

    const props: Props = context.hasModel(ModelType.PROPS)
      ? context.removeModel<Props>()
      : new Props();

    context.skipWhitespace();

    if (context.hasModel(ModelType.COMPONENTS)) {
      components.push(...context.removeModel<Components>());
    }

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new ComponentBody(props, new Components(...components)),
      ModelType.COMPONENT_BODY
    );
  }
};
