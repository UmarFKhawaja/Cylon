import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { RouteBody } from '../models';
import { RouteBodyRule } from './RouteBodyRule';

const SNIPPET: string = `{
    LandingLayout {
        MarketingBlurb
    }
}`;

describe('RouteBodyRule', (): void => {
  it('should match a RouteBody block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, RouteBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const bodyToken: ModelToken = token as ModelToken;

    expect(bodyToken.model).toBeInstanceOf(RouteBody);
    expect(bodyToken.modelType).toEqual(ModelType.ROUTE_BODY);

    const body: RouteBody = bodyToken.model as RouteBody;

    expect(body.references.length).toEqual(1);
  });
});
