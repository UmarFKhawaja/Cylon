import { applyRule, doNothing, makeZeroOrMoreRule } from '../methods';
import { Input, Result, Rule } from '../types';
import { WhitespaceRule } from './WhitespaceRule';

// InsignificantWhitespace:
//   Whitespace*

export const InsignificantWhitespaceRule: Rule = {
  name: 'InsignificantWhitespace',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeZeroOrMoreRule(
      WhitespaceRule
    ))
  },
  produce: doNothing
};
