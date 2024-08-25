import { applyRule, doNothing, Input, makeAnyRulesRule, Result, Rule } from '@cylon/common-library';
import { NonVoidTypeNameRule } from './NonVoidTypeNameRule';
import { VoidTypeNameRule } from './VoidTypeNameRule';

// TypeName
//     VoidTypeName
//     TypeName

export const TypeNameRule: Rule = {
  name: 'TypeName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      VoidTypeNameRule,
      NonVoidTypeNameRule
    ));
  },
  produce: doNothing
};
