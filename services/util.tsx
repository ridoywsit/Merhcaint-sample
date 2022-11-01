import { QueryCache, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { StatusProps } from 'components/Status';
import { API_URL } from 'environment';
import { isAxiosError } from 'lib/error';
import { Merchant } from 'types/merchant';
import { PurchaseOrderDocStatus } from 'types/purchaseOrder.type';
import { Address, DocType } from 'types/util.type';
import { ROUTES } from 'utils/routes';
const defaultQueryClient = new QueryClient();

type GetSendStatusTextInput = {
  docType?: DocType;
  docStatus?: StatusProps['status'];
  user: 'creator' | 'receiver' | undefined;
};

export const getSendStatusText = ({
  docType,
  docStatus,
  user,
}: GetSendStatusTextInput) => {
  // console.log({ user, docType, docStatus });
  if (user == null) return docStatus;
  if (docType === 'PURCHASE_ORDER') {
    if (docStatus === 'SENT') {
      if (user === 'receiver') return 'RECEIVED';
    }
    return docStatus;
  }
  if (docType === 'INVOICE') {
    if (docStatus === 'SENT') {
      if (user === 'receiver') {
        return 'RECEIVED';
      }
      return 'SENT';
    }
    return docStatus;
  }
  if (docType === 'GOOD_RECEIVED_NOTE') {
    if (docStatus === 'SENT') {
      if (user === 'receiver') {
        return 'RECEIVED';
      }
      return 'SENT';
    }
    return docStatus;
  }

  if (docType === 'REMITTANCE_ADVICE') {
    if (docStatus === 'SENT') {
      if (user === 'receiver') {
        return 'RECEIVED';
      }
      return 'SENT';
    }
    return docStatus;
  }

  return docStatus;
};

export const getFileDownloadUrl = (fileId: string) => {
  return `${API_URL}/files/${fileId}/download`;
};

export const generateAddress = (
  dataLogic: boolean,
  logicTrueAddress: Address,
  logicFalseAddress: Address,
) => {
  const newAddress: Address = {
    id: dataLogic ? logicTrueAddress.id : undefined,
    street: dataLogic ? logicTrueAddress.street : logicFalseAddress.street,
    additionalStreet: dataLogic
      ? logicTrueAddress.additionalStreet
      : logicFalseAddress.additionalStreet,
    city: dataLogic ? logicTrueAddress.city : logicFalseAddress.city,
    zip: dataLogic ? logicTrueAddress.zip : logicFalseAddress.zip,
    country: dataLogic ? logicTrueAddress.country : logicFalseAddress.country,
  };
  return newAddress;
};

export { defaultQueryClient };
