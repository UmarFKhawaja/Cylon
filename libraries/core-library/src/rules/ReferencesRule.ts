import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeOneOrMoreRule,
  ModelType,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Reference, References } from '../models';
import { ReferenceRule } from './ReferenceRule';

// References:
//   ( InsignificantWhitespace Reference )+
//
//   Start {
//       Item
//       Item
//   }
//   End {
//       Item
//       Item
//   }

export const ReferencesRule: Rule = {
  name: 'References',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeOneOrMoreRule(
      makeAllRulesRule(
        InsignificantWhitespaceRule,
        ReferenceRule
      ))
    );
  },
  produce: (output: Output): void => {
    const references: Reference[] = [];

    while (!output.isEmpty) {
      output.skipWhitespace();

      if (output.hasCloseCurlyBracket()) {
        break;
      }

      output.assertModel(ModelType.REFERENCE);

      const reference: Reference = output.removeModel<Reference>();

      references.push(reference);
    }

    output.assertEmpty();

    output.addModel(
      new References(...references),
      ModelType.REFERENCES
    );
  }
};
