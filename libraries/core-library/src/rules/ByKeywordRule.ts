import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// ByKeyword:
//   'by'

export const ByKeywordRule: Rule = {
  name: 'ByKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('by'));
  },
  produce: doNothing
};
