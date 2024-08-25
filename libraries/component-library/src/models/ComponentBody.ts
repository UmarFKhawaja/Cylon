import { Props } from '@cylon/field-library';
import { Components } from './Components';

export class ComponentBody {
  protected readonly _props: Props;

  protected readonly _components: Components;

  constructor(props: Props, components: Components) {
    this._props = props;
    this._components = components;
  }

  get props(): Props {
    return this._props;
  }

  get components(): Components {
    return this._components;
  }
}
