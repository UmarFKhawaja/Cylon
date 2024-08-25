import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeZeroOrOneRule,
  ModelType,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Props, PropsRule, State, StateRule, Value, ValueRule } from '@cylon/field-library';
import { ProviderFields } from '../models';

// ProviderFields:
//   Props? InsignificantWhitespace State? InsignificantWhitespace Value?
//   Props? InsignificantWhitespace Value? InsignificantWhitespace State?
//   State? InsignificantWhitespace Props? InsignificantWhitespace Value?
//   State? InsignificantWhitespace Value? InsignificantWhitespace Props?
//   Value? InsignificantWhitespace Props? InsignificantWhitespace State?
//   Value? InsignificantWhitespace State? InsignificantWhitespace Props?

function makeRule(firstRule: Rule, secondRule: Rule, thirdRule: Rule): Rule {
  return makeAllRulesRule(
    makeZeroOrOneRule(firstRule),
    InsignificantWhitespaceRule,
    makeZeroOrOneRule(secondRule),
    InsignificantWhitespaceRule,
    makeZeroOrOneRule(thirdRule)
  );
}

const PSVSubRule: Rule = makeRule(PropsRule, StateRule, ValueRule);
const PVSSubRule: Rule = makeRule(PropsRule, ValueRule, StateRule);
const SPVSubRule: Rule = makeRule(StateRule, PropsRule, ValueRule);
const SVPSubRule: Rule = makeRule(StateRule, ValueRule, PropsRule);
const VPSSubRule: Rule = makeRule(ValueRule, PropsRule, StateRule);
const VSPSubRule: Rule = makeRule(ValueRule, StateRule, PropsRule);

export const ProviderFieldsRule: Rule = {
  name: 'ProviderFields',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      PSVSubRule,
      PVSSubRule,
      SPVSubRule,
      SVPSubRule,
      VPSSubRule,
      VSPSubRule
    ));
  },
  produce: (output: Output): void => {
    let props: Props = new Props();

    let state: State = new State();

    let value: Value = new Value();

    while (!output.isEmpty) {
      output.skipWhitespace();

      if (output.hasModel(ModelType.PROPS)) {
        props = output.removeModel<Props>();
      } else if (output.hasModel(ModelType.STATE)) {
        state = output.removeModel<State>();
      } else if (output.hasModel(ModelType.VALUE)) {
        value = output.removeModel<Value>();
      }
    }

    output.assertEmpty();

    output.addModel(
      new ProviderFields(props, state, value),
      ModelType.PROVIDER_FIELDS
    );
  }
};
