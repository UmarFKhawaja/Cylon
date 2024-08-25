import {
  applyRule,
  Input,
  LetterOrDigitRule,
  LetterRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier } from '../models';

// Identifier:
//   Letter LetterOrDigit*

export const IdentifierRule: Rule = {
  name: 'Identifier',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      LetterRule,
      makeZeroOrMoreRule(LetterOrDigitRule)
    ));
  },
  produce: (output: Output): void => {
    let value: string = '';

    while (!output.isEmpty) {
      value += output.removeChar();
    }

    output.addModel(
      new Identifier(value),
      ModelType.IDENTIFIER
    );
  }
};
