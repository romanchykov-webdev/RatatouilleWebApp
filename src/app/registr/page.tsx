'use client';

import React, { useEffect, useState } from 'react';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import Header from '@/components/Header/header';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import Link from 'next/link';
import InputLogRes from '@/components/Inputs/InputLogRes';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { signUpUser } from '@/store/thunks/signUpUserThunks';

const signUpSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен быть не короче 6 символов'),
    repPassword: z.string().min(6, 'Повторный пароль должен быть не короче 6 символов'),
  })
  .refine(data => data.password === data.repPassword, {
    message: 'Пароли не совпадают',
    path: ['repPassword'],
  });

const SingUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    repPassword: '',
  });
  const [errorText, setErrorText] = useState<{
    errorEmail: string | null;
    errorPassword: string | null;
    errorRepPassword: string | null;
  }>({
    errorEmail: null,
    errorPassword: null,
    errorRepPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const [allInput, setAllInput] = useState(true);

  useEffect(() => {
    if (
      form.email.trim() === '' ||
      form.password.trim() === '' ||
      form.repPassword.trim() === '' ||
      form.password.trim() !== form.repPassword.trim() ||
      form.password.trim().length < 6 ||
      form.repPassword.trim().length < 6
    ) {
      setAllInput(true);
    } else {
      setAllInput(false);
    }
  }, [form.email, form.password, form.repPassword]);

  const handlerRegister = async (e: React.FormEvent) => {
    console.log('handlerLogIn');
    e.preventDefault();
    setErrorText({ errorEmail: null, errorPassword: null, errorRepPassword: null });
    setLoading(true);

    try {
      signUpSchema.parse(form);
      // Вызов thunk для регистрации
      const result = await dispatch(
        signUpUser({
          email: form.email,
          password: form.password,
        }),
      ).unwrap();

      if (!result.success) {
        const errorMessage = result.error ?? 'Произошла ошибка при регистрации';
        setErrorText({
          errorEmail: errorMessage.includes('User already registered')
            ? 'Этот email уже зарегистрирован'
            : errorMessage,
          errorPassword: errorMessage,
          errorRepPassword: errorMessage,
        });
        setLoading(false);
        return;
      }

      // Успешная регистрация, перенаправление
      router.push('/profileEdit');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.flatten().fieldErrors as {
          email?: string[];
          password?: string[];
          repPassword?: string[];
        };
        setErrorText({
          errorEmail: errors.email?.[0] || null,
          errorPassword: errors.password?.[0] || null,
          errorRepPassword: errors.repPassword?.[0] || null,
        });
      } else {
        setErrorText({
          errorEmail: 'Произошла ошибка при регистрации',
          errorPassword: 'Произошла ошибка при регистрации',
          errorRepPassword: 'Произошла ошибка при регистрации',
        });
      }
      setLoading(false);
    }
  };

  return (
    <WrapperApp>
      <Header />
      <div className="flex items-center justify-center ">
        <Card style={shadowBox()} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
            <CardAction>
              <Link href={'/registr'} className="cursor-pointer hover:underline">
                Log In
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/*form*/}
            <form className="mb-5" id="signup-form" onSubmit={handlerRegister}>
              <div className="flex flex-col gap-6">
                {/*email*/}
                <div className="grid gap-5">
                  <InputLogRes
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    isError={errorText.errorEmail !== null}
                    inputValue={form.email}
                    setValue={value => setForm({ ...form, email: value.toLowerCase() })}
                    errorText={errorText.errorEmail}
                  />

                  {/*password*/}
                  <InputLogRes
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    isError={errorText.errorPassword !== null}
                    isPas={true}
                    inputValue={form.password}
                    setValue={value => setForm({ ...form, password: value })}
                    errorText={errorText.errorPassword}
                  />
                  {/*repeat password*/}
                  <InputLogRes
                    id="password"
                    type="password"
                    placeholder="Repeat password"
                    isError={errorText.errorPassword !== null}
                    isPas={true}
                    inputValue={form.repPassword}
                    setValue={value => setForm({ ...form, repPassword: value })}
                    errorText={errorText.errorPassword}
                  />
                </div>
              </div>
            </form>

            <div className="flex items-center justify-center">
              <Link
                href={'/forgot-password'}
                className="flex justify-center text-xs !text-blue-500 !underline "
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={handlerRegister}
              variant="outline"
              type="submit"
              disabled={loading || allInput}
              className={`w-full bg-black text-white dark:bg-white dark:text-black cursor-pointer transform-hover duration-500
             
              `}
            >
              {loading ? (
                <>
                  Authorization...{' '}
                  <Loader2 className="ml-2 w-5 h-5 text-yellow-400 animate-spin" />
                </>
              ) : (
                'Registration'
              )}
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              <Link href="/404">Login with Google</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </WrapperApp>
  );
};
export default SingUp;
