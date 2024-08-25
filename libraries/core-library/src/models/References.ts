import { Reference } from './Reference';

export class References extends Array<Reference> {
  constructor(...references: Reference[]) {
    super(...references);
  }
}
