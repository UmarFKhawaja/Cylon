import { applyRule, doNothing, makeAnyRulesRule } from '../methods';
import { Input, Result, Rule } from '../types';
import { DigitRule } from './DigitRule';
import { LetterRule } from './LetterRule';

// LetterOrDigit:
//   Letter
//   Digit

export const LetterOrDigitRule: Rule = {
  name: 'LetterOrDigit',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      LetterRule,
      DigitRule
    ));
  },
  produce: doNothing
};
