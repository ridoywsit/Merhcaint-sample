import { DevTool } from '@hookform/devtools';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiCheckCircle, HiEye, HiEyeOff } from 'react-icons/hi';
import { useWizard, Wizard } from 'react-use-wizard';

import {
  AutoCompleteArrayInput,
  AutoCompleteObjectArrayInput,
} from 'components/DownShift/AutoComplete';
import PhoneNumberInput from 'components/PhoneNumberInput';
import SelectController from 'components/SelectController';
import { isAxiosError } from 'lib/error';
import { logger } from 'lib/logger';
import {
  checkEmail,
  registerUser,
  RegisterUserInput,
} from 'services/authService';
import { Merchant } from 'types/merchant';
import { User } from 'types/user';
import { ErrorResponse } from 'types/util.type';
import {
  countryCodeArray,
  countryCodes,
  countryCodesArray,
  INDUSTRY_CONSTANT,
} from 'utils/constants';

import { ErrorText } from '../components/auth';
import { inputClass, labelClass } from '../components/auth/util';
import LogoDarkBase from '../public/svg/logo.svg';
import styles from '../styles/auth-background.module.css';
import { ROUTES } from '../utils/routes';

type Step1Props = {
  setFormData: React.Dispatch<React.SetStateAction<Step1Form | null>>;
  step1Form: Step1Form | null;
};
type Step2Props = {
  setFormData: React.Dispatch<React.SetStateAction<Step2Form | null>>;
  step1Form: Step1Form | null;
};

type Step1Form = {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  password: string;
};

const covertStep1FormToUser = (step1Form: Step1Form): User => {
  const { firstName, lastName, email, contactNo, password } = step1Form;
  return {
    firstName,
    lastName,
    email,
    mobile: contactNo,
    password,
  };
};
const convertStep2FormToMerchant = (step2Form: Step2Form): Merchant => {
  const { companyName, country, industry, uen } = step2Form;
  return {
    name: companyName,
    country,
    industry,
    uen,
  };
};

const Step1 = ({ setFormData, step1Form }: Step1Props) => {
  const labelClasses = classNames(labelClass);
  const inputClasses = classNames(inputClass);
  const [passwordInputType, setPasswordInputType] = React.useState<
    'password' | 'text'
  >('password');
  const togglePasswordInputType = () => {
    setPasswordInputType((prevType) =>
      prevType === 'password' ? 'text' : 'password',
    );
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<Step1Form>({});
  const { nextStep } = useWizard();
  const onSubmit = (data: Step1Form) => {
    setFormData(data);
    nextStep();
  };

  React.useEffect(() => {
    if (step1Form == null) return;
    reset(step1Form);
  }, [reset, step1Form]);
  return (
    <>
      <form
        id="registration-1"
        className="mt-10 space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="firstName" className={labelClasses}>
          First name
          <input
            type="text"
            id="firstName"
            className={`input ${
              errors?.firstName?.message ? 'input-error' : null
            }`}
            {...register('firstName', {
              required: {
                value: true,
                message: 'First name is required',
              },
            })}
          />
          {errors?.firstName?.message ? (
            <ErrorText text={errors.firstName.message} />
          ) : null}
        </label>
        <label htmlFor="lastName" className={labelClasses}>
          Last name
          <input
            className={`input  ${
              errors?.lastName?.message ? 'input-error' : null
            }`}
            type="text"
            id="lastName"
            {...register('lastName', {
              required: {
                value: true,
                message: 'Last name is required',
              },
            })}
          />
          {errors?.lastName?.message ? (
            <ErrorText text={errors.lastName.message} />
          ) : null}
        </label>
        <label htmlFor="email" className={labelClasses}>
          Email address
          <input
            className={`input  ${
              errors?.email?.message ? 'input-error' : null
            }`}
            type="email"
            id="email"
            autoComplete="email"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              validate: async (value) => {
                if (!value) return 'Email is required';
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return 'Invalid email address';
                }
              },
            })}
          />
          {errors?.email?.message ? (
            <ErrorText text={errors.email.message} />
          ) : null}
        </label>
        <label htmlFor="tel" className={labelClasses}>
          Contact no.
          <PhoneNumberInput
            control={control}
            name="contactNo"
            rules={{
              required: {
                value: true,
                message: 'Contact number is required',
              },
              minLength: {
                value: 5,
                message: 'Please provide a valid phone number',
              },
            }}
            containerClass={
              errors.contactNo
                ? 'border border-red-500'
                : 'border-0 border-merchaint-grey-base'
            }
          />
          {errors?.contactNo?.message ? (
            <ErrorText text={errors.contactNo.message} />
          ) : null}
        </label>
        <label htmlFor="password" className={`${labelClasses} relative`}>
          Password
          <input
            className={`input  ${
              errors?.password?.message ? 'input-error' : null
            }`}
            type={passwordInputType}
            id="password"
            autoComplete="new-password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
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
          {errors?.password?.message ? (
            <ErrorText text={errors.password.message} />
          ) : null}
        </label>
      </form>
      <div className="flex gap-2 mt-8 place-content-center">
        <span className="w-2 h-2 rounded-full bg-merchaint-teal-base" />
        <span className="w-2 h-2 rounded-full bg-merchaint-grey-base" />
      </div>
      <button
        form="registration-1"
        type="submit"
        className="w-full mt-6 uppercase btn btn-primary"
      >
        Next
      </button>
      {process.env.NODE_ENV === 'development' ? (
        <DevTool control={control} />
      ) : null}
    </>
  );
};

type Step2Form = {
  companyName: string;
  // businessRegistrationNo: string;
  country: string;
  industry: string;
  terms: boolean;
  uen: string;
};

const Step2 = ({ setFormData, step1Form }: Step2Props) => {
  const labelClasses = classNames(labelClass);
  const inputClasses = classNames(inputClass);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step2Form>({});
  const { previousStep } = useWizard();
  const { inviteCode: inviteCodeParam, acceptCode: acceptCodeParam } =
    router.query;
  const inviteCode =
    typeof inviteCodeParam === 'string' ? inviteCodeParam : undefined;
  const acceptCode =
    typeof acceptCodeParam === 'string' ? acceptCodeParam : undefined;
  const { mutateAsync } = useMutation(
    (data: RegisterUserInput) => registerUser(data),
    {
      onSuccess: () => {
        if (inviteCode != null) {
          const params = new URLSearchParams();
          params.append('inviteCode', inviteCode);
          router.push(`${ROUTES.SIGN_IN}?${params.toString()}`);
          return;
        }
        router.push(ROUTES.SIGN_IN);
      },
      onError: (error: Error | AxiosError<ErrorResponse>) => {
        if (isAxiosError(error)) {
          logger.error('Axios error on sign up', error.response);
        }
      },
    },
  );
  const onSubmit = (data: Step2Form) => {
    if (step1Form == null) {
      previousStep();
      return;
    }
    toast.success('Registered successfully');
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <>
      <form
        id="registration-2"
        className="mt-10 space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="companyName" className={labelClasses}>
          Company name
          <input
            type="text"
            id="companyName"
            className={`input ${
              errors?.companyName?.message ? 'input-error' : null
            }`}
            {...register('companyName', {
              required: {
                value: true,
                message: 'Company name is required',
              },
            })}
          />
          {errors?.companyName?.message ? (
            <ErrorText text={errors.companyName.message} />
          ) : null}
        </label>
        <label htmlFor="uen" className={labelClasses}>
          Business Registration no
          <input
            className={`input ${errors?.uen?.message ? 'input-error' : null}`}
            type="uen"
            id="uen"
            {...register('uen', {
              required: {
                value: true,
                message: 'Business Registration no  is required',
              },
            })}
          />
          {errors?.uen?.message ? (
            <ErrorText text={errors.uen.message} />
          ) : null}
        </label>
        <div className={`${labelClasses} `}>
          Industry Type
          <AutoCompleteArrayInput
            name="industry"
            control={control}
            arrayValues={INDUSTRY_CONSTANT}
            rules={{
              required: {
                value: true,
                message: 'Industry type is required',
              },
            }}
          />
          {errors?.industry?.message ? (
            <ErrorText text={errors.industry.message} />
          ) : null}
        </div>
        <label htmlFor="country" className={`${labelClasses} `}>
          Country
          <AutoCompleteObjectArrayInput
            name="country"
            control={control}
            arrayValues={countryCodeArray}
            displayPath="value"
            valuePath="code"
            rules={{
              required: {
                value: true,
                message: 'Country is required',
              },
            }}
          />
          {errors?.country?.message ? (
            <ErrorText text={errors.country.message} />
          ) : null}
        </label>
        <label
          htmlFor="terms"
          className="flex items-center gap-2 text-merchaint-text-dark-grey text-body-1"
        >
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-merchaint-teal-base focus:ring-merchaint-teal-base"
            {...register('terms', {
              required: {
                value: true,
                message: 'Terms and conditions are required',
              },
            })}
          />
          <div className="relative py-3">
            <p className="inline-flex items-center">
              I agree to the Terms & Conditions
            </p>
            {errors?.terms?.message ? (
              <ErrorText text={errors.terms.message} />
            ) : null}
          </div>
        </label>
      </form>

      <div className="flex gap-2 mt-8 place-content-center">
        <span className="w-2 h-2 rounded-full bg-merchaint-grey-base" />
        <span className="w-2 h-2 rounded-full bg-merchaint-teal-base" />
      </div>

      <button
        form="registration-2"
        type="submit"
        className="w-full mt-6 uppercase btn btn-primary"
      >
        Create Account
      </button>
      <button
        type="button"
        className="w-full mt-6 uppercase btn btn-border-primary"
        onClick={() => previousStep()}
      >
        Previous Step
      </button>
      {process.env.NODE_ENV === 'development' ? (
        <DevTool control={control} />
      ) : null}
    </>
  );
};

const SignUp = () => {
  const [form1, setForm1] = React.useState<Step1Form | null>(null);
  const [form2, setForm2] = React.useState<Step2Form | null>(null);
  const router = useRouter();
  const { inviteCode: inviteCodeParam, acceptCode: acceptCodeParam } =
    router.query;
  const inviteCode =
    typeof inviteCodeParam === 'string' ? inviteCodeParam : undefined;

  React.useEffect(() => {
    if (inviteCode != null) {
      toast(
        'You have been invited to join the network. Please sign up. If you are already a member, please sign in.',
      );
    }
  }, [inviteCode]);
  return (
    <div className={`${styles.wrapper} min-h-screen relative`}>
      <header className="absolute p-10">
        <Link passHref href={ROUTES.HOME}>
          <a>
            <LogoDarkBase aria-hidden="true" />
          </a>
        </Link>
      </header>
      <div className="grid min-h-screen place-content-center">
        <main className="grid max-w-4xl grid-cols-2 mx-auto border shadow border-merchaint-grey-200 rounded-2xl">
          <div
            className={`relative text-white rounded-l-2xl ${styles.image__wrapper}`}
          >
            <div className="relative w-full h-full">
              <Image
                src="/image/login.png"
                layout="fill"
                alt="Someone holding up a tablet and a pen on the hand of the other"
                className="border-0 border-l-0 rounded-2xl"
                priority={true}
              />
            </div>
            <div className="relative px-12 text">
              <h2 className="mb-8 mt-20 font-bold text-[36px] leading-[48px]">
                Transform your process with smart features
              </h2>
              <ul className="space-y-6">
                <li className="inline-flex items-start gap-6 text-base">
                  <span>
                    <HiCheckCircle className="w-6 h-6 mt-1 text-white" />
                  </span>
                  Auto-extract invoice data with AI and reduce human
                  intervention
                </li>
                <li className="inline-flex items-start text-base gap-x-6">
                  <span>
                    <HiCheckCircle className="w-6 h-6 mt-1 text-white" />
                  </span>
                  Make approval and validate invoices automatically from 1
                  centralized location
                </li>
                <li className="inline-flex items-start text-base gap-x-6">
                  <span>
                    <HiCheckCircle className="w-6 h-6 mt-1 text-white" />
                  </span>
                  Track every stage of your purchasing process.
                </li>
                <li className="inline-flex items-start text-base gap-x-6">
                  <span>
                    <HiCheckCircle className="w-6 h-6 mt-1 text-white" />
                  </span>
                  We integrate with your accounting or ERP system so there will
                  not be much changes in your processes in using Merchaint
                </li>
              </ul>
            </div>
          </div>
          <div className="p-12 bg-white rounded-r-2xl">
            <h3 className="text-merchaint-text-dark-grey text-header-2--medium ">
              Create an Account
            </h3>
            <p className="text-body-1 text-merchaint-text-dark-grey">
              Already have an account?{' '}
              <Link
                href={`${ROUTES.SIGN_IN}?inviteCode=${
                  inviteCode != null ? inviteCode : ''
                }`}
                passHref
              >
                <a className="text-merchaint-teal-base">Sign in</a>
              </Link>
            </p>
            <Wizard>
              <Step1 setFormData={setForm1} step1Form={form1} />
              <Step2 setFormData={setForm2} step1Form={form1} />
            </Wizard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
