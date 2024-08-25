import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier } from '../models';
import { IdentifierRule } from './IdentifierRule';

describe('IdentifierRule', (): void => {
  it('should match an identifier', (): void => {
    const input: Input = Input.fromText('BrowserApp');

    const result: Result = applyRule(input, IdentifierRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const identifierToken: ModelToken = token as ModelToken;

    expect(identifierToken.modelType).toEqual('IDENTIFIER');
    expect(identifierToken.model).toBeInstanceOf(Identifier);

    const identifier: Identifier = identifierToken.model as Identifier;

    expect(identifier.value).toEqual('BrowserApp');
  });
});
