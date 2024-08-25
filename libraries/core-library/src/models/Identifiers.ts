import { Identifier } from './Identifier';

export class Identifiers extends Array<Identifier> {
  constructor(...identifiers: Identifier[]) {
    super(...identifiers);
  }
}
