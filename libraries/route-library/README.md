```plain
Route:
    RouteKeyword Whitespace+ RouteName Whitespace* RouteBody?

RouteKeyword:
    'route'

RouteBody:
    OpenCurlyBracket Whitespace* References Whitespace* CloseCurlyBracket

RoutesList:
    RoutesKeyword Whitespace* OpenCurlyBracket Whitespace* RouteEntries Whitespace* CloseCurlyBracket

RoutesKeyword:
    'routes'

RouteEntries:
    RouteEntry+

RouteEntry:
    Whitespace* RouteName

RouteName:
    Identifier
```

```plain
route HomeRoute {
    LandingLayout {
        MarketingBlurb
    }
}
```
