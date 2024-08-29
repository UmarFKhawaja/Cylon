import { applyRule, Input, Result, SuccessResult } from '@cylon/common-library';
import { ImportSourceRule } from './ImportSourceRule';

describe('ImportSourceRule', (): void => {
  it('should match a double-quoted scoped package name', (): void => {
    const input: Input = Input.fromText('"@foo/bar"');

    const result: Result = applyRule(input, ImportSourceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match a single-quoted scoped package name', (): void => {
    const input: Input = Input.fromText('\'@foo/bar\'');

    const result: Result = applyRule(input, ImportSourceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match a double-quoted unscoped package name', (): void => {
    const input: Input = Input.fromText('"bar"');

    const result: Result = applyRule(input, ImportSourceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match a single-quoted unscoped package name', (): void => {
    const input: Input = Input.fromText('\'bar\'');

    const result: Result = applyRule(input, ImportSourceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });
});
