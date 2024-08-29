import { applyRule, doNothing, Input, makeKeywordRule, Result, Rule } from '@cylon/common-library';

// ImportKeyword:
//   'import'

export const ImportKeywordRule: Rule = {
  name: 'ImportKeyword',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeKeywordRule('import'));
  },
  produce: doNothing
};
