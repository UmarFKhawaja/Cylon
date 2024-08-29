import { AppBlock, AppBlockRule } from '@cylon/app-block-library';
import {
  applyRule, CloseCurlyBracketRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType, OpenCurlyBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { ComponentBlock, ComponentsBlock } from '@cylon/component-block-library';
import { LayoutBlock, LayoutsBlock } from '@cylon/layout-block-library';
import { ProviderBlock, ProvidersBlock } from '@cylon/provider-block-library';
import { RouteBlock, RoutesBlock } from '@cylon/route-block-library';
import { WidgetBlock, WidgetsBlock, WidgetsBlockRule } from '@cylon/widget-block-library';
import { GenerateBody } from '../models';

// GenerateBody:
//   OpenCurlyBracket InsignificantWhitespace WidgetsBlock? InsignificantWhitespace AppBlock InsignificantWhitespace WidgetsBlock? InsignificantWhitespace CloseCurlyBracket

export const GenerateBodyRule: Rule = {
  name: 'GenerateBody',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(WidgetsBlockRule),
      InsignificantWhitespaceRule,
      AppBlockRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(WidgetsBlockRule),
      InsignificantWhitespaceRule,
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    const widgets: WidgetBlock[] = [];

    if (context.hasModel(ModelType.WIDGETS_BLOCK)) {
      widgets.push(...context.removeModel<WidgetsBlock>());
    }

    context.skipWhitespace();

    context.assertModel(ModelType.APP_BLOCK);

    const app: AppBlock = context.removeModel<AppBlock>();

    context.skipWhitespace();

    if (context.hasModel(ModelType.WIDGETS_BLOCK)) {
      widgets.push(...context.removeModel<WidgetsBlock>());
    }

    context.skipWhitespace();

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    const routes: RouteBlock[] = widgets
      .filter((widget: WidgetBlock): boolean => widget instanceof RouteBlock)
      .map((widget: WidgetBlock): RouteBlock => widget as RouteBlock);

    const providers: ProviderBlock[] = widgets
      .filter((widget: WidgetBlock): boolean => widget instanceof ProviderBlock)
      .map((widget: WidgetBlock): ProviderBlock => widget as ProviderBlock);

    const layouts: LayoutBlock[] = widgets
      .filter((widget: WidgetBlock): boolean => widget instanceof LayoutBlock)
      .map((widget: WidgetBlock): LayoutBlock => widget as LayoutBlock);

    const components: ComponentBlock[] = widgets
      .filter((widget: WidgetBlock): boolean => widget instanceof ComponentBlock)
      .map((widget: WidgetBlock): ComponentBlock => widget as ComponentBlock);

    context.addModel(
      new GenerateBody(
        app,
        new RoutesBlock(...routes),
        new ProvidersBlock(...providers),
        new LayoutsBlock(...layouts),
        new ComponentsBlock(...components)
      ),
      ModelType.GENERATE_BODY
    );
  }
};
