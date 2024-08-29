import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// RoutesKeyword:
//   'routes'

export const RoutesKeywordRule: Rule = {
  name: 'RoutesKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('routes'));
  },
  produce: doNothing
};
