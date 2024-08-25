import { applyRule, Input, Result, SuccessResult } from '@cylon/common-library';
import { WidgetsRule } from '../rules';

const SNIPPET: string = `
route HomeRoute {
  HeroLayout {
    HomeFeature
  }
}

route SignUpRoute {
  HeroLayout {
    SignUpFeature
  }
}

route SignInRoute {
  HeroLayout {
    SignInFeature
  }
}

route SignOutRoute {
  HeroLayout {
    SignOutFeature
  }
}

route ActivateAccountRoute {
  HeroLayout {
    ActivateAccountFeature
  }
}

route RecoverAccountRoute {
  HeroLayout {
    RecoverAccountFeature
  }
}

route ResetPasswordRoute {
  HeroLayout {
    ResetPasswordFeature
  }
}

route ChangePasswordRoute {
  HeroLayout {
    ChangePasswordFeature
  }
}

route SetPasswordRoute {
  HeroLayout {
    SetPasswordFeature
  }
}

route UnsetPasswordRoute {
  HeroLayout {
    UnsetPasswordFeature
  }
}

layout HeroLayout {
  AxiosClientProvider {
    ApolloClientProvider {
      TokenProvider {
        ProfileProvider {
          ThemeProvider {
            Outlet
          }
        }
      }
    }
  }
}

provider AxiosClientProvider {
  state {
  }

  value {
  }
}

provider ApolloClientProvider {
  state {
  }

  value {
  }
}

provider TokenProvider {
  state {
  }

  value {
  }
}

provider ProfileProvider {
  state {
  }

  value {
  }
}

provider ThemeProvider {
  state {
  }

  value {
  }
}


component HomeFeature {
}

component SignUpFeature {
}

component SignInFeature {
}

component SignOutFeature {
}

component ActivateAccountFeature {
}

component RecoverAccountFeature {
}

component ResetPasswordFeature {
}

component ChangePasswordFeature {
}

component SetPasswordFeature {
}

component UnsetPasswordFeature {
}
`;

describe('WidgetsRule', (): void => {
  it('should match Widgets block', (): void => {
    const input: Input = Input.fromText(SNIPPET);
    const result: Result = applyRule(input, WidgetsRule);

    expect(result).toBeInstanceOf(Result);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.hasSucceeded).toEqual(true);
  });
});
