import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { RouteEntry } from '../models';
import { RouteEntryRule } from './RouteEntryRule';

const SNIPPET: string = `
    HomeRoute
`;

describe('RouteEntryRule', (): void => {
  it('produces a model token containing a RouteEntry instance', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, RouteEntryRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(RouteEntry);

    const routeEntry: RouteEntry = modelToken.model as RouteEntry;

    expect(routeEntry.name.value).toEqual('HomeRoute');
  });
});
