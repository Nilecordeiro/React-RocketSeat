import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/register-restaurant'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })


  async function handleSignUp(data: SignUpForm) {
    try {

        await registerRestaurantFn({
          restaurantName: data.restaurantName,
          managerName: data.managerName,
          email: data.email,
          phone: data.phone,

        })
    
        toast.success('Restaurante cadastrado com sucesso!', {
          action: {
            label: 'Login',
            onClick: () => navigate(`/sign-in?email=${ data.email }`),
          }
        })
    
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <>
      <Helmet title='Cadastro'/>
      
      <div className='p-8'>
        <Button variant="ghost" asChild className='absolute right-4 top-8'>
          <Link to="/sign-in">
            Fazer Login
          </Link>
        </Button>

        <div className='w-[350px] flex flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Criar Conta Grátis</h1>
            <p className='text-sm text-muted-foreground'>Seja um parceiro e comece suas vendas!</p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
              <Input id="restaurantName" type='text' {...register('restaurantName')}/>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='managerName'>Seu nome</Label>
              <Input id="managerName" type='text' {...register('managerName')}/>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id="email" type='email' {...register('email')}/>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Seu cecular</Label>
              <Input id="phone" type='cel' {...register('phone')}/>
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar Cadastro
            </Button>

            <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
              Ao continuar, você concorda com nossos <a className='underline underline-offset-4' href=''>Termos de serviço </a> e <a className='underline underline-offset-4' href=''>políticas de privacidade</a>.
            </p>
            </form>
        </div>
      </div>
    </>
  )
}