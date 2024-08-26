import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeZeroOrOneRule,
  ModelType,
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
  produce: (context: Context): void => {
    let props: Props = new Props();

    let state: State = new State();

    let value: Value = new Value();

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasModel(ModelType.PROPS)) {
        props = context.removeModel<Props>();
      } else if (context.hasModel(ModelType.STATE)) {
        state = context.removeModel<State>();
      } else if (context.hasModel(ModelType.VALUE)) {
        value = context.removeModel<Value>();
      }
    }

    context.assertEmpty();

    context.addModel(
      new ProviderFields(props, state, value),
      ModelType.PROVIDER_FIELDS
    );
  }
};
