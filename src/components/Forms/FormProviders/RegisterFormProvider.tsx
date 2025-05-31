  import { FormProvider, useForm } from 'react-hook-form'
  import { createStudentSchema, registerDefaultValues,RegisterType } from '../../../types/register.types';
  import { zodResolver } from '@hookform/resolvers/zod';
  import Register from '../../../pages/Register';
  import { useSelector } from 'react-redux';
  import { RootState } from '../../../app/store';


  function RegisterFormProvider() {
      const categories=useSelector((state:RootState)=>state.categories.categories)
      
      const methods=useForm<RegisterType>({
          mode:"all",
          defaultValues:registerDefaultValues,
          resolver:zodResolver(createStudentSchema(categories))
      })

    return (
      <FormProvider {...methods}>
        <Register/>
      </FormProvider>
    )
  }

  export default RegisterFormProvider
