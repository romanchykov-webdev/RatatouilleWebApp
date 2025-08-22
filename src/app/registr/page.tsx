'use client';

import React, { useEffect, useState } from 'react';
import HeaderComponent from '@/components/Header/headerComponent';
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
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { supabase } from '../../../api/supabase';

const SingUp: React.FC = () => {
  const router = useRouter();

  // как в RN: userName + email + password + repeatPassword
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    repPassword: '',
  });

  // как в RN: простые установки языка/темы (можно подключить свои компоненты позже)
  const [lang] = useState<'en' | 'ru' | 'it' | string>('en');
  const [theme] = useState<'auto' | 'light' | 'dark' | string>('auto');

  const [loading, setLoading] = useState(false);
  const [allInputDisabled, setAllInputDisabled] = useState(true);

  // дизаблим кнопку, если что-то не заполнено или пароли не совпадают
  useEffect(() => {
    const { userName, email, password, repPassword } = form;
    if (!userName || !email || !password || !repPassword || password !== repPassword) {
      setAllInputDisabled(true);
    } else {
      setAllInputDisabled(false);
    }
  }, [form]);

  const handlerRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = form.email.trim();
    const userName = form.userName.trim();
    const password = form.password.trim();
    const repeatPassword = form.repPassword.trim();

    // проверки — точно как в RN:
    if (password !== repeatPassword) {
      toast.error('Enter two identical passwords!');
      return;
    }
    if (!email || !password || !repeatPassword || !userName) {
      toast.error('Please fill all the fields!');
      return;
    }

    setLoading(true);

    try {
      // прямой вызов supabase.auth.signUp как в RN
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: userName,
            app_lang: lang,
            theme,
            avatar: null,
          },
        },
      });

      if (error) {
        toast.error(error.message || 'Sign up error');
        return;
      }

      // Поведение после регистрации:
      // Если в проекте включено подтверждение email — сессии может не быть.
      if (!data.session) {
        toast.success('Check your email to confirm registration');
      } else {
        toast.success('Successful registration');
        router.push('/profile');
      }

      // сброс формы
      setForm({ userName: '', email: '', password: '', repPassword: '' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeaderComponent />
      <div className="flex items-center justify-center ">
        <Card style={shadowBox()} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
            <CardAction>
              <Link href={'/login'} className="cursor-pointer hover:underline">
                Log In
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form className="mb-5" id="signup-form" onSubmit={handlerRegister}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-5">
                  {/* user name */}
                  <InputLogRes
                    id="userName"
                    type="text"
                    placeholder="User name"
                    inputValue={form.userName}
                    setValue={value => setForm({ ...form, userName: value })}
                  />

                  {/* email */}
                  <InputLogRes
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    inputValue={form.email}
                    setValue={value => setForm({ ...form, email: value.toLowerCase() })}
                  />

                  {/* password */}
                  <InputLogRes
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    isPas
                    inputValue={form.password}
                    setValue={value => setForm({ ...form, password: value })}
                  />

                  {/* repeat password */}
                  <InputLogRes
                    id="repPassword"
                    type="password"
                    placeholder="Repeat password"
                    isPas
                    inputValue={form.repPassword}
                    setValue={value => setForm({ ...form, repPassword: value })}
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
              disabled={loading || allInputDisabled}
              className="w-full bg-black text-white dark:bg-white dark:text-black cursor-pointer transform-hover duration-500"
            >
              {loading ? (
                <>
                  Authorization... <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                </>
              ) : (
                'Registration'
              )}
            </Button>

            <Button variant="outline" className="w-full cursor-pointer">
              <Link href="/">Login with Google</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default SingUp;
