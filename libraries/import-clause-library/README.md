```plain
ImportClause:
    ImportKeyword InsignificantWhitespace ImportList InsignificantWhitespace FromKeyword InsignificantWhitespace ImportSource

ImportList:
    CombinedImportList
    DestructuredImportList
    NamedImportList

CombinedImportList:
    Identifier Comma OpenCurlyBracket InsignificantWhitespace Identifier InsignificantWhitespace ( Comma InsignificantWhitespace Identifier InsignificantWhitespace )* CloseCurlyBracket

DestructuredImportList:
    OpenCurlyBracket InsignificantWhitespace Identifier InsignificantWhitespace ( Comma InsignificantWhitespace Identifier InsignificantWhitespace )* CloseCurlyBracket

NamedImportList:
    ( Asterisk AsKeyword )? Identifier

ImportSource:
    SingleQuotedImportSource
    DoubleQuotedImportSource

SingleQuotedImportSource:
    SingleQuote ImportPackage SingleQuote

DoubleQuotedImportSource:
    DoubleQuote ImportPackage DoubleQuote

ImportPackage:
    ScopedImportPackage
    UnscopedImportPackage

ScopedImportPackage:
    At Identifier ForwardSlash Identifier

UnscopedImportPackage:
    Identifier

ImportKeyword:
    'import'
```

```plain
import React from 'react'
import { PropWithChildren } from 'react'
import React, { PropWithChildren } from 'react'
import * as React from 'react'
```
