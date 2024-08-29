import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// LayoutKeyword:
//   'layout'

export const LayoutKeywordRule: Rule = {
  name: 'LayoutKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('layout'));
  },
  produce: doNothing
};
