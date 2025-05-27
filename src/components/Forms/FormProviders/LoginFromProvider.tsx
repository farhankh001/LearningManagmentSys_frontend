
import { FormProvider, useForm } from 'react-hook-form'
import { loginDefault, loginSchema, LoginType } from '../../../types/login.types'
import { zodResolver } from '@hookform/resolvers/zod'
import Login from '../../../pages/Login'

function LoginFromProvider() {
    const methods=useForm<LoginType>({
         mode:"all",
         defaultValues:loginDefault,
         resolver:zodResolver(loginSchema)
    })
  return (
    <FormProvider {...methods}>
      <Login/>
    </FormProvider>
  )
}

export default LoginFromProvider
