import ForgotPasswordScreen, {
  ScreenOptions as ForgotPasswordOptions,
} from '../../../screens/Auth/ForgotPassword'
import LoginScreen from '../../../screens/Auth/Login'
import SignUpScreen, {
  ScreenOptions as SignUpOptions,
} from '../../../screens/Auth/SignUp'
import WelcomeScreen, {
  ScreenOptions as WelcomeOptions,
} from '../../../screens/Auth/Welcome'
export default [
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    options: ForgotPasswordOptions,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: SignUpOptions,
  },
  {
    name: 'Welcome',
    component: WelcomeScreen,
    options: WelcomeOptions,
  },
]
