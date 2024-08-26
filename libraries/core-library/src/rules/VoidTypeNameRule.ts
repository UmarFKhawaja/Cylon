import { applyRule, Context, Input, makeStringRule, ModelType, Result, Rule } from '@cylon/common-library';
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
  produce: (context: Context): void => {
    context.assertString(['Void']);

    context.removeString();

    context.assertEmpty();

    context.addModel(
      new VoidTypeName(),
      ModelType.TYPE_NAME
    );
  }
};
