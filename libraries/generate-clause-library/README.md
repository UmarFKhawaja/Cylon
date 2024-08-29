```plain
GenerateClause:
    GenerateKeyword InsignificantWhitespace GenerateName InsignificantWhitespace GenerateBody

GenerateKeyword:
    'generate'

GenerateBody:
    OpenCurlyBracket InsignificantWhitespace Widgets? InsignificantWhitespace App InsignificantWhitespace Widgets? InsignificantWhitespace CloseCurlyBracket
```

```plain
generate BrowserApp {
  app MainApp {
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
}
```
