import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { ComponentBody } from '../models';
import { ComponentBodyRule } from './ComponentBodyRule';

const SNIPPET: string = `{
    props {
        id: String
    }

    component Start {
        component Item
    }

    component End {
        component Item
    }
}`;

describe('ComponentBodyRule', (): void => {
  it('should match a ComponentBody block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, ComponentBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(ComponentBody);
  });
});
