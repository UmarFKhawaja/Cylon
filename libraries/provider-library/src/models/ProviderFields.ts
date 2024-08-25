import { Props, State, Value } from '@cylon/field-library';

export class ProviderFields {
  protected readonly _props: Props;

  protected readonly _state: State;

  protected readonly _value: Value;

  constructor(props: Props, state: State, value: Value) {
    this._props = props;
    this._state = state;
    this._value = value;
  }

  get props(): Props {
    return this._props;
  }

  get state(): State {
    return this._state;
  }

  get value(): Value {
    return this._value;
  }
}
