import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { 
  HomeContainer, 
  StartCountdownButton, 
  StopCountdownButton, 
} from "./style";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";


//Regras de validação do botão de novo ciclo
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa, seu cretino!'),
  minutesAmount: zod
  .number()
  .min(1, 'O intervalo mínimo é de 5 minutos')
  .max(60, 'o intervalo máximo é de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const {  handleSubmit, watch, reset} = newCycleForm
  const task = watch('task');
  const isSubmitDisabled = !task;

  
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        

          {/* FormProvider: Contexto do hook form, usado para levar as funções específicas da biblioteca */}
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider>

          <CountDown/>
 

      { activeCycle ? (
        <StopCountdownButton onClick={interruptCurrentCycle} type="button">
          <HandPalm size={24}/>
          Interromper
        </StopCountdownButton>
      ) : (
        <StartCountdownButton  disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      )}

      </form>
    </HomeContainer>
  )
}