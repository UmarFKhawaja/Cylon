import { applyRule, doNothing, makeOneOrMoreRule } from '../methods';
import { Input, Result, Rule } from '../types';
import { WhitespaceRule } from './WhitespaceRule';

// SignificantWhitespace:
//   Whitespace+

export const SignificantWhitespaceRule: Rule = {
  name: 'SignificantWhitespace',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeOneOrMoreRule(
      WhitespaceRule
    ))
  },
  produce: doNothing
};
