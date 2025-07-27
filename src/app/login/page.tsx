'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import WrapperApp from '@/components/Wrappers/wrapperApp';
import Header from '@/components/Header/header';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import InputLogRes from '@/components/Inputs/InputLogRes';
import { Loader2 } from 'lucide-react';
import { logInUser } from '@/store/thunks/logInUserThunks';
import { z } from 'zod';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не короче 6 символов'),
});
export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errorText, setErrorText] = useState<{
    errorEmail: string | null;
    errorPassword: string | null;
  }>({
    errorEmail: null,
    errorPassword: null,
  });
  const [loading, setLoading] = useState(false);

  const handlerLogIn = async (e: React.FormEvent) => {
    console.log('handlerLogIn');
    e.preventDefault();
    setErrorText({ errorEmail: null, errorPassword: null });
    setLoading(true);

    try {
      loginSchema.parse(form);
      // Вызов thunk для логина
      const result = await dispatch(
        logInUser({ email: form.email, password: form.password }),
      ).unwrap();

      if (!result.success) {
        const errorMessage = result.error ?? 'Произошла ошибка при входе';
        setErrorText({
          errorEmail: errorMessage.includes('Invalid login')
            ? 'Неверный email или пароль'
            : errorMessage,
          errorPassword: errorMessage.includes('Invalid login')
            ? 'Неверный email или пароль'
            : errorMessage,
        });
        setLoading(false);
        return;
      }

      // Успешный вход, перенаправление
      router.push('/profile');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.flatten().fieldErrors as {
          email?: string[];
          password?: string[];
        };
        setErrorText({
          errorEmail: errors.email?.[0] || null,
          errorPassword: errors.password?.[0] || null,
        });
      } else {
        setErrorText({
          errorEmail: 'Произошла ошибка при входе',
          errorPassword: 'Произошла ошибка при входе',
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link href={'/registr'} className="cursor-pointer hover:underline">
                Sign Up
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/*form*/}
            <form className="mb-5" id="signup-form" onSubmit={handlerLogIn}>
              <div className="flex flex-col gap-6">
                {/*email*/}
                <div className="grid gap-2">
                  <InputLogRes
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    isError={errorText.errorEmail !== null}
                    inputValue={form.email}
                    setValue={value => setForm({ ...form, email: value.toLowerCase() })}
                    errorText={errorText.errorEmail}
                  />
                </div>
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
              </div>
            </form>

            <div className="flex items-center justify-center">
              <Link
                href={'/404'}
                className="flex justify-center text-xs !text-blue-500 !underline "
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              // onClick={handlerLogIn}
              variant="outline"
              // type="submit"
              disabled={loading}
              className={`w-full bg-black text-white dark:bg-white dark:text-black cursor-pointer transform-hover duration-500
             
              `}
            >
              {loading ? (
                <>
                  Authorization...{' '}
                  <Loader2 className="ml-2 w-5 h-5 text-yellow-400 animate-spin" />
                </>
              ) : (
                'Login'
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
}
