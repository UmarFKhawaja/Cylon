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
import { PropsBlock, PropsBlockRule, StateBlock, StateBlockRule, ValueBlock, ValueBlockRule } from '@cylon/field-block-library';
import { ProviderFields } from '../models';

// ProviderFields:
//   PropsBlock? InsignificantWhitespace StateBlock? InsignificantWhitespace ValueBlock?
//   PropsBlock? InsignificantWhitespace ValueBlock? InsignificantWhitespace StateBlock?
//   StateBlock? InsignificantWhitespace PropsBlock? InsignificantWhitespace ValueBlock?
//   StateBlock? InsignificantWhitespace ValueBlock? InsignificantWhitespace PropsBlock?
//   ValueBlock? InsignificantWhitespace PropsBlock? InsignificantWhitespace StateBlock?
//   ValueBlock? InsignificantWhitespace StateBlock? InsignificantWhitespace PropsBlock?

function makeRule(firstRule: Rule, secondRule: Rule, thirdRule: Rule): Rule {
  return makeAllRulesRule(
    makeZeroOrOneRule(firstRule),
    InsignificantWhitespaceRule,
    makeZeroOrOneRule(secondRule),
    InsignificantWhitespaceRule,
    makeZeroOrOneRule(thirdRule)
  );
}

const PSVSubRule: Rule = makeRule(PropsBlockRule, StateBlockRule, ValueBlockRule);
const PVSSubRule: Rule = makeRule(PropsBlockRule, ValueBlockRule, StateBlockRule);
const SPVSubRule: Rule = makeRule(StateBlockRule, PropsBlockRule, ValueBlockRule);
const SVPSubRule: Rule = makeRule(StateBlockRule, ValueBlockRule, PropsBlockRule);
const VPSSubRule: Rule = makeRule(ValueBlockRule, PropsBlockRule, StateBlockRule);
const VSPSubRule: Rule = makeRule(ValueBlockRule, StateBlockRule, PropsBlockRule);

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
    let props: PropsBlock = new PropsBlock();

    let state: StateBlock = new StateBlock();

    let value: ValueBlock = new ValueBlock();

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasModel(ModelType.PROPS_BLOCK)) {
        props = context.removeModel<PropsBlock>();
      } else if (context.hasModel(ModelType.STATE_BLOCK)) {
        state = context.removeModel<StateBlock>();
      } else if (context.hasModel(ModelType.VALUE_BLOCK)) {
        value = context.removeModel<ValueBlock>();
      }
    }

    context.assertEmpty();

    context.addModel(
      new ProviderFields(props, state, value),
      ModelType.PROVIDER_FIELDS
    );
  }
};
