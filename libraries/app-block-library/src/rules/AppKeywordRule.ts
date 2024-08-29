import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// AppKeyword:
//   'app'

export const AppKeywordRule: Rule = {
  name: 'AppKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('app'));
  },
  produce: doNothing
};
