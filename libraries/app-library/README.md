```plain
App:
    AppKeyword SignificantWhitespace AppName InsignificantWhitespace AppBody?

AppKeyword:
    'app'

AppName:
    Identifier

AppBody:
    OpenCurlyBracket InsignificantWhitespace RoutesList InsignificantWhitespace CloseCurlyBracket
```

```plain
app BrowserApp {
    routes {
        HomeRoute
        SignUpRoute
        SignInRoute
        SignOutRoute
    }
}
```
