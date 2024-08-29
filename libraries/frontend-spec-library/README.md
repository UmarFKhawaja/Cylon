```plain
FrontendSpec:
    ( InsignificantWhitespace ImportClause )* InsignificantWhitespace GenerateClause InsignificantWhitespace
```

```plain
import React from 'react'
import { PropWithChildren } from 'react'
import React, { PropWithChildren } from 'react'
import * as React from 'react'

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
