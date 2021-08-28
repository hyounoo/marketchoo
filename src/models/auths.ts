import * as Yup from 'yup'

export interface EmailSignIn {
  email: string
  password: string
}

export const EmailSignInSchema = Yup.object().shape({
  email: Yup.string().required().email('Invalid email'),
  password: Yup.string().required().min(8, 'Password must be at least 8 characters')
  // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, 'must Contain One Uppercase, One Lowercase, One Digit')
})
