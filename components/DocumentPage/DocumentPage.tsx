import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';
import { useClickAway } from 'react-use';

import Button from 'components/Button';
import ClientOnly from 'components/ClientOnly';
import DocumentsTable from 'components/DocumentsTable';
import Spacer from 'components/Spacer';
import useUserHook from 'hooks/use-user.hook';
import {
  handleGRNCreationFromPO,
  handleInvoiceCreationFromPO,
  handleRemittanceCreationFromPO,
} from 'lib/fromPOHelper';
import { getIsoDate } from 'lib/shared/getIsoDate';
import UploadSvg from 'public/svg/upload.svg';
import { Document, GetDocumentsResponse } from 'services/documents';
import { Merchant } from 'types/merchant';
import { hasPrivilege, hasRole } from 'types/roles';

import CreateDocMenu from './CreateDocMenu';

type Props = {
  token: string;
  merchantDetails: Merchant;
  showPreviewDocumentsModal: boolean;
  setShowPreviewDocumentsModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const DocumentPage = () => {
  const [selectedRows, setSelectedRows] = React.useState<Document[]>([]);
  const [pageInput, setPageInput] = React.useState<string | null>(null);
  const [sizeInput, setSizeInput] = React.useState<string>('10');
  const [timerId, setTimerId] = React.useState<null | NodeJS.Timeout>(null);
  const [showDateFilter, setShowDateFilter] = React.useState(false);
  const queryClient = useQueryClient();
  const ref = React.useRef<HTMLDivElement | null>(null);
  useClickAway(ref, () => {
    setShowDateFilter(false);
  });
  // ** Local State ** //

  const handleDateRange = (ranges: any) => {
    const { selection } = ranges;
    let fromDate =
      typeof selection.startDate === 'string'
        ? selection.startDate
        : getIsoDate(format(selection.startDate, 'yyyy-MM-dd'));
    let toDate =
      typeof selection.endDate === 'string'
        ? selection.endDate
        : getIsoDate(format(selection.endDate, 'yyyy-MM-dd'));
  };

  const handleDocTypeInput = (val: string | number) => {};

  const handleDocStatusInput = (val: string | number) => {};
  const handlePageInput = (input: string) => {
    setPageInput(input);
  };
  const handleSizeInput = (input: string) => {
    setSizeInput(input);
  };

  // **  Query ** //

  // **  Routing ** //

  const handleSelectRows = (row: Document) => {
    if (
      row != null &&
      row.docType !== 'PURCHASE_ORDER' &&
      row.docStatus === 'EXTRACTED'
    ) {
      toast(
        `Document creation from ${row.docStatus} ${row?.docType} not allowed`,
        {
          id: 'select-a-purchase-order',
        },
      );
      return;
    }
    setSelectedRows([...selectedRows, row]);
  };

  const handleApprovedAll = () => {};
  const handleExportAll = () => {};
  const handleRequestApprovedAll = () => {};

  const handleRemoveSelections = (id: number) => {
    const filterList = selectedRows.filter((item) => item.id !== id);
    setSelectedRows(filterList);
  };

  const handleInvoiceFromPO = () => {
    if (selectedRows.length === 0) {
      toast.error('Please select a document', {
        id: 'select-a-document',
      });
      return;
    }
    if (selectedRows.length > 1) {
      toast.error('Please select only one document', {
        id: 'select-only-one-document',
      });
      return;
    }

    const receiverId = selectedRows[0].receiverId;
    const creatorId = selectedRows[0].creatorId;
    const poId = selectedRows[0].id;
    handleInvoiceCreationFromPO({ receiverId, creatorId, poId });
  };
  const handleGRNeFromPO = () => {
    const receiverId = selectedRows[0].receiverId;
    const creatorId = selectedRows[0].creatorId;
    const poId = selectedRows[0].id;
    handleGRNCreationFromPO({ receiverId, creatorId, poId });
  };
  const handleRemittanceFromPO = () => {
    if (selectedRows.length === 0) {
      toast.error('Please select a document', {
        id: 'select-a-document',
      });
      return;
    }
    if (selectedRows.length > 1) {
      toast.error('Please select only one document', {
        id: 'select-only-one-document',
      });
      return;
    }
    if (selectedRows[0].docType !== 'PURCHASE_ORDER') {
      toast.error('Please select a purchase order', {
        id: 'select-a-purchase-order',
      });
      return;
    }

    const receiverId = selectedRows[0].receiverId;
    const creatorId = selectedRows[0].creatorId;
    const poId = selectedRows[0].id;
    handleRemittanceCreationFromPO({ receiverId, creatorId, poId });
  };

  // **  Routing ** //

  // ** Permission **
  const { data: userData } = useUserHook();
  const isMerchantOwner = React.useMemo(
    () =>
      hasRole({
        roles: userData?.roles,
        roleName: 'ROLE_MERCHANT_OWNER',
      }),
    [userData?.roles],
  );
  const isApproval = React.useMemo(
    () =>
      hasRole({
        roles: userData?.roles,
        roleName: 'ROLE_APPROVAL',
      }),
    [userData?.roles],
  );
  const canTakeAction = React.useMemo(
    () =>
      hasPrivilege({
        roles: userData?.roles,
        privilegeName: 'CREATE_DOCUMENT',
      }),
    [userData?.roles],
  );
  const canApproveAction = React.useMemo(
    () =>
      hasPrivilege({
        roles: userData?.roles,
        privilegeName: 'CAN_APPROVE_DOCUMENT',
      }),
    [userData?.roles],
  );
  const canExportAction = React.useMemo(
    () =>
      hasPrivilege({
        roles: userData?.roles,
        privilegeName: 'CAN_EXPORT_DOCUMENT',
      }),
    [userData?.roles],
  );

  const data: GetDocumentsResponse = {
    content: [
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
      {
        amount: 400,

        companyName: 'Interwater-S',
        creatorArchived: false,
        creatorId: 11,
        dispute: 0,
        docStatus: 'SAVED',
        docType: 'REMITTANCE_ADVICE',
        documentNo: 'RT24RA',
        id: 46,
        issueDateTime: '2022-10-28T08:26:00',
        onBehalfId: 4,
        receiverArchived: false,
        receiverId: 10,
        statusToString: 'SAVED',
        supplierId: 3,
        supplierName: 'Hello',
        version: 1,
      },
    ],
    pageNo: 0,
    totalCount: 12,
    totalPages: 10,
  };

  console.log(data.content);

  return (
    <ClientOnly>
      <div className="px-4 pt-6 m-12 bg-white rounded shadow pb-9">
        <div>
          <div className="flex gap-3">
            <input
              type="text"
              className="w-96 input__v2"
              placeholder="Search Document no./Company"
              onChange={() => {}}
            />
          </div>
          <Spacer axis="vertical" size={32} />
          <div className="">
            <div className="flex gap-5">
              <CreateDocMenu selectedRows={selectedRows} />
              <TooltipProvider>
                <TooltipRoot>
                  <TooltipTrigger>
                    <Button
                      onClick={() => {}}
                      type="button"
                      variant="secondary"
                    >
                      <UploadSvg className="w-4 h-4 mr-2 " />
                      Upload Invoice
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#2D333A] text-white text-xs p-3 rounded-lg">
                    Extract data from your scanned documents
                    <TooltipArrow className="fill-black" />
                  </TooltipContent>
                </TooltipRoot>
              </TooltipProvider>
            </div>
          </div>
          <Spacer axis="vertical" size={16} />
          <div className="">
            <DocumentsTable
              setSelectRows={handleSelectRows}
              documentResponse={data}
              handlePageInput={handlePageInput}
              pageSizeInput={Number(sizeInput)}
              handleSizeInput={handleSizeInput}
              handleRemove={handleRemoveSelections}
              isApproval={isApproval}
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default DocumentPage;
