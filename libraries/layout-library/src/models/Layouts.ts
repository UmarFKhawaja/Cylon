import { Layout } from './Layout';

export class Layouts extends Array<Layout> {
  constructor(...layouts: Layout[]) {
    super(...layouts);
  }
}
