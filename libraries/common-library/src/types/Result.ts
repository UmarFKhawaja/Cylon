import { Queue } from './Queue';
import { CharToken, StringToken, Token } from './Token';

export type AggregateResult = [boolean, Queue<Token>];

export abstract class Result {
  abstract get hasSucceeded(): boolean;
}

export class SuccessResult extends Result {
  protected readonly _queue: Queue<Token>;

  constructor(queue: Queue<Token>) {
    super();

    this._queue = queue;
  }

  override get hasSucceeded(): boolean {
    return true;
  }

  get queue(): Queue<Token> {
    return this._queue;
  }

  static fromEmpty(): Result {
    return new SuccessResult(new Queue<Token>());
  }

  static fromQueue(queue: Queue<Token>): Result {
    return new SuccessResult(queue);
  }

  static fromChar(value: string): Result {
    const queue: Queue<Token> = new Queue<Token>();

    queue.add(new CharToken(value));

    const result: Result = new SuccessResult(queue);

    return result;
  }

  static fromString(value: string): Result {
    const queue: Queue<Token> = new Queue<Token>();

    queue.add(new StringToken(value));

    const result: Result = new SuccessResult(queue);

    return result;
  }
}

export class FailureResult extends Result {
  protected readonly _message: string;

  protected constructor(message: string) {
    super();

    this._message = message;
  }

  override get hasSucceeded(): boolean {
    return false;
  }

  get message(): string {
    return this._message;
  }

  static fromMessage(message: string): Result {
    return new FailureResult(message);
  }
}
