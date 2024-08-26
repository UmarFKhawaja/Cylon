import { isWhitespace } from '../methods';
import { ModelType } from './ModelType';
import { Queue } from './Queue';
import { Rule } from './Rule';
import { CharToken, KeywordToken, ModelToken, StringToken, Token } from './Token';

export class Context {
  protected readonly _rule: Rule;

  protected readonly _queue: Queue<Token>;

  constructor(rule: Rule, queue: Queue<Token>) {
    this._rule = rule;
    this._queue = queue;
  }

  skipWhitespace(): void {
    while (!this._queue.isEmpty) {
      if (this._queue.peek() instanceof CharToken && isWhitespace((this._queue.peek() as CharToken).value)) {
        this._queue.remove();
      } else {
        break;
      }
    }
  }

  hasCharToken(...values: string[]): boolean {
    if (this._queue.isEmpty) {
      return false;
    }

    if (this._queue.peek() instanceof CharToken) {
      const charToken: CharToken = this._queue.peek() as CharToken;

      return values.includes(charToken.value);
    }

    return false;
  }

  hasStringToken(values: string[]): boolean {
    if (this._queue.isEmpty) {
      return false;
    }

    if (this._queue.peek() instanceof StringToken) {
      const stringToken: StringToken = this._queue.peek() as StringToken;

      return values.includes(stringToken.value);
    }

    return false;
  }

  hasKeywordToken(keyword: string): boolean {
    if (this._queue.isEmpty) {
      return false;
    }

    if (this._queue.peek() instanceof KeywordToken) {
      const keywordToken: KeywordToken = this._queue.peek() as KeywordToken;

      return keywordToken.keyword === keyword;
    }

    return false;
  }

  hasModelToken(...modelTypes: ModelType[]): boolean {
    if (this._queue.isEmpty) {
      return false;
    }

    if (this._queue.peek() instanceof ModelToken) {
      const modelToken: ModelToken = this._queue.peek() as ModelToken;

      return modelTypes.includes(modelToken.modelType);
    }

    return false;
  }

  has(test: () => boolean, message: string): boolean {
    const isPassed: boolean = test();

    return isPassed;
  }

  hasWhitespace(): boolean {
    return this.has(() => this.hasCharToken(' ', '\t', '\n', '\r'), `Produce${this._rule.name}WhitespaceNotFoundError`);
  }

  hasColon(): boolean {
    return this.has(() => this.hasCharToken(':'), `Produce${this._rule.name}ColonNotFoundError`);
  }

  hasComma(): boolean {
    return this.has(() => this.hasCharToken(','), `Produce${this._rule.name}CommaNotFoundError`);
  }

  hasOpenCurlyBracket(): boolean {
    return this.has(() => this.hasCharToken('{'), `Produce${this._rule.name}OpenCurlyBracketNotFoundError`);
  }

  hasCloseCurlyBracket(): boolean {
    return this.has(() => this.hasCharToken('}'), `Produce${this._rule.name}CloseCurlyBracketNotFoundError`);
  }

  hasOpenParenthesis(): boolean {
    return this.has(() => this.hasCharToken('('), `Produce${this._rule.name}OpenParenthesisNotFoundError`);
  }

  hasCloseParenthesis(): boolean {
    return this.has(() => this.hasCharToken(')'), `Produce${this._rule.name}CloseParenthesisNotFoundError`);
  }

  hasOpenSquareBracket(): boolean {
    return this.has(() => this.hasCharToken('['), `Produce${this._rule.name}OpenSquareBracketNotFoundError`);
  }

  hasCloseSquareBracket(): boolean {
    return this.has(() => this.hasCharToken(']'), `Produce${this._rule.name}CloseSquareBracketNotFoundError`);
  }

  hasString(values: string[]): boolean {
    return this.has(() => this.hasStringToken(values), `Produce${this._rule.name}StringNotFoundError`);
  }

  hasKeyword(keyword: string): boolean {
    return this.has(() => this.hasKeywordToken(keyword), `Produce${this._rule.name}KeywordNotFoundError`);
  }

  hasModel(...modelTypes: ModelType[]): boolean {
    return this.has(() => this.hasModelToken(...modelTypes), `Produce${this._rule.name}ModelNotFoundError`);
  }

  assert(test: () => boolean, message: string): void {
    const isPassed: boolean = test();

    if (!isPassed) {
      throw new Error(message);
    }
  }

  assertEmpty(): void {
    this.assert(() => this._queue.isEmpty, `Produce${this._rule.name}NotEmptyError`);
  }

  assertWhitespace(): void {
    this.assert(() => this.hasWhitespace(), `Produce${this._rule.name}WhitespaceNotFoundError`);
  }

  assertColon(): void {
    this.assert(() => this.hasColon(), `Produce${this._rule.name}ColonNotFoundError`);
  }

  assertComma(): void {
    this.assert(() => this.hasComma(), `Produce${this._rule.name}CommaNotFoundError`);
  }

  assertOpenCurlyBracket(): void {
    this.assert(() => this.hasOpenCurlyBracket(), `Produce${this._rule.name}OpenCurlyBracketNotFoundError`);
  }

  assertCloseCurlyBracket(): void {
    this.assert(() => this.hasCloseCurlyBracket(), `Produce${this._rule.name}CloseCurlyBracketNotFoundError`);
  }

  assertOpenParenthesis(): void {
    this.assert(() => this.hasOpenParenthesis(), `Produce${this._rule.name}OpenParenthesisNotFoundError`);
  }

  assertCloseParenthesis(): void {
    this.assert(() => this.hasCloseParenthesis(), `Produce${this._rule.name}CloseParenthesisNotFoundError`);
  }

  assertOpenSquareBracket(): void {
    this.assert(() => this.hasOpenSquareBracket(), `Produce${this._rule.name}OpenSquareBracketNotFoundError`);
  }

  assertCloseSquareBracket(): void {
    this.assert(() => this.hasCloseSquareBracket(), `Produce${this._rule.name}CloseSquareBracketNotFoundError`);
  }

  assertString(values: string[]): void {
    this.assert(() => this.hasStringToken(values), `Produce${this._rule.name}StringNotFoundError`);
  }

  assertKeyword(keyword: string): void {
    this.assert(() => this.hasKeywordToken(keyword), `Produce${this._rule.name}KeywordNotFoundError`);
  }

  assertModel(...modelTypes: ModelType[]): void {
    this.assert(() => this.hasModelToken(...modelTypes), `Produce${this._rule.name}ModelNotFoundError`);
  }

  throwError(reason: string): void {
    throw new Error(`Produce${this._rule.name}${reason}Error`);
  }

  get isEmpty(): boolean {
    return this._queue.isEmpty;
  }

  get length(): number {
    return this._queue.length;
  }

  addWhitespace(value: string): void {
    this._queue.add(new CharToken(value));
  }

  addChar(value: string): void {
    this._queue.add(new CharToken(value));
  }

  addString(value: string): void {
    this._queue.add(new StringToken(value));
  }

  addKeyword(keyword: string): void {
    this._queue.add(new KeywordToken(keyword));
  }

  addModel(model: object, modelType: ModelType): void {
    this._queue.add(new ModelToken(model, modelType));
  }

  removeChar(): string {
    const charToken: CharToken = this._queue.remove() as CharToken;

    const value: string = charToken.value;

    return value;
  }

  removeWhitespace(): string {
    const charToken: CharToken = this._queue.remove() as CharToken;

    const value: string = charToken.value;

    return value;
  }

  removeString(): string {
    const stringToken: StringToken = this._queue.remove() as StringToken;

    const value: string = stringToken.value;

    return value;
  }

  removeKeyword(): string {
    const keywordToken: KeywordToken = this._queue.remove() as KeywordToken;

    const keyword: string = keywordToken.keyword;

    return keyword;
  }

  removeModel<TModel extends object>(): TModel {
    const modelToken: ModelToken = this._queue.remove() as ModelToken;

    const model: TModel = modelToken.model as TModel;

    return model;
  }

  // addToken<TToken extends Token>(item: TToken): void {
  //   this._queue.add(item);
  // }
  //
  // removeToken<TToken extends Token>(): TToken {
  //   return this._queue.remove() as TToken;
  // }
  //
  // peekToken<TToken extends Token>(): TToken {
  //   return this._queue.peek() as TToken;
  // }
}
