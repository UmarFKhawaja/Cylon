import { applyRule, Input, makeZeroOrMoreRule, ModelType, Output, Result, Rule } from '@cylon/common-library';
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
  produce: (output: Output): void => {
    const widgets: Widget[] = [];

    while (!output.isEmpty) {
      output.skipWhitespace();

      output.assertModel(ModelType.WIDGET);

      const widget: Widget = output.removeModel<Widget>();

      widgets.push(widget);
    }

    output.assertEmpty();

    output.addModel(
      new Widgets(...widgets),
      ModelType.WIDGETS
    );
  }
};
