import { applyRule } from '../methods';
import { CharToken, FailureResult, Input, Queue, Result, SuccessResult, Token } from '../types';
import { DigitRule } from './DigitRule';

describe('DigitRule', (): void => {
  it('should not match an uppercase A character', (): void => {
    const input: Input = Input.fromText('A');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase B character', (): void => {
    const input: Input = Input.fromText('B');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase C character', (): void => {
    const input: Input = Input.fromText('C');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase D character', (): void => {
    const input: Input = Input.fromText('D');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase E character', (): void => {
    const input: Input = Input.fromText('E');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase F character', (): void => {
    const input: Input = Input.fromText('F');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase G character', (): void => {
    const input: Input = Input.fromText('G');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase H character', (): void => {
    const input: Input = Input.fromText('H');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase H character', (): void => {
    const input: Input = Input.fromText('H');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase I character', (): void => {
    const input: Input = Input.fromText('I');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase J character', (): void => {
    const input: Input = Input.fromText('J');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase K character', (): void => {
    const input: Input = Input.fromText('K');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase L character', (): void => {
    const input: Input = Input.fromText('L');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase M character', (): void => {
    const input: Input = Input.fromText('M');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase N character', (): void => {
    const input: Input = Input.fromText('N');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase O character', (): void => {
    const input: Input = Input.fromText('O');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase P character', (): void => {
    const input: Input = Input.fromText('P');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase Q character', (): void => {
    const input: Input = Input.fromText('Q');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase R character', (): void => {
    const input: Input = Input.fromText('R');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase S character', (): void => {
    const input: Input = Input.fromText('S');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase T character', (): void => {
    const input: Input = Input.fromText('T');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase U character', (): void => {
    const input: Input = Input.fromText('U');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase V character', (): void => {
    const input: Input = Input.fromText('V');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase W character', (): void => {
    const input: Input = Input.fromText('W');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase X character', (): void => {
    const input: Input = Input.fromText('X');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase Y character', (): void => {
    const input: Input = Input.fromText('Y');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match an uppercase Z character', (): void => {
    const input: Input = Input.fromText('Z');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase a character', (): void => {
    const input: Input = Input.fromText('a');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase b character', (): void => {
    const input: Input = Input.fromText('b');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase c character', (): void => {
    const input: Input = Input.fromText('c');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase d character', (): void => {
    const input: Input = Input.fromText('d');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase e character', (): void => {
    const input: Input = Input.fromText('e');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase f character', (): void => {
    const input: Input = Input.fromText('f');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase g character', (): void => {
    const input: Input = Input.fromText('g');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase h character', (): void => {
    const input: Input = Input.fromText('h');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase h character', (): void => {
    const input: Input = Input.fromText('h');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase i character', (): void => {
    const input: Input = Input.fromText('i');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase j character', (): void => {
    const input: Input = Input.fromText('j');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase k character', (): void => {
    const input: Input = Input.fromText('k');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase l character', (): void => {
    const input: Input = Input.fromText('l');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase m character', (): void => {
    const input: Input = Input.fromText('m');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase n character', (): void => {
    const input: Input = Input.fromText('n');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase o character', (): void => {
    const input: Input = Input.fromText('o');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase p character', (): void => {
    const input: Input = Input.fromText('p');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase q character', (): void => {
    const input: Input = Input.fromText('q');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase r character', (): void => {
    const input: Input = Input.fromText('r');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase s character', (): void => {
    const input: Input = Input.fromText('s');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase t character', (): void => {
    const input: Input = Input.fromText('t');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase u character', (): void => {
    const input: Input = Input.fromText('u');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase v character', (): void => {
    const input: Input = Input.fromText('v');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase w character', (): void => {
    const input: Input = Input.fromText('w');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase x character', (): void => {
    const input: Input = Input.fromText('x');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase y character', (): void => {
    const input: Input = Input.fromText('y');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should not match a lowercase z character', (): void => {
    const input: Input = Input.fromText('z');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(false);
    expect(result).toBeInstanceOf(FailureResult);
  });

  it('should match a 0 character', (): void => {
    const input: Input = Input.fromText('0');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('0');
  });

  it('should match a 1 character', (): void => {
    const input: Input = Input.fromText('1');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('1');
  });

  it('should match a 2 character', (): void => {
    const input: Input = Input.fromText('2');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('2');
  });

  it('should match a 3 character', (): void => {
    const input: Input = Input.fromText('3');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('3');
  });

  it('should match a 4 character', (): void => {
    const input: Input = Input.fromText('4');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('4');
  });

  it('should match a 5 character', (): void => {
    const input: Input = Input.fromText('5');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('5');
  });

  it('should match a 6 character', (): void => {
    const input: Input = Input.fromText('6');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('6');
  });

  it('should match a 7 character', (): void => {
    const input: Input = Input.fromText('7');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('7');
  });

  it('should match a 8 character', (): void => {
    const input: Input = Input.fromText('8');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('8');
  });

  it('should match a 9 character', (): void => {
    const input: Input = Input.fromText('9');

    const result: Result = applyRule(input, DigitRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('9');
  });
});
