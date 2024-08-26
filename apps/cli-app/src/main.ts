import { applyRule, Input, Output, Result } from '@cylon/common-library';
import { FrontendRule, renderFrontend } from '@cylon/frontend-library';
import { join as joinPath } from 'path';
import yargs from 'yargs';

yargs
  .scriptName('cylon')
  .usage('$0 <cmd> [args]')
  .command('frontend', 'generate a React frontend', () => {
    // TODO : do nothing
  }, async () => {
    const input: Input = await Input.fromStream(process.stdin);

    const result: Result = applyRule(input, FrontendRule);

    const output: Output = renderFrontend(result);

    await output.write(joinPath(process.cwd(), 'examples'));
  })
  .demandCommand()
  .help()
  .parse();
