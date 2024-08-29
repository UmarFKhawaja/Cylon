import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// FromKeyword:
//   'from'

export const FromKeywordRule: Rule = {
  name: 'FromKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('from'));
  },
  produce: doNothing
};
