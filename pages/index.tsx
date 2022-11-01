import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { ErrorText } from 'components/auth';
import HomePageNav from 'components/HomePageNav';
import { customErrorMap } from 'lib/shared/zod';
import Badge from 'public/svg/badge.svg';
import Bulb from 'public/svg/bulb.svg';
import ContactImage from 'public/svg/contactimage.svg';
import Feature from 'public/svg/feature.svg';
import Feedinvoice from 'public/svg/feedInvoice.svg';
import GreyCheck from 'public/svg/greycheck.svg';
import Group from 'public/svg/group.svg';
import IconItemSolveProblem from 'public/svg/iconItemSolveProblem.svg';
import Layers from 'public/svg/layers.svg';
import Leftquote from 'public/svg/leftquote.svg';
import MerchaintWhiteText from 'public/svg/merchaintwhitetext.svg';
import Model3d from 'public/svg/modal3d.svg';
import Rightquote from 'public/svg/rightquote.svg';
import RoundWhiteCheck from 'public/svg/roundwhitecheck.svg';
import Threeway from 'public/svg/threeway.svg';

z.setErrorMap(customErrorMap);
const schema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
  contactNumber: z
    .string()
    .min(3, 'Contact number must be at least 3 characters long'),
  email: z.string().email('Email must be a valid email address'),
  companyName: z.string().optional(),
  message: z.string().optional(),
});

export type ContactForm = z.infer<typeof schema>;

const Home = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ContactForm) => {
    toast.success('Message sent successfully');
    reset();
  };

  return (
    <div>
      <section className="h-screen hero-bg">
        <HomePageNav />

        <div className="container flex flex-col flex-wrap items-center px-2 mx-auto sm:px-6 lg:px-8 md:flex-row">
          <div className="flex flex-col items-start justify-center w-full text-center md:w-2/5 md:text-left">
            <h1 className="my-4 text-6xl font-bold leading-tight">
              Digitalize <br /> invoices
              <span className="text-merchaint-teal-base">&nbsp;with AI</span>
            </h1>
            <p className="mb-8 leading-normal text-header-3">
              Manual processing of invoices waste up to 90% of accounts payable
              team&apos;s time (and money), find out how we can help you.
            </p>
          </div>

          <div className="relative w-full py-6 text-center md:w-3/5 md:h-[500px]">
            <Image
              className="z-50 w-full"
              src="/image/hero-img.png"
              layout="fill"
              priority={true}
              alt="hero image, various screen shots of parts of the app"
              objectFit="contain"
            />
          </div>
        </div>
      </section>

      <section className="container px-2 mx-auto my-32">
        <p className="mb-8 text-center text-header-2 text-merchaint-text-dark-grey">
          Certified by
        </p>

        <div className="grid w-2/3 grid-cols-3 gap-16 mx-auto">
          <div className="relative h-[72px] ">
            <Image
              src="/image/proposal.png"
              layout="fill"
              className="object-contain"
              alt="company-logo"
            />
          </div>
          <div className="relative h-[72px] ">
            <Image
              src="/image/invoicenow.png"
              layout="fill"
              className="object-contain"
              alt="company-logo"
            />
          </div>
          <div className="relative h-[72px] ">
            <Image
              src="/image/im.png"
              layout="fill"
              className="object-contain"
              alt="company-logo"
            />
          </div>
        </div>
      </section>

      <section className="container px-2 mx-auto mb-16">
        <div className="grid w-10/12 grid-cols-3 grid-rows-2 gap-12 mx-auto">
          <div className="pr-12">
            <p className="mb-4 text-5xl font-bold">Key Benefits</p>
            <p className="text-merchaint-text-medium-grey text-header-2--medium ">
              The key that you will appreciate more.
            </p>
          </div>
          <div className="pr-12 space-y-6">
            <Feedinvoice />
            <p className="text-merchaint-text-dark-grey">
              <span className="font-medium text-merchaint-text-black-800">
                Feed Invoice Data &nbsp;
              </span>
              into your ERP or accounting system
            </p>
          </div>
          <div className="pr-12 space-y-4">
            <Threeway />
            <p className="text-merchaint-text-dark-grey">
              Automate
              <span className="font-medium text-merchaint-text-black-800">
                {' '}
                &nbsp; 3 Way Match
              </span>
            </p>
          </div>
          <div className="pr-12 space-y-4">
            <Layers />
            <p className="text-merchaint-text-dark-grey">
              <span className="font-medium text-merchaint-text-black-800">
                Match and Reconcile &nbsp;
              </span>
              Payment Records and Bank Statements automatically
            </p>
          </div>
          <div className="pr-12 space-y-4">
            <Model3d />
            <p className="text-merchaint-text-dark-grey">
              <span className="font-medium text-merchaint-text-black-800">
                Enhance your visibility &nbsp;
              </span>
              of orders of your supply chain with suppliers
            </p>
          </div>
          <div className="pr-12 space-y-4">
            <Group />
            <p className="text-merchaint-text-dark-grey">
              <span className="font-medium text-merchaint-text-black-800">
                Customize Approval
              </span>
              <br />
              Logic for invoices with no PO
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 solve-section" id="whatWeSolve">
        <span className="absolute left-4">
          <IconItemSolveProblem />
        </span>
        <div className="container px-2 mx-auto text-center">
          <p className="mb-6 text-5xl font-bold text-merchaint-text-black-800">
            How we solve your problem
          </p>
          <p className="text-merchaint-text-dark-grey text-header-4--medium py-2.5 px-5 bg-merchaint-lemon-100 inline-block rounded-full">
            Tedious and costly data entry / Inaccurate data / Inefficient
            workflow
          </p>
        </div>

        <div className="container px-2 mx-auto">
          <div className="grid grid-cols-2 mt-52">
            <div className="relative h-[530px] mt-12">
              <div>
                <Image
                  src="/image/withMerchaint.png"
                  layout="fill"
                  className="object-contain"
                  alt="a person working on a laptop"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center mt-12">
              <p className="text-4xl font-medium text-merchaint-teal-200 mb-9">
                With Merchaint
              </p>

              <div className="space-y-6 w-[550px]">
                <p className="flex items-center gap-6">
                  <span>
                    <RoundWhiteCheck />
                  </span>
                  <span className="text-white text-header-3--medium">
                    Auto-extract invoice data with AI and reduce human
                    intervention
                  </span>
                </p>
                <p className="flex items-center gap-6">
                  <span>
                    <RoundWhiteCheck />
                  </span>
                  <span className="text-white text-header-3--medium">
                    Suppliers can send E-Invoice through our platform, reducing
                    the need for you to do any data entry.
                  </span>
                </p>
                <p className="flex items-center gap-6">
                  <span>
                    <RoundWhiteCheck />
                  </span>
                  <span className="text-white text-header-3--medium">
                    Make approval and validate invoices automatically from 1
                    centralized location Track every stage of your purchasing
                    process.
                  </span>
                </p>
                <p className="flex items-center gap-6">
                  <span>
                    <RoundWhiteCheck />
                  </span>
                  <span className="text-white text-header-3--medium">
                    Track every stage of your purchasing process.
                  </span>
                </p>
                <p className="flex items-center gap-6">
                  <span>
                    <RoundWhiteCheck />
                  </span>
                  <span className="text-white text-header-3--medium">
                    We integrate with your accounting or ERP system so there
                    will not be much changes in your processes in using
                    Merchaint
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-[#4E4BC9F2] h-[488px] flex items-center justify-center">
        <div className="container mx-auto ">
          <div className="mx-auto w-[970px] mt-[-148px]">
            <span className="ml-[48px]">
              <Leftquote />
            </span>
            <h2 className="text-[40px] mt-[-70px] mb-[-70px] mx-auto leading-[64px] text-center text-white">
              We believe in adapting to your processes, not change yours to fit
              the system.
            </h2>
            <span className="float-right">
              <Rightquote />
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="container bg-merchaint-grey-100 mx-auto  rounded-2xl mt-[-134px] overflow-hidden pb-16 pl-8 shadow-2xl">
          <div className="grid grid-cols-2">
            <div className="pt-16 pr-14">
              <p className="mb-6 text-header-2--medium text-merchaint-text-medium-grey">
                THE PRODUCT
              </p>
              <p className="text-5xl font-bold mb-6 text-merchaint-text-black-800 leading-[58px]">
                Transform your <br /> process with smart <br /> features
              </p>

              <p className="mb-6 text-header-3">
                We utilise a pay-as-you-use type of billing, similar to a
                utility bill, and users gets to access all the features or
                features that they need (plug and play model).
                <br />
                <br />
                Users can sign up for free and enjoy receiving and processing up
                to 20 e-invoices, subsequent e-invoices will be charged.
                <br />
                <br />
                We also do custom integrations to reduce your data entry into
                your accounting or ERP system, do contact our sales team for
                more pricing info!
              </p>
            </div>
            <div className="relative">
              <Feature className="w-[680px] h-auto object-contain" />
            </div>
          </div>

          <div className="grid grid-cols-3 mt-16">
            <div>
              <span className="text-black text-header-2--medium mb-9">
                Digitalize invoice
              </span>
              <div className="space-y-5 w-[354px]">
                <p className="flex items-center gap-2 ">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    E-Invoice Sending and Receiving (PEPPOL Enabled)
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Extracting Data from paper/pdf invoices
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Data Entry into Acct / ERP Systems
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Storing of Invoices and other Documents
                  </span>
                </p>
              </div>
            </div>
            <div>
              <span className="text-black text-header-2--medium mb-9">
                Automate validation
              </span>
              <div className="space-y-5 w-[295px]">
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Custom Approval Logic
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Automated 3 Way Match
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    E-Documents Exchange Status with suppliers
                  </span>
                </p>
              </div>
            </div>

            <div>
              <div className="">
                <p className="inline-block gap-2 px-6 py-3 uppercase text-body-1--medium text-merchaint-teal-100 mb-7 bg-merchaint-purple-base extrafeature-bg">
                  <span className="flex items-center gap-2">
                    <span>
                      <Badge />
                    </span>
                    <span className="font-bold tracking-[1px]">
                      EXTRA features
                    </span>
                  </span>
                </p>
              </div>
              <div className="space-y-5 w-[354px]">
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Non PO Handling
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Automated General Ledger Coding
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Fraud Detection
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Multi-Entities
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <GreyCheck />
                  </span>
                  <span className="text-black text-header-5">
                    Reconciliation
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-36">
        <div>
          <p className="mb-6 uppercase text-header-2--medium text-merchaint-text-medium-grey">
            Testimonials
          </p>
          <p className="text-5xl font-bold mb-6 text-merchaint-text-black-800 leading-[58px]">
            Trusted by our customers
          </p>
        </div>
        <div className="flex gap-8">
          <div className="bg-merchaint-grey-200 inline-block p-12 rounded-2xl customer-card w-[700px]">
            <p className="text-header-3">
              Merchaint reduced about 40-50% of our AP processing time, and gave
              us this tremendous time and cost savings to move ahead with other
              projects. we are also looking forward to their new features which
              will automate the 3 way match.
            </p>
            <p className="text-right text-black text-header-3--medium">Andy</p>
            <p className="text-right text-header-4--medium">
              Taka Hardware & Engineering
            </p>
          </div>
          <div className="bg-merchaint-grey-100 inline-block p-12 rounded-2xl customer-card w-[700px] opacity-40">
            <p className=" text-header-3">
              Merchaint reduced about 40-50% of our AP processing time, and gave
              us this tremendous time and cost savings to move ahead with other
              projects. we are also looking forward to their new features which
              will automate the 3 way match.
            </p>
            <p className="text-right text-black text-header-3--medium">Andy</p>
            <p className="text-right text-header-4--medium merchaint-text-medium-grey">
              Taka Hardware & Engineering
            </p>
          </div>
        </div>
      </section>

      <form
        className="relative pb-12 contact mt-36"
        id="contactUs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="mb-5 bulb">
          <Bulb className="mx-auto" />
        </span>
        <div className="container grid grid-cols-2 pt-24 mx-auto">
          <div>
            <p className="text-header-2--medium text-merchaint-text-medium-grey mb-6 uppercase tracking-[2px]">
              contact us
            </p>
            <p className="text-5xl font-bold mb-6 text-merchaint-text-black-800 leading-[58px]">
              Let&apos;s get in touch
            </p>
            <p className="mb-6 text-merchaint-text-dark-grey">
              Do fill up the form for other enquiries and our friendly <br />
              experts will reach out to you soon!
            </p>
            <span>
              <ContactImage />
            </span>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  className={`input ${
                    errors?.firstName ? 'input-error' : null
                  }`}
                  placeholder="First name"
                  {...register('firstName')}
                />
                {errors?.firstName?.message && (
                  <ErrorText
                    className="-bottom-5"
                    text={errors.firstName.message}
                  />
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  className={`input ${errors?.lastName ? 'input-error' : null}`}
                  placeholder="Last Name"
                  {...register('lastName')}
                />
                {errors?.lastName?.message && (
                  <ErrorText
                    className="-bottom-5"
                    text={errors.lastName.message}
                  />
                )}
              </div>
            </div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  className={`input ${errors?.email ? 'input-error' : null}`}
                  placeholder="Email address"
                  {...register('email')}
                />
                {errors?.email?.message && (
                  <ErrorText
                    className="-bottom-5"
                    text={errors.email.message}
                  />
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  className={`input ${
                    errors?.contactNumber ? 'input-error' : null
                  }`}
                  placeholder="Contact number"
                  {...register('contactNumber')}
                />
                {errors?.contactNumber?.message && (
                  <ErrorText
                    className="-bottom-5"
                    text={errors.contactNumber.message}
                  />
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                className={`input ${
                  errors?.companyName ? 'input-error' : null
                }`}
                placeholder="Company name (Optional)"
                {...register('companyName')}
              />
              {errors?.companyName?.message && (
                <ErrorText
                  className="-bottom-5"
                  text={errors.companyName.message}
                />
              )}
            </div>
            <div className="relative">
              <textarea
                className={`input ${errors?.message ? 'input-error' : null}`}
                cols={30}
                rows={4}
                placeholder="Message (Optional)"
                {...register('message')}
              />
              {errors?.message?.message && (
                <ErrorText
                  className="-bottom-5"
                  text={errors.message.message}
                />
              )}
            </div>

            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>

      <section className="p-8 bg-merchaint-text-medium-grey">
        <div className="container mx-auto ">
          <div className="flex justify-between">
            <div className="flex items-center gap-8">
              <MerchaintWhiteText />
              <span className="justify-center text-white text-body-2">
                © Merchaint 2022 Copyright reserved.
              </span>
            </div>
            <div className="space-x-6">
              <a href="#" className="footer-link">
                Home
              </a>
              <a href="#" className="footer-link ">
                how we work
              </a>
              <a href="#" className="footer-link ">
                our features
              </a>
              <a href="#" className="footer-link ">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
