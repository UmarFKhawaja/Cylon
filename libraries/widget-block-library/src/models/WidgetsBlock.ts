import { WidgetBlock } from './WidgetBlock';

export class WidgetsBlock extends Array<WidgetBlock> {
  constructor(...widgets: WidgetBlock[]) {
    super(...widgets);
  }
}
