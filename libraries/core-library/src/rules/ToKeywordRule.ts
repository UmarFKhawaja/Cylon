import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// ToKeyword:
//   'to'

export const ToKeywordRule: Rule = {
  name: 'ToKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('to'));
  },
  produce: doNothing
};
