import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// ValueKeyword:
//   'value'

export const ValueKeywordRule: Rule = {
  name: 'ValueKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('value'));
  },
  produce: doNothing
};
