import { applyRule, Input, Result, SuccessResult } from '@cylon/common-library';
import { ImportListRule } from './ImportListRule';

describe('ImportClauseRule', (): void => {
  it('should match an \'import\' clause with combined list and double-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import React, { PropsWithChildren } from "@meta/react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with destructured list and double-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import { PropsWithChildren } from "@meta/react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list without asterisk and double-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import React from "@meta/react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list with asterisk and double-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import * as React from "@meta/react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with combined list and single-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import React, { PropsWithChildren } from \'@meta/react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with destructured list and single-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import { PropsWithChildren } from \'@meta/react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list without asterisk and single-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import React from \'@meta/react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list with asterisk and single-quoted scoped source', (): void => {
    const input: Input = Input.fromText('import * as React from \'@meta/react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with combined list and double-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import React, { PropsWithChildren } from "react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with destructured list and double-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import { PropsWithChildren } from "react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list without asterisk and double-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import React from "react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list with asterisk and double-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import * as React from "react"');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with combined list and single-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import React, { PropsWithChildren } from \'react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with destructured list and single-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import { PropsWithChildren } from \'react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list without asterisk and single-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import React from \'react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });

  it('should match an \'import\' clause with named list with asterisk and single-quoted unscoped source', (): void => {
    const input: Input = Input.fromText('import * as React from \'react\'');

    const result: Result = applyRule(input, ImportListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);
  });
});
