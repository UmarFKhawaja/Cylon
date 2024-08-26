```plain
Frontend:
    InsignificantWhitespace FrontendName InsignificantWhitespace FrontendBody InsignificantWhitespace

FrontendName:
    Identifier

FrontendBody:
    Widgets? InsignificantWhitespace App InsignificantWhitespace Widgets?
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
