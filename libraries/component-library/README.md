```plain
Components:
    ( InsignificantWhitespace Component )*

Component:
    ComponentKeyword Whitespace+ ComponentName InsignificantWhitespace ComponentBody?

ComponentKeyword:
    'component'

ComponentName:
    Identifier

ComponentBody:
    OpenCurlyBracket Components? InsignificantWhitespace Props? Components? InsignificantWhitespace CloseCurlyBracket
```

```plain
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
