import { Widget } from './Widget';

export class Widgets extends Array<Widget> {
  constructor(...widgets: Widget[]) {
    super(...widgets);
  }
}
