import {
  applyRule,
  CloseCurlyBracketRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  OpenCurlyBracketRule,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier, Reference, References } from '../models';
import { IdentifierRule } from './IdentifierRule';
import { ReferencesRule } from './ReferencesRule';

// Reference:
//   Identifier ( InsignificantWhitespace OpenCurlyBracket InsignificantWhitespace References? InsignificantWhitespace CloseCurlyBracket )?
//
//     NavBar {
//         Menu {
//             Start {
//             }
//     }

export const ReferenceRule: Rule = {
  name: 'Reference',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      IdentifierRule,
      makeZeroOrOneRule(
        makeAllRulesRule(
          InsignificantWhitespaceRule,
          OpenCurlyBracketRule,
          InsignificantWhitespaceRule,
          makeZeroOrOneRule(ReferencesRule),
          InsignificantWhitespaceRule,
          CloseCurlyBracketRule
        )
      )
    ));
  },
  produce: (output: Output): void => {
    output.assertModel(ModelType.IDENTIFIER);

    const name: Identifier = output.removeModel<Identifier>();

    let references: References;

    if (!output.isEmpty) {
      output.skipWhitespace();

      output.assertOpenCurlyBracket();

      output.removeChar();

      output.skipWhitespace();

      references = output.hasModel(ModelType.REFERENCES)
        ? output.removeModel<References>()
        : new References();

      output.skipWhitespace();

      output.assertCloseCurlyBracket();

      output.removeChar();
    } else {
      references = new References();
    }

    output.assertEmpty();

    output.addModel(
      new Reference(name, references),
      ModelType.REFERENCE
    );
  }
};
