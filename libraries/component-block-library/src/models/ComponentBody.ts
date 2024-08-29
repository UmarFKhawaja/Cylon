import { PropsBlock } from '@cylon/field-block-library';
import { ComponentsBlock } from './ComponentsBlock';

export class ComponentBody {
  protected readonly _props: PropsBlock;

  protected readonly _components: ComponentsBlock;

  constructor(props: PropsBlock, components: ComponentsBlock) {
    this._props = props;
    this._components = components;
  }

  get props(): PropsBlock {
    return this._props;
  }

  get components(): ComponentsBlock {
    return this._components;
  }
}
