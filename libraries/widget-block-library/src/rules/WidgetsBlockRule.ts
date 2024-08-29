import { applyRule, Context, Input, makeZeroOrMoreRule, ModelType, Result, Rule } from '@cylon/common-library';
import { WidgetBlock, WidgetsBlock } from '../models';
import { WidgetBlockRule } from './WidgetBlockRule';

// WidgetsBlock:
//   WidgetBlock*

export const WidgetsBlockRule: Rule = {
  name: 'WidgetsBlock',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeZeroOrMoreRule(WidgetBlockRule));
  },
  produce: (context: Context): void => {
    const widgets: WidgetBlock[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      context.assertModel(ModelType.WIDGET_BLOCK);

      const widget: WidgetBlock = context.removeModel<WidgetBlock>();

      widgets.push(widget);
    }

    context.assertEmpty();

    context.addModel(
      new WidgetsBlock(...widgets),
      ModelType.WIDGETS_BLOCK
    );
  }
};
