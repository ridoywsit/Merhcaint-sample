import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import LogoDarkBase from 'public/svg/logo.svg';
import { ROUTES } from 'utils/routes';

type Props = {
  navClass?: string;
};

const HomePageNav = ({ navClass }: Props) => {
  return (
    <nav className={navClass}>
      <div className="container px-2 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-32">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <LogoDarkBase className="block " />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link
                  href={{
                    pathname: ROUTES.HOME,
                    hash: '#whatWeSolve',
                  }}
                  passHref
                >
                  <a
                    className="flex items-center px-3 py-2 font-bold uppercase text-body-2--medium text-merchaint-text-medium-grey tracking-[1px]"
                    aria-current="page"
                  >
                    what we solve
                  </a>
                </Link>

                <Link
                  href={{
                    pathname: ROUTES.HOME,
                    hash: '#',
                  }}
                  passHref
                >
                  <a className="flex items-center px-3 py-2 font-bold uppercase text-merchaint-text-medium-grey text-body-2--medium tracking-[1px]">
                    pricing
                  </a>
                </Link>

                <Link
                  href={{
                    pathname: ROUTES.HOME,
                    hash: '#contactUs',
                  }}
                  passHref
                >
                  <a className="flex items-center px-3 py-2 font-bold uppercase text-merchaint-text-medium-grey text-body-2--medium tracking-[1px]">
                    contact us
                  </a>
                </Link>

                <Link passHref href={ROUTES.SIGN_IN}>
                  <a className="bg-transparent btn btn-border-primary">
                    Sign In
                  </a>
                </Link>

                <Link passHref href={ROUTES.SIGN_UP}>
                  <a className="btn btn-primary">Sign Up</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Team
          </a>

          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Projects
          </a>

          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNav;
