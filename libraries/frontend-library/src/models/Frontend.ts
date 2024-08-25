import { App } from '@cylon/app-library';
import { Components } from '@cylon/component-library';
import { Layouts } from '@cylon/layout-library';
import { Providers } from '@cylon/provider-library';
import { Routes } from '@cylon/route-library';

export class Frontend {
  constructor(
    public app: App,
    public routes: Routes,
    public providers: Providers,
    public layouts: Layouts,
    public components: Components
  ) {
  }
}
