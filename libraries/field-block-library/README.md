```plain
Props:
    PropsKeyword Whitespace* OpenCurlyBracket ( Whitespace* ( Attribute | Method ) )* Whitespace* CloseCurlyBracket 

State:
    StateKeyword Whitespace* OpenCurlyBracket ( Whitespace* ( Attribute | Method ) )* Whitespace* CloseCurlyBracket

Value:
    ValueKeyword Whitespace* OpenCurlyBracket ( Whitespace* ( Attribute | Method ) )* Whitespace* CloseCurlyBracket

PropsKeyword:
    'props'

StateKeyword:
    'state'

ValueKeyword:
    'value'

Method:
    Identifier Whitespace* OpenParenthesis Whitespace* Params? Whitespace* CloseParenthesis Whitespace* Colon Whitespace* TypeName

Params:
    Param ( Whitespace* Comma Whitespace* Param )*

Param:
    Identifier Whitespace* Colon Whitespace* TypeName

Attribute:
    Identifier Whitespace* Colon Whitespace* TypeName
```

```plain
props {
  foo: Foo
  onClick(): Void
}

state {
}

value {
}
```
