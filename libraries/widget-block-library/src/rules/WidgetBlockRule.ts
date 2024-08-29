import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { ComponentBlockRule } from '@cylon/component-block-library';
import { LayoutBlockRule } from '@cylon/layout-block-library';
import { ProviderBlockRule } from '@cylon/provider-block-library';
import { RouteBlockRule } from '@cylon/route-block-library';
import { WidgetBlock } from '../models';

// WidgetBlock:
//   InsignificantWhitespace RouteBlock
//   InsignificantWhitespace ProviderBlock
//   InsignificantWhitespace LayoutBlock
//   InsignificantWhitespace ComponentBlock

export const WidgetBlockRule: Rule = {
  name: 'WidgetBlock',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      makeAllRulesRule(InsignificantWhitespaceRule, RouteBlockRule),
      makeAllRulesRule(InsignificantWhitespaceRule, ProviderBlockRule),
      makeAllRulesRule(InsignificantWhitespaceRule, LayoutBlockRule),
      makeAllRulesRule(InsignificantWhitespaceRule, ComponentBlockRule)
    ));
  },
  produce: (context: Context): void => {
    context.skipWhitespace();

    context.assertModel(ModelType.ROUTE_BLOCK, ModelType.PROVIDER_BLOCK, ModelType.LAYOUT_BLOCK, ModelType.COMPONENT_BLOCK);

    const widget: WidgetBlock = context.removeModel<WidgetBlock>();

    context.addModel(widget, ModelType.WIDGET_BLOCK);
  }
};
