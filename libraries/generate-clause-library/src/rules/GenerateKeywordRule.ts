import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// GenerateKeyword:
//   'generate'

export const GenerateKeywordRule: Rule = {
  name: 'GenerateKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('generate'));
  },
  produce: doNothing
};
