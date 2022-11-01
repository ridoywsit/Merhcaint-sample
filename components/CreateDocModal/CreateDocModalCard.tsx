import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

import Folder from 'public/svg/folder.svg';
import PlusSvg from 'public/svg/plus.svg';
import { ROUTES } from 'utils/routes';

type Props = {
  cardTitle: string;
  cardDescription: string;
  cardURL: string;
  type: 'button' | 'link';
};

const CreateDocModalCard = ({
  cardTitle,
  cardDescription,
  cardURL,
  type,
}: Props) => {
  const router = useRouter();
  const handleInvoiceFromPoClick = () => {
    toast.success('Successful');
  };
  return (
    <div className="flex gap-5 rounded-[20px] p-6 border border-merchaint-grey-base">
      <div>
        <Folder />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <p className="-merchaint-text-dark-grey text-header-3--medium">
          {cardTitle}
        </p>
        <p className="text-body-1">{cardDescription}</p>
        <div className="grid justify-start w-full">
          {type === 'button' ? (
            <button
              onClick={handleInvoiceFromPoClick}
              type="button"
              className="btn btn-link"
            >
              <PlusSvg className=" h-[1.125rem] w-[1.125rem]" />
              Create
            </button>
          ) : (
            <Link passHref href={cardURL}>
              <a className="btn btn-link">
                <PlusSvg className=" h-[1.125rem] w-[1.125rem]" />
                Create
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDocModalCard;
