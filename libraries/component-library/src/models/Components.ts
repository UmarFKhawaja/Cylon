import { Component } from './Component';

export class Components extends Array<Component> {
  constructor(...components: Component[]) {
    super(...components);
  }
}
