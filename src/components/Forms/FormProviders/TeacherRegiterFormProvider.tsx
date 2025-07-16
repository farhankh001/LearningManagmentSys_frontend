  import { FormProvider, useForm } from 'react-hook-form'
  import { createTeacherSchema,registerTeacherDefaultValues, TeacherRegisterType } from '../../../types/register.types';
  import { zodResolver } from '@hookform/resolvers/zod';
  
  import { useSelector } from 'react-redux';
  import { RootState } from '../../../app/store';
import TeacherRegister from '../../../pages/TeacherRegister';


  function TeacherRegisterFormProvider() {
      const categories=useSelector((state:RootState)=>state.categories.categories)
      
      const methods=useForm<TeacherRegisterType>({
          mode:"all",
          defaultValues:registerTeacherDefaultValues,
          resolver:zodResolver(createTeacherSchema(categories))
      })

    return (
      <FormProvider {...methods}>
        <TeacherRegister/>
      </FormProvider>
    )
  }

  export default TeacherRegisterFormProvider
