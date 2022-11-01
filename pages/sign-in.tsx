import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiEyeOff, HiEye } from 'react-icons/hi';
import { z } from 'zod';

import { isAxiosError } from 'lib/error';
import {
  loginUser,
  LoginUserInput,
  LoginUserResponse,
  sessionLogin,
} from 'services/authService';
import { ErrorResponse } from 'types/util.type';

import { labelClass, inputClass, ErrorText } from '../components/auth';
import LogoDarkBase from '../public/svg/logo.svg';
import styles from '../styles/auth-background.module.css';
import { ROUTES } from '../utils/routes';

const signInSchema = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [passwordInputType, setPasswordInputType] = React.useState<
    'password' | 'text'
  >('password');
  const labelClasses = classNames(labelClass);
  const inputClasses = classNames(inputClass);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const { inviteCode: inviteCodeParam, redirect } = router.query;
  const inviteCode =
    typeof inviteCodeParam === 'string' ? inviteCodeParam : undefined;
  const { mutateAsync: sessionLoginMutation } = useMutation(
    ['sessionLogin'],
    (data: LoginUserResponse) => sessionLogin(data),

    {
      onSuccess: () => {
        if (inviteCode != null && inviteCode !== '') {
          const params = new URLSearchParams();
          params.append('inviteCode', inviteCode);
          router.push(`${ROUTES.INVITE}?${params.toString()}`);
          return;
        }
        if (redirect != null && typeof redirect === 'string') {
          router.push(redirect);
          return;
        }
        router.push(ROUTES.APP.HOME);
      },
    },
  );

  const { mutateAsync } = useMutation(
    (input: LoginUserInput) => {
      return loginUser(input);
    },
    {
      onSuccess: (data) => {
        toast.promise(
          sessionLoginMutation(data),
          {
            loading: `Logging in ${data.user.firstName ?? 'user'}`,
            success: `Logged in ${data.user.firstName ?? 'user'}`,
            error: `Failed to login ${data.user.firstName ?? 'user'}`,
          },
          {
            id: 'session_login',
          },
        );
      },
      onError: (err: Error | AxiosError<ErrorResponse>) => {
        if (isAxiosError(err)) {
          if (err?.response?.status === 401) {
            toast.error(err.response?.data?.message ?? 'Invalid credentials', {
              id: 'invalid-credentials',
            });
          }
        }
      },
    },
  );

  const togglePasswordInputType = () => {
    setPasswordInputType((prevType) =>
      prevType === 'password' ? 'text' : 'password',
    );
  };

  const onSubmit = (data: SignInForm) => {
    toast.success('Login Successful');
    router.push(ROUTES.APP.HOME);
  };

  return (
    <div className={`min-h-screen ${styles.wrapper}`}>
      <header className="p-10 ">
        <Link passHref href={ROUTES.HOME}>
          <a>
            <LogoDarkBase aria-hidden="true" />
          </a>
        </Link>
      </header>
      <main className="max-w-md px-12 mx-auto bg-white border shadow rounded-2xl border-merchaint-grey-200 py-14">
        <header className="text-center">
          <h3 className="text-black text-header-2--medium">
            Sign in to your account
          </h3>
        </header>
        <form
          id="sign-in-form"
          className="space-y-3 mt-[3.25rem]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className={labelClasses} htmlFor="username">
            Email
            <input
              className={`input mt-2 ${errors.email ? 'input-error' : null}`}
              type="email"
              id="email"
              autoComplete="email"
              {...register('email')}
            />
            {errors?.email?.message ? (
              <ErrorText text={errors.email.message} />
            ) : null}
          </label>
          <label className={labelClasses} htmlFor="password">
            Password
            <input
              className={`input mt-2 ${errors.password ? 'input-error' : null}`}
              type={passwordInputType}
              autoComplete="current-password"
              id="password"
              {...register('password')}
            />
            {errors?.password?.message ? (
              <ErrorText text={errors.password.message} />
            ) : null}
            <button
              type="button"
              className="absolute z-10 items-center justify-center p-0 text-base font-normal leading-snug text-center bg-transparent rounded right-2 top-[2.65rem] text-slate-300"
              onClick={() => togglePasswordInputType()}
            >
              {passwordInputType === 'password' ? (
                <HiEyeOff className="w-4 h-4 text-[#8491A1]" />
              ) : (
                <HiEye className="w-4 h-4 text-[#8491A1]" />
              )}
            </button>
          </label>
        </form>
        <div className="flex justify-end">
          <Link href={ROUTES.FORGOT_PASSWORD} passHref>
            <a className="mt-4 text-body-1 text-merchaint-teal-base">
              Forgot your password?
            </a>
          </Link>
        </div>
        <button
          form="sign-in-form"
          type="submit"
          className="w-full mt-8 btn btn-primary"
        >
          Sign in
        </button>
      </main>
    </div>
  );
};

export default SignIn;
