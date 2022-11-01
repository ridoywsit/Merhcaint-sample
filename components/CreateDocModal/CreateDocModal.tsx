import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiX } from 'react-icons/hi';

import Folder from 'public/svg/folder.svg';
import PlusSvg from 'public/svg/plus.svg';
import { ROUTES } from 'utils/routes';

import CreateDocModalCard from './CreateDocModalCard';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const docModalItemList = [
  {
    cardTitle: 'Invoice',
    cardDescription:
      'A document issued by the seller to buyer that indicates the quantities and cost of products or services provided',
    cardURL: `${ROUTES.APP.INVOICE.NEW}`,
    type: 'link',
  },
  {
    cardTitle: 'Invoice from Purchase Order',
    cardDescription: 'Convert an open order into an invoice',
    cardURL: `${ROUTES.APP.DOCUMENTS}?docType=PURCHASE_ORDER`,
    type: 'button',
  },
  {
    cardTitle: 'Purchase order',
    cardDescription:
      'A document created by buyer to be sent to the seller, indicating proposed goods or services, at a specific qty. & price',
    cardURL: `${ROUTES.APP.PURCHASE_ORDER.NEW}`,
    type: 'link',
  },
  {
    cardTitle: 'Create GRN from Purchase Order',
    cardDescription:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Integer lobortis varius elit non convallis.',
    cardURL: `${ROUTES.APP.DOCUMENTS}?docType=PURCHASE_ORDER`,
    type: 'link',
  },
  {
    cardTitle: 'Remittance advice',
    cardDescription:
      'A document issued by the seller to buyer that indicates the quantities and cost of products or services provided',
    cardURL: `${ROUTES.APP.REMITTANCE_ADVICE.NEW}`,
    type: 'link',
  },
  {
    cardTitle: 'Remittance advice from Purchase Order',
    cardDescription:
      'A document issued by the seller to buyer that indicates the quantities and cost of products or services provided',
    cardURL: `${ROUTES.APP.DOCUMENTS}?docType=PURCHASE_ORDER`,
    type: 'link',
  },
  {
    cardTitle: 'Create GRN',
    cardDescription:
      'A document issued by the seller to buyer that indicates the quantities and cost of products or services provided',
    cardURL: `${ROUTES.APP.GRN.NEW}`,
    type: 'link',
  },
] as const;

const CreateDocModal = ({ setShowModal }: Props) => {
  return (
    <div>
      <div className="modal-container max-w-[1124px]">
        {/* <!-- Modal content --> */}
        <div className="bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="modal-header">
            <h3 className="text-header-3--medium ">Create a document</h3>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <HiX className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="modal-body">
            <p className="pt-2 font-medium text-black text-body-regular">
              Please select the type of document you&apos;d like to create.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {docModalItemList.map((singleDocItem, index) => (
                <CreateDocModalCard
                  key={index}
                  cardTitle={singleDocItem.cardTitle}
                  cardDescription={singleDocItem.cardDescription}
                  cardURL={singleDocItem.cardURL}
                  type={singleDocItem.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocModal;
