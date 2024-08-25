```plain
Reference:
    Identifier ( Whitespace* OpenCurlyBracket Whitespace* References? Whitespace* CloseCurlyBracket )?

References:
    ( Whitespace* Reference )+

Identifier:
    Letter LetterOrDigit*

TypeName:
    NonVoidTypeName
    VoidTypeName

NonVoidTypeName
    'Object'
    'Date'
    'String'
    'Number'
    'Boolean'
    Identifier
    OpenSquareBracket NonVoidTypeName CloseSquareBracket

VoidTypeName
    'Void'

LetterOrDigit:
    Letter
    Digit

Letter:
    LowercaseLetter
    UppercaseLetter

LowercaseLetter:
    [a-z]

UppercaseLetter:
    [A-Z]

Digit:
    [0-9]

OpenCurlyBracket:
    '{'

OpenParenthesis:
    '('

OpenSquareBracket:
    '['

CloseCurlyBracket:
    '}'

CloseParenthesis:
    ')'

CloseSquareBracket:
    ']'

Colon:
    ':'

Comma:
    ','

Pipe:
    '|'

Empty:
    ''

Whitespace:
    \s
```
