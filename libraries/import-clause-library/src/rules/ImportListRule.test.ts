import { applyRule, Input, Result, SuccessResult } from '@cylon/common-library';
import { ImportListRule } from './ImportListRule';

describe('ImportListRule', (): void => {
  it('should match a CombinedImportList span', (): void => {
    const input: Input = Input.fromText('React, { PropsWithChildren }');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match a DestructuredImportList span', (): void => {
    const input: Input = Input.fromText('{ PropsWithChildren }');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match a NamedImportList span without asterisk', (): void => {
    const input: Input = Input.fromText('React');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match a NamedImportList span with asterisk', (): void => {
    const input: Input = Input.fromText('* as React');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });
});
