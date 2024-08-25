import { Component } from '@cylon/component-library';
import { Layout } from '@cylon/layout-library';
import { Provider } from '@cylon/provider-library';
import { Route } from '@cylon/route-library';

export type Widget =
  | Route
  | Provider
  | Layout
  | Component;
