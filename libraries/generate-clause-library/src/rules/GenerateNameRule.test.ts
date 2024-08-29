import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { GenerateName } from '../models';
import { GenerateNameRule } from './GenerateNameRule';

describe('GenerateNameRule', (): void => {
  it('should match a GenerateName span', (): void => {
    const input: Input = Input.fromText('BrowserApp');

    const result: Result = applyRule(input, GenerateNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const generateNameToken: ModelToken = token as ModelToken;

    expect(generateNameToken.model).toBeInstanceOf(GenerateName);
    expect(generateNameToken.modelType).toEqual(ModelType.GENERATE_NAME);

    const generateName: GenerateName = generateNameToken.model as GenerateName;

    expect(generateName.value).toEqual('BrowserApp');
  });
});
