import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm () {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext() /*<--- só funciona se tiver um provider em volta do componente*/ 
  return (
    <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task" 
          list="task-suggestions" 
          placeholder="Dê um nome para o seu projeto"
          disabled={!!activeCycle}
          {...register('task')}
        />

        <datalist id="task-suggestions">
          <option value="Projeto 1"></option>
          <option value="Projeto 2"></option>
          <option value="Projeto 3"></option>
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput 
          type="number" 
          id="minutesAmount"
          placeholder="00"
          step={1}
          min={1}
          disabled={!!activeCycle}
          // max={60}
          {...register('minutesAmount', {valueAsNumber: true})}
          />

        <span>minutos.</span>
      </FormContainer>
  )
}