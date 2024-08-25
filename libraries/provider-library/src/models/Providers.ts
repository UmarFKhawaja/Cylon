import { Provider } from './Provider';

export class Providers extends Array<Provider> {
  constructor(...providers: Provider[]) {
    super(...providers);
  }
}
