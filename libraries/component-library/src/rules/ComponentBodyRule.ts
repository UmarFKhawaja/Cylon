import {
  applyRule,
  CloseCurlyBracketRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  OpenCurlyBracketRule,
  Output,
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
  produce: (output: Output): void => {
    output.assertOpenCurlyBracket();

    output.removeChar();

    output.skipWhitespace();

    const components: Component[] = [];

    if (output.hasModel(ModelType.COMPONENTS)) {
      components.push(...output.removeModel<Components>());
    }

    output.skipWhitespace();

    const props: Props = output.hasModel(ModelType.PROPS)
      ? output.removeModel<Props>()
      : new Props();

    output.skipWhitespace();

    if (output.hasModel(ModelType.COMPONENTS)) {
      components.push(...output.removeModel<Components>());
    }

    output.skipWhitespace();

    output.assertCloseCurlyBracket();

    output.removeChar();

    output.assertEmpty();

    output.addModel(
      new ComponentBody(props, new Components(...components)),
      ModelType.COMPONENT_BODY
    );
  }
};
