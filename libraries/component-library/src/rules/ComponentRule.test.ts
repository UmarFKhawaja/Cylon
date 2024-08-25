import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Component } from '../models';
import { ComponentRule } from './ComponentRule';

const SNIPPET: string = `component Menu {
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

describe('ComponentRule', (): void => {
  it('should match a Component block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, ComponentRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(Component);
  });
});
