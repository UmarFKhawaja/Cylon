import { Identifier } from './Identifier';
import { References } from './References';

export class Reference {
  protected readonly _name: Identifier;

  protected readonly _references: References;

  constructor(name: Identifier, references: References) {
    this._name = name;
    this._references = references;
  }

  get name(): Identifier {
    return this._name;
  }

  get references(): References {
    return this._references;
  }
}
