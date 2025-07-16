

import { useMemo, useState } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";

export interface StepDefinition<T extends FieldValues>{
    id:string;
    title:string;
    description:string;
    fields:Path<T>[];
    instructions:string;
    condition?:(formData:Partial<T>)=>boolean
    validations?:(formData:Partial<T>)=>boolean|string
}


export interface UseMultistepFormOptions<T extends FieldValues>{
    steps:StepDefinition<T>[];
    initialStep?:number;
    onStepChange?:(currentStep:number,direction:'next'|'prev')=>void
}


export interface MultistepFormState{
    currentStep:number;
    totalSteps:number;
    isFirstStep:boolean;
    isLastStep:boolean;
    progress:number;
    currentStepInfo:{
        id:string;
        title:string;
        description?:string
    }
}

export interface MultiStepFormActions{
    nextStep:()=>Promise<boolean>
    prevStep:()=>void;
    goToStep:(stepIndex:number)=>Promise<boolean>
    reset:()=>void;
}

export function useMultiStepForm<T extends FieldValues>({steps,initialStep=0,onStepChange}:UseMultistepFormOptions<T>):[MultistepFormState,MultiStepFormActions]{
    const {watch,trigger}=useFormContext<T>()
    const [currentStepIndex,setCurrentStepIndex]=useState(initialStep)
    const formData=watch();
    const visibleSteps=useMemo(()=>{
        return steps.filter(step=>!step.condition||step.condition(formData))
    },[steps,formData])
    const currentStep = visibleSteps[currentStepIndex];
    const totalSteps = visibleSteps.length;
    const validateCurrentStep=async():Promise<boolean>=>{
        if(!currentStep) return false
         const isValid=await trigger(currentStep.fields, { shouldFocus: false });

        if(currentStep.validations){
            const customValidations=currentStep.validations(formData);
            if(typeof customValidations==='string'){
                console.warn('step validation failed: '+customValidations)
                return false
            }
            return isValid&&customValidations   
        }
        return isValid
    }

    const nextStep=async():Promise<boolean>=>{
        const isValid=await validateCurrentStep()
        if(!isValid) return false

        const newStepIndex=Math.min(currentStepIndex+1,totalSteps-1)
        setCurrentStepIndex(newStepIndex)
        onStepChange?.(newStepIndex,'next')
        return true
    }

    const prevStep=async():Promise<boolean>=>{
        const newStepIndex=Math.max(currentStepIndex-1,0);
        setCurrentStepIndex(newStepIndex);
        onStepChange?.(newStepIndex,'next');
        return true
    }

    const goToStep=async(stepIndex:number):Promise<boolean>=>{
        if(stepIndex<0||stepIndex>=totalSteps) return false

        if(stepIndex>currentStepIndex){
            for(let i =currentStepIndex;i<stepIndex;i++){
                const step=visibleSteps[i];
                const isValid=await trigger(step.fields);
                const customValid=step.validations?step.validations(formData):true

                if(!isValid||!customValid){
                    return false
                }

            }
        }
        setCurrentStepIndex(stepIndex);
        onStepChange?.(stepIndex,stepIndex>currentStepIndex?'next':'prev')
        return true
    }
    const reset=():void=>{
        setCurrentStepIndex(initialStep)
    }

    const state:MultistepFormState={
        currentStep:currentStepIndex,
        totalSteps,
        isFirstStep:currentStepIndex===0,
        isLastStep:currentStepIndex===totalSteps-1,
        progress:totalSteps>0?((currentStepIndex+1)/totalSteps)*100:0,
        currentStepInfo:{
            id:currentStep?.id||'',
            title:currentStep?.title||'',
            description:currentStep?.description
        }

    }
    const actions:MultiStepFormActions={
        nextStep,
        prevStep,
        goToStep,
        reset
    }

    return [state,actions]

}



