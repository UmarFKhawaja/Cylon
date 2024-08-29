import { ComponentBlock } from '@cylon/component-block-library';
import { LayoutBlock } from '@cylon/layout-block-library';
import { ProviderBlock } from '@cylon/provider-block-library';
import { RouteBlock } from '@cylon/route-block-library';

export type WidgetBlock =
  | RouteBlock
  | ProviderBlock
  | LayoutBlock
  | ComponentBlock;
