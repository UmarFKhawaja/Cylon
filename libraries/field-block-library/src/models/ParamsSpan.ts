import { ParamSpan } from './ParamSpan';

export class ParamsSpan extends Array<ParamSpan> {
  constructor(...params: ParamSpan[]) {
    super(...params);
  }
}
