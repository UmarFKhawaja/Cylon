import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { ComponentName } from '../models';
import { ComponentNameRule } from './ComponentNameRule';

describe('ComponentNameRule', (): void => {
  it('should match a ComponentName span', (): void => {
    const input: Input = Input.fromText('HomeComponent');

    const result: Result = applyRule(input, ComponentNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const componentNameToken: ModelToken = token as ModelToken;

    expect(componentNameToken.model).toBeInstanceOf(ComponentName);
    expect(componentNameToken.modelType).toEqual(ModelType.COMPONENT_NAME);

    const componentName: ComponentName = componentNameToken.model as ComponentName;

    expect(componentName.value).toEqual('HomeComponent');
  });
});
