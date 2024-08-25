```plain
Provider:
    ProviderKeyword Whitespace+ ProviderName Whitespace* ProviderBody?

ProviderKeyword:
    'provider'

ProviderName:
    Identifier

ProviderBody:
    OpenCurlyBracket Whitespace* ProviderFields Whitespace* CloseCurlyBracket

ProviderFields:
    Props? Whitespace* State? Whitespace* Value?
    Props? Whitespace* Value? Whitespace* State?
    State? Whitespace* Props? Whitespace* Value?
    State? Whitespace* Value? Whitespace* Props?
    Value? Whitespace* Props? Whitespace* State?
    Value? Whitespace* State? Whitespace* Props?
```

```plain
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
```
