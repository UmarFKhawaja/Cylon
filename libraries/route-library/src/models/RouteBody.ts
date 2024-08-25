import { References } from '@cylon/core-library';

export class RouteBody {
  protected readonly _references: References;

  constructor(references: References) {
    this._references = references;
  }

  get references(): References {
    return this._references;
  }
}
