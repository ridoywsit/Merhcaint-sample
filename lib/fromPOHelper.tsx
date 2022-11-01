import Router from 'next/router';
import toast from 'react-hot-toast';

import { ROUTES } from 'utils/routes';

type Params = {
  merchantId?: number;
  receiverId?: number;
  creatorId: number;
  poId: number;
};

export const handleInvoiceCreationFromPO = ({
  merchantId,
  receiverId,
  creatorId,
  poId,
}: Params) => {
  if (merchantId === receiverId || merchantId === creatorId) {
    const pathname = ROUTES.APP.INVOICE.NEW;
    const query = {
      poId: poId.toString(),
    };
    Router.push({
      pathname,
      query,
    });
    return;
  } else {
    toast.error(
      'You cannot create a GRN from this purchase order. As you are the neither the creator or receiver',
      {
        id: 'cannot-create-grn-from-po',
      },
    );
    return;
  }
};
export const handleGRNCreationFromPO = ({
  merchantId,
  receiverId,
  creatorId,
  poId,
}: Params) => {
  if (merchantId === receiverId || merchantId === creatorId) {
    const pathname = ROUTES.APP.GRN.NEW;
    const query = {
      poId: poId.toString(),
    };
    Router.push({
      pathname,
      query,
    });
    return;
  } else {
    toast.error(
      'You cannot create a GRN from this purchase order. As you are the neither the creator or receiver',
      {
        id: 'cannot-create-grn-from-po',
      },
    );
    return;
  }
};
export const handleRemittanceCreationFromPO = ({
  merchantId,
  receiverId,
  creatorId,
  poId,
}: Params) => {
  if (merchantId === receiverId || merchantId === creatorId) {
    const pathname = ROUTES.APP.REMITTANCE_ADVICE.NEW;
    const query = {
      poId: poId.toString(),
    };
    Router.push({
      pathname,
      query,
    });
    return;
  } else {
    toast.error(
      'You cannot create a Remittance from this purchase order. As you are the neither the creator or receiver',
      {
        id: 'cannot-create-grn-from-po',
      },
    );
    return;
  }
};
