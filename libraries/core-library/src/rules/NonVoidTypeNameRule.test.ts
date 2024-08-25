import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { NonVoidTypeName } from '../models';
import { NonVoidTypeNameRule } from './NonVoidTypeNameRule';

describe('NonVoidTypeNameRule', (): void => {
  it('should match the \'Object\' string', (): void => {
    const input: Input = Input.fromText('Object');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('Object');
  });

  it('should match the \'Date\' string', (): void => {
    const input: Input = Input.fromText('Date');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('Date');
  });

  it('should match the \'String\' string', (): void => {
    const input: Input = Input.fromText('String');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('String');
  });

  it('should match the \'Number\' string', (): void => {
    const input: Input = Input.fromText('Number');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('Number');
  });

  it('should match the \'Boolean\' string', (): void => {
    const input: Input = Input.fromText('Boolean');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('Boolean');
  });

  it('should match the \'User\' identifier', (): void => {
    const input: Input = Input.fromText('User');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('User');
  });

  it('should match the \'[Object]\' string', (): void => {
    const input: Input = Input.fromText('[Object]');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('[Object]');
  });

  it('should match the \'[Date]\' string', (): void => {
    const input: Input = Input.fromText('[Date]');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('[Date]');
  });

  it('should match the \'[String]\' string', (): void => {
    const input: Input = Input.fromText('[String]');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('[String]');
  });

  it('should match the \'[Number]\' string', (): void => {
    const input: Input = Input.fromText('[Number]');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('[Number]');
  });

  it('should match the \'[Boolean]\' string', (): void => {
    const input: Input = Input.fromText('[Boolean]');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('[Boolean]');
  });

  it('should match the \'[User]\' identifier', (): void => {
    const input: Input = Input.fromText('[User]');

    const result: Result = applyRule(input, NonVoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = modelToken.model as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('[User]');
  });
});
