import {
  applyRule,
  CloseSquareBracketRule,
  Input,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeStringRule,
  ModelType,
  OpenSquareBracketRule,
  Output,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier, NonVoidTypeName } from '../models';
import { IdentifierRule } from './IdentifierRule';

// NonVoidTypeName
//     OpenSquareBracket NonVoidTypeName CloseSquareBracket
//     'Object'
//     'Date'
//     'String'
//     'Number'
//     'Boolean'
//     Identifier

export const NonVoidTypeNameRule: Rule = {
  name: 'NonVoidTypeName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      makeAllRulesRule(OpenSquareBracketRule, NonVoidTypeNameRule, CloseSquareBracketRule),
      makeStringRule('Object'),
      makeStringRule('Date'),
      makeStringRule('String'),
      makeStringRule('Number'),
      makeStringRule('Boolean'),
      IdentifierRule
    ));
  },
  produce: (output: Output): void => {
    if (output.length === 1) {
      if (output.hasString(['Object', 'Date', 'String', 'Number', 'Boolean'])) {
        produceNonArrayBaseTypeNameToken(output);
      } else if (output.hasModel(ModelType.IDENTIFIER)) {
        produceNonArrayCustomTypeNameToken(output);
      } else {
        output.throwError('Unsupported');
      }
    } else if (output.length === 3) {
      produceArrayTypeNameToken(output);
    } else {
      output.throwError('Unsupported');
    }
  }
};

function produceNonArrayBaseTypeNameToken(output: Output) {
  const dataType: string = output.removeString();

  output.assertEmpty();

  output.addModel(
    new NonVoidTypeName(dataType),
    ModelType.TYPE_NAME
  );
}

function produceNonArrayCustomTypeNameToken(output: Output) {
  const identifier: Identifier = output.removeModel<Identifier>();

  output.assertEmpty();

  output.addModel(
    new NonVoidTypeName(identifier.value),
    ModelType.TYPE_NAME
  );
}

function produceArrayTypeNameToken(output: Output) {
  output.assertOpenSquareBracket();

  output.removeChar();

  output.assertModel(ModelType.TYPE_NAME);

  const typeName: NonVoidTypeName = output.removeModel<NonVoidTypeName>();

  output.assertCloseSquareBracket();

  output.removeChar();

  output.assertEmpty();

  output.addModel(
    new NonVoidTypeName(`[${typeName.dataType}]`),
    ModelType.TYPE_NAME
  );
}
