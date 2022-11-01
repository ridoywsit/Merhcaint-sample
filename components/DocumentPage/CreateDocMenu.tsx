import {
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  Root as TooltipRoot,
  Provider as TooltipProvider,
} from '@radix-ui/react-tooltip';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { FiChevronUp } from 'react-icons/fi';

import Button, { useButtonClass } from 'components/Button';
import Down from 'public/svg/down.svg';
import { Document } from 'services/documents';
import { Merchant } from 'types/merchant';
import { ROUTES } from 'utils/routes';

type CreateDocMenuProps = {
  selectedRows: Document[];
};

type HandleSelectTypes = {
  selectRows: Document[];
  type: 'purchaseOrder' | 'invoice' | 'grn' | 'remittanceAdvice';
};
const CreateDocMenu = ({ selectedRows }: CreateDocMenuProps) => {
  const router = useRouter();

  const handleSelect = ({ type }: HandleSelectTypes) => {
    switch (type) {
      case 'purchaseOrder': {
        router.push(ROUTES.APP.PURCHASE_ORDER.NEW);
        return;
      }
      case 'invoice': {
        router.push(ROUTES.APP.INVOICE.NEW);
        return;
      }
      case 'grn': {
        router.push(ROUTES.APP.GRN.NEW);
        return;
      }
      case 'remittanceAdvice': {
        router.push(ROUTES.APP.REMITTANCE_ADVICE.NEW);
        return;
      }
    }
  };

  const buttonClass = useButtonClass({ variant: 'primary', size: 'base' });

  return (
    <Menu>
      {({ isExpanded }) => (
        <div className="relative">
          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger>
                <MenuButton className={classNames(buttonClass, 'relative')}>
                  Create Document
                  <FiChevronUp
                    className={classNames(
                      'w-5 h-5 text-white transform transition-transform ml-2',
                      {
                        'rotate-180': !isExpanded,
                      },
                    )}
                  />
                </MenuButton>
              </TooltipTrigger>
              <TooltipContent className="bg-[#2D333A] text-white text-xs p-3 rounded-lg">
                Create new document to start your business
                <TooltipArrow className="fill-black" />
              </TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
          <MenuList
            portal={false}
            className="absolute right-0 z-10 top-10 py-3 bg-white rounded-lg  min-w-[184px] drop-shadow-btn-menu border"
          >
            <MenuItem
              className="block px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer"
              onSelect={() =>
                handleSelect({
                  selectRows: selectedRows,
                  type: 'purchaseOrder',
                })
              }
            >
              Purchase order
            </MenuItem>
            <MenuItem
              className="block px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer"
              onSelect={() =>
                handleSelect({ selectRows: selectedRows, type: 'invoice' })
              }
            >
              Invoice
            </MenuItem>
            <MenuItem
              className="block px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer"
              onSelect={() =>
                handleSelect({ selectRows: selectedRows, type: 'grn' })
              }
            >
              Good received note
            </MenuItem>
            <MenuItem
              className="block px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer"
              onSelect={() =>
                handleSelect({
                  selectRows: selectedRows,
                  type: 'remittanceAdvice',
                })
              }
            >
              Remittance advice
            </MenuItem>
          </MenuList>
        </div>
      )}
    </Menu>
  );
};

export default CreateDocMenu;
