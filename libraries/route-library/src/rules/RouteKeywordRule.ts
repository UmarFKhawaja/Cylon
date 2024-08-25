import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// RouteKeyword:
//   'route'

export const RouteKeywordRule: Rule = {
  name: 'RouteKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('route'));
  },
  produce: doNothing
};
