import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier } from '@cylon/core-library';
import { Layout } from '../models';
import { LayoutRule } from './LayoutRule';

const SNIPPET: string = `layout HomeLayout {
    ProfileProvider {
        ThemeProvider {
              AppShell {
                  Outlet
              }
        }
    }
}`;

describe('LayoutRule', (): void => {
  it('should match a Layout block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, LayoutRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const layoutToken: ModelToken = token as ModelToken;

    expect(layoutToken.model).toBeInstanceOf(Layout);
    expect(layoutToken.modelType).toEqual(ModelType.LAYOUT);

    const layout: Layout = layoutToken.model as Layout;

    expect(layout.name).toBeInstanceOf(Identifier);
    expect(layout.name.value).toEqual('HomeLayout');

    expect(layout.body.references.length).toEqual(1);
  });
});
