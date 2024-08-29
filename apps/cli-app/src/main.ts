import { applyRule, Input, Output, Result } from '@cylon/common-library';
import { FrontendSpecRule, renderFrontendSpec } from '@cylon/frontend-spec-library';
import { join as joinPath } from 'path';
import yargs from 'yargs';

yargs
  .scriptName('cylon')
  .usage('$0 <cmd> [args]')
  .command('frontend', 'generate a React frontend', () => {
    // TODO : do nothing
  }, async () => {
    const input: Input = await Input.fromStream(process.stdin);

    const result: Result = applyRule(input, FrontendSpecRule);

    const output: Output = renderFrontendSpec(result);

    await output.write(joinPath(process.cwd(), 'examples'));
  })
  .demandCommand()
  .help()
  .parse();
