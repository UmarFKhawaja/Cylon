export abstract class Template {
  protected constructor() {
  }

  abstract render(context: object): string;
}

export class PropsTemplate extends Template {
  constructor() {
    super();
  }

  override render(context: object): string {
    throw new Error('Method not implemented.');
  }
}
