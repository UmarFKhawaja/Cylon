```plain
Main:
    InsignificantWhitespace Widgets? InsignificantWhitespace App InsignificantWhitespace Widgets? InsignificantWhitespace

Widgets:
    Widget*

Widget:
    InsignificantWhitespace Route
    InsignificantWhitespace Layout
    InsignificantWhitespace Provider
    InsignificantWhitespace Component
```

```plain
app BrowserApp {
    routes {
        HomeRoute
    }
}

route HomeRoute {
    LandingLayout {
        MarketingBlurb
    }
}

provider ProfileProvider {
  props {
  }

  state {
    profile: Profile
  }

  value {
    invalidateProfile(): Void
  }
}

layout LandingLayout {
    AxiosClientProvider {
        ApolloClientProvider {
            ProfileProvider {
                ThemeProvider {
                    Outlet
                }
            }
        }
    }
}

component Menu {
    props {
        id: String
    }

    component Start {
        component Item
    }

    component End {
        component Item
    }
}
```
