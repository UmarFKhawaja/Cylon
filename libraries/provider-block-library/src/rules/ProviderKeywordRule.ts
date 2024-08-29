import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// ProviderKeyword:
//   'provider'

export const ProviderKeywordRule: Rule = {
  name: 'ProviderKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('provider'));
  },
  produce: doNothing
};
