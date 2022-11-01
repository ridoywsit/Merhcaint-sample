import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';
export type StatusProps = {
  status:
    | 'DRAFT'
    | 'SAVED'
    | 'SENT'
    | 'INVITATION SENT'
    | 'SAVED'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'EXTRACTED'
    | 'VOID'
    | 'ARCHIVED'
    | 'CONNECTED'
    | 'DISCONNECTED'
    | 'PENDING CONNECTION'
    | 'PENDING ACCEPTANCE'
    | 'RECEIVE'
    | 'RECEIVED'
    | 'INVITED'
    | 'PENDING_APPROVAL'
    | 'PENDING APPROVAL'
    | 'APPROVED'
    | 'DELETED'
    | 'EXPORTED';
  className?: string;
  rounded?: boolean;
};

type TypeProps = {
  type: 'green' | 'red' | 'brown' | 'indigo' | 'sky' | 'amber' | 'yellowGreen';
  children: React.ReactNode;
  className?: string;
  rounded?: boolean;
};

type Props = {
  status?: StatusProps['status'];
  type?: TypeProps['type'];
  children?: React.ReactNode;
  className?: string;
  rounded?: boolean;
};

function Status({}: StatusProps): JSX.Element;
function Status({}: TypeProps): JSX.Element;

function Status({
  type,
  status,
  children,
  className: classNameProp,
  rounded = true,
}: Props) {
  const className = classNames(
    'py-0.5 px-3 text-xs font-medium  capitalize',
    {
      'bg-green-50 text-green-800':
        status === 'ACCEPTED' ||
        status === 'APPROVED' ||
        status === 'CONNECTED' ||
        status === 'SAVED' ||
        type === 'green',
      'bg-red-50 text-red-800':
        status === 'REJECTED' ||
        status === 'DISCONNECTED' ||
        status === 'EXPORTED' ||
        type === 'red',
      'bg-[#FEF6F2] text-[#99411B]': status === 'ARCHIVED' || type === 'brown',
      'bg-indigo-50 text-indigo-800':
        status === 'SENT' ||
        status === 'INVITATION SENT' ||
        status === 'RECEIVE' ||
        status === 'RECEIVED' ||
        status === 'PENDING CONNECTION' ||
        status === 'PENDING ACCEPTANCE' ||
        type === 'indigo',
      'bg-[#EEF9FF] text-[#307AA3]': status === 'EXTRACTED' || type === 'sky',
      'bg-amber-50 text-amber-800':
        status === 'DRAFT' ||
        status === 'INVITED' ||
        status === 'PENDING_APPROVAL' ||
        status === 'PENDING APPROVAL' ||
        type === 'amber',
      'bg-[#FFFFEB] text-[#90920E]':
        status === 'VOID' || type === 'yellowGreen',
    },
    { 'rounded-full': rounded },
  );
  const mergedClass = twMerge(className, classNameProp);
  if (status) {
    return <span className={mergedClass}>{status.toLowerCase()}</span>;
  }

  return <span className={mergedClass}>{children}</span>;
}

export default Status;
