import { applyRule, Context, Input, makeZeroOrMoreRule, ModelType, Result, Rule } from '@cylon/common-library';
import { Widget, Widgets } from '../models';
import { WidgetRule } from './WidgetRule';

// Widgets:
//   Widget*

export const WidgetsRule: Rule = {
  name: 'Widgets',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeZeroOrMoreRule(WidgetRule));
  },
  produce: (context: Context): void => {
    const widgets: Widget[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      context.assertModel(ModelType.WIDGET);

      const widget: Widget = context.removeModel<Widget>();

      widgets.push(widget);
    }

    context.assertEmpty();

    context.addModel(
      new Widgets(...widgets),
      ModelType.WIDGETS
    );
  }
};
