import { PropsBlock, StateBlock, ValueBlock } from '@cylon/field-block-library';

export class ProviderBody {
  protected readonly _props: PropsBlock;

  protected readonly _state: StateBlock;

  protected readonly _value: ValueBlock;

  constructor(props: PropsBlock, state: StateBlock, value: ValueBlock) {
    this._props = props;
    this._state = state;
    this._value = value;
  }

  get props(): PropsBlock {
    return this._props;
  }

  get state(): StateBlock {
    return this._state;
  }

  get value(): ValueBlock {
    return this._value;
  }
}
