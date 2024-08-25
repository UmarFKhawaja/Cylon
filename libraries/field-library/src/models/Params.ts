import { Param } from './Param';

export class Params extends Array<Param> {
  constructor(...params: Param[]) {
    super(...params);
  }
}
