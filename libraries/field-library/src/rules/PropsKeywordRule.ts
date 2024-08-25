import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// PropsKeyword:
//   'props'

export const PropsKeywordRule: Rule = {
  name: 'PropsKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('props'));
  },
  produce: doNothing
};
