import { applyRule, doNothing, makeAnyRulesRule } from '../methods';
import { Input, Result, Rule } from '../types';
import { LowercaseLetterRule } from './LowercaseLetterRule';
import { UppercaseLetterRule } from './UppercaseLetterRule';

// Letter:
//   LowercaseLetter
//   UppercaseLetter

export const LetterRule: Rule = {
  name: 'Letter',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      LowercaseLetterRule,
      UppercaseLetterRule
    ));
  },
  produce: doNothing
};
