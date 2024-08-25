import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// ComponentKeyword:
//   'component'

export const ComponentKeywordRule: Rule = {
  name: 'ComponentKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('component'));
  },
  produce: doNothing
};
