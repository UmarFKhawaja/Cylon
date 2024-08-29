import { AppBlock } from '@cylon/app-block-library';
import { ComponentsBlock } from '@cylon/component-block-library';
import { LayoutsBlock } from '@cylon/layout-block-library';
import { ProvidersBlock } from '@cylon/provider-block-library';
import { RoutesBlock } from '@cylon/route-block-library';

export class GenerateBody {
  protected readonly _app: AppBlock;
  protected readonly _routes: RoutesBlock;
  protected readonly _providers: ProvidersBlock;
  protected readonly _layouts: LayoutsBlock;
  protected readonly _components: ComponentsBlock;

  constructor(
    app: AppBlock,
    routes: RoutesBlock,
    providers: ProvidersBlock,
    layouts: LayoutsBlock,
    components: ComponentsBlock
  ) {
    this._app = app;
    this._routes = routes;
    this._providers = providers;
    this._layouts = layouts;
    this._components = components;
  }

  get app(): AppBlock {
    return this._app;
  }

  get routes(): RoutesBlock {
    return this._routes;
  }

  get providers(): ProvidersBlock {
    return this._providers;
  }

  get layouts(): LayoutsBlock {
    return this._layouts;
  }

  get components(): ComponentsBlock {
    return this._components;
  }
}
