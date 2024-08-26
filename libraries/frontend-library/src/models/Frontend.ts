import { App } from '@cylon/app-library';
import { File, Folder, Item } from '@cylon/common-library';
import { Components } from '@cylon/component-library';
import { Layouts } from '@cylon/layout-library';
import { Providers } from '@cylon/provider-library';
import { Routes } from '@cylon/route-library';

export class Frontend {
  protected readonly _app: App;
  protected readonly _routes: Routes;
  protected readonly _providers: Providers;
  protected readonly _layouts: Layouts;
  protected readonly _components: Components;

  constructor(
    app: App,
    routes: Routes,
    providers: Providers,
    layouts: Layouts,
    components: Components
  ) {
    this._app = app;
    this._routes = routes;
    this._providers = providers;
    this._layouts = layouts;
    this._components = components;
  }

  get app(): App {
    return this._app;
  }

  get routes(): Routes {
    return this._routes;
  }

  get providers(): Providers {
    return this._providers;
  }

  get layouts(): Layouts {
    return this._layouts;
  }

  get components(): Components {
    return this._components;
  }

  render(): Item {
    const items: Item[] = [];

    items.push(new Folder(null, 'core', [
      new File(null, 'index.ts'),
      this.app.render()
    ]));
    items.push(this.routes.render());
    items.push(this.providers.render());
    items.push(this.layouts.render());
    items.push(this.components.render());

    const frontend: Item = new Folder(null, this.app.name.value, [
      new Folder(null, 'src', items)
    ]);

    return frontend;
  }
}
