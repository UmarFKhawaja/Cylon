```plain
Layout:
    LayoutKeyword Whitespace+ LayoutName Whitespace* LayoutBody?

LayoutKeyword:
    'layout'

LayoutName:
    Identifier

LayoutBody:
    OpenCurlyBracket Whitespace* References Whitespace* CloseCurlyBracket
```

```plain
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
```
