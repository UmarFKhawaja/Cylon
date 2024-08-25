import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { LayoutName } from '../models';
import { LayoutNameRule } from './LayoutNameRule';

describe('LayoutNameRule', (): void => {
  it('should match a LayoutName span', (): void => {
    const input: Input = Input.fromText('HomeLayout');

    const result: Result = applyRule(input, LayoutNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const layoutNameToken: ModelToken = token as ModelToken;

    expect(layoutNameToken.model).toBeInstanceOf(LayoutName);
    expect(layoutNameToken.modelType).toEqual(ModelType.LAYOUT_NAME);

    const layoutName: LayoutName = layoutNameToken.model as LayoutName;

    expect(layoutName.value).toEqual('HomeLayout');
  });
});
