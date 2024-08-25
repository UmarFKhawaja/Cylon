import { applyRule, Input, makeStringRule, ModelType, Output, Result, Rule } from '@cylon/common-library';
import { VoidTypeName } from '../models';

// VoidTypeName:
//   'Void'

export const VoidTypeNameRule: Rule = {
  name: 'VoidTypeName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeStringRule('Void'));
  },
  produce: (output: Output): void => {
    output.assertString(['Void']);

    output.removeString();

    output.assertEmpty();

    output.addModel(
      new VoidTypeName(),
      ModelType.TYPE_NAME
    );
  }
};
