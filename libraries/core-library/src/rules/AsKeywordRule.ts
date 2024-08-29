import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// AsKeyword:
//   'as'

export const AsKeywordRule: Rule = {
  name: 'AsKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('as'));
  },
  produce: doNothing
};
