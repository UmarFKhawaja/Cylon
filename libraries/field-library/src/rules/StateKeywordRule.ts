import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// StateKeyword:
//   'state'

export const StateKeywordRule: Rule = {
  name: 'StateKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('state'));
  },
  produce: doNothing
};
