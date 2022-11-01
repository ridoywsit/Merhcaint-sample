import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import Pagination from 'components/Pagination';
import Status from 'components/Status';
import useUserHook from 'hooks/use-user.hook';
import { formateDateToString } from 'lib/shared/dateFormat';
import { setTimeZone } from 'lib/shared/getIsoDate';
import ExtractInvoiceStatus from 'public/svg/extractInvoicestatus.svg';
import { Document, GetDocumentsResponse } from 'services/documents';
import { grnSend } from 'services/grnService';
import { invoiceSend } from 'services/invoiceService';
import { purchaseOrderSend } from 'services/purchaseOrderService';
import { remittanceSend } from 'services/remittanceService';
import { getSendStatusText } from 'services/util';
import { Merchant } from 'types/merchant';
import { DocType } from 'types/util.type';
import { ROUTES } from 'utils/routes';

type Props = {
  documentResponse: GetDocumentsResponse;
  merchantDetails: Merchant;
  pageSizeInput: number;
  handlePageInput: (input: string) => void;
  handleSizeInput: (input: string) => void;
  setSelectRows: (rows: Document[]) => void;
  selectedRows: Document[];
};

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: Partial<any>, ref: any) => {
    const defaultRef = React.useRef<HTMLInputElement | undefined>();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      <>
        <input
          type="checkbox"
          className="rounded active:border-transparent border-slate-300 text-cyan-600 focus:ring-cyan-800"
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  },
);

const RawDocumentsTable = ({
  documentResponse,
  handlePageInput,
  handleSizeInput,
  setSelectRows,
  merchantDetails,
  pageSizeInput,
  selectedRows,
}: Props) => {
  const [testing, setTesting] = React.useState<Document[]>([]);
  const handleAdd = (row: Document) => {
    setTesting([...testing, row]);
  };
  const handleRemove = (id: number) => {
    const filterList = testing.filter((item) => item.id !== id);
    setTesting([...filterList]);
  };
  const router = useRouter();
  const { content: data, pageNo, totalCount, totalPages } = documentResponse;
  const { page, size, sort } = router.query as Record<
    string,
    string | undefined
  >;
  const { data: sessionData } = useUserHook();
  const { api: purchaseOrderSendApi } = purchaseOrderSend(sessionData?.token);
  const { api: grnSendApi } = grnSend(sessionData?.token);
  const { api: invoiceSendApi } = invoiceSend(sessionData?.token);
  const { api: remittanceSendApi } = remittanceSend(sessionData?.token);
  const queryClient = useQueryClient();
  const { mutateAsync: purchaseOrderSendMutateAsync } = useMutation(
    purchaseOrderSendApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
  const { mutateAsync: grnSendMutateAsync } = useMutation(grnSendApi, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { mutateAsync: invoiceSendMutateAsync } = useMutation(invoiceSendApi, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { mutateAsync: remittanceSendMutateAsync } = useMutation(
    remittanceSendApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

  const handleSend = React.useCallback(
    (docType: DocType, id: number) => {
      switch (docType) {
        case 'PURCHASE_ORDER':
          toast.promise(purchaseOrderSendMutateAsync(id), {
            loading: 'Sending purchase order',
            success: 'Successfully sent purchase order',
            error: 'Error sending purchase order',
          });
          break;
        case 'GOOD_RECEIVED_NOTE':
          toast.promise(grnSendMutateAsync(id), {
            loading: 'Sending grn',
            success: 'Successfully sent grn',
            error: 'Error sending grn',
          });
          break;
        case 'REMITTANCE_ADVICE':
          toast.promise(remittanceSendMutateAsync(id), {
            loading: 'Sending remittance advice',
            success: 'Successfully sent remittance advice',
            error: 'Error sending remittance advice',
          });
          break;
        case 'INVOICE':
          toast.promise(invoiceSendMutateAsync(id), {
            loading: 'Sending invoice',
            success: 'Successfully sent invoice',
            error: 'Error sending invoice',
          });
          break;

        default:
          break;
      }
    },
    [
      grnSendMutateAsync,
      invoiceSendMutateAsync,
      purchaseOrderSendMutateAsync,
      remittanceSendMutateAsync,
    ],
  );

  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        id: 'select',
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div>
              <IndeterminateCheckbox
                {...{
                  // checked: selectedDocuments.find(
                  //   (item) => item.id === row.original.id,
                  // ),
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            </div>
          );
        },
      },
      {
        header: 'Document No.',
        accessorKey: 'documentNo',

        cell: (cellProps) => {
          const { row } = cellProps;
          const handleRowClick = () => {
            const document = row.original;
            switch (document.docType) {
              case 'PURCHASE_ORDER': {
                if (document.docStatus === 'DRAFT') {
                  window.open(
                    ROUTES.APP.PURCHASE_ORDER.DRAFT.EDIT(String(document.id)),
                    '_blank',
                  );
                  return;
                }
                window.open(
                  ROUTES.APP.PURCHASE_ORDER.VIEW(String(document.id)),
                  '_blank',
                );
                return;
              }

              case 'GOOD_RECEIVED_NOTE': {
                if (document.docStatus === 'DRAFT') {
                  window.open(
                    ROUTES.APP.GRN.DRAFT.EDIT(String(document.id)),
                    '_blank',
                  );
                  return;
                }
                window.open(ROUTES.APP.GRN.VIEW(String(document.id)), '_blank');
                return;
              }

              case 'INVOICE': {
                if (document.docStatus === 'DRAFT') {
                  window.open(
                    ROUTES.APP.INVOICE.DRAFT.EDIT(String(document.id)),
                    '_blank',
                  );
                  return;
                }
                if (document.docStatus === 'EXTRACTED') {
                  window.open(
                    ROUTES.APP.INVOICE.EXTRACTED.VIEW(String(document.id)),
                    '_blank',
                  );
                  return;
                }
                window.open(
                  ROUTES.APP.INVOICE.VIEW(String(document.id)),
                  '_blank',
                );
                return;
              }

              case 'REMITTANCE_ADVICE': {
                if (document.docStatus === 'DRAFT') {
                  window.open(
                    ROUTES.APP.REMITTANCE_ADVICE.DRAFT.EDIT(
                      String(document.id),
                    ),
                    '_blank',
                  );
                  return;
                }
                window.open(
                  ROUTES.APP.REMITTANCE_ADVICE.VIEW(String(document.id)),
                  '_blank',
                );
                return;
              }

              default:
                break;
            }
          };
          return (
            <button onClick={handleRowClick} className="" formTarget="_blank">
              {row.original.documentNo == null || row.original.documentNo === ''
                ? 'No Document No Provided'
                : row.original.documentNo}
            </button>
          );
        },
      },
      {
        header: 'Document Type',
        accessorKey: 'docType',
        cell: (rows) => {
          const { docStatus } = rows.row.original;
          return (
            <div className="flex items-center gap-1">
              <span className="font-normal capitalize ">
                {rows.row.original.docType.split('_').join(' ').toLowerCase()}
              </span>
              {docStatus === 'EXTRACTED' ? <ExtractInvoiceStatus /> : null}
            </div>
          );
        },
      },
      {
        header: 'Company Name',
        accessorKey: 'companyName',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
      },
      {
        header: 'Date',
        accessorKey: 'issueDateTime',
        cell: (cellProps) => {
          const { row } = cellProps;
          const date =
            row.original.issueDateTime == null
              ? null
              : formateDateToString(
                  new Date(setTimeZone(row.original.issueDateTime)),
                );

          return (
            <div className="flex items-center">
              <span className="">{date ? date : null}</span>
            </div>
          );
        },
      },
      {
        header: 'Status',
        cell: (rows) => {
          const docStatus = rows.row.original.statusToString;
          const docType = rows.row.original.docType;
          const currentUser =
            rows.row.original.creatorId != null &&
            rows.row.original.creatorId === merchantDetails.id
              ? 'creator'
              : 'receiver';
          const text = getSendStatusText({
            docType,
            docStatus: docStatus as any,
            user: currentUser,
          });

          if (text == null) return text;

          return <Status status={docStatus} />;
        },
      },
      {
        header: 'Action',
        id: 'action',
        cell: ({ row }) => {
          const { receiverId, docStatus, id, docType, onBehalfId, supplierId } =
            row.original;

          if (
            docType !== 'INVOICE' &&
            docStatus === 'SAVED' &&
            supplierId != null
          ) {
            return (
              <button
                type="button"
                className="p-1 font-semibold uppercase text-merchaint-teal-base"
                onClick={() => {
                  if (id == null) {
                    toast.error(
                      'Error accepting invitation. Invitation id not found',
                      {
                        id: 'accepting-invitation',
                      },
                    );
                    return;
                  }

                  handleSend(docType, id);
                }}
              >
                Send
              </button>
            );
          } else if (
            docType === 'INVOICE' &&
            docStatus === 'SAVED' &&
            onBehalfId == null
          )
            return (
              <button
                type="button"
                className="p-1 font-semibold uppercase text-merchaint-teal-base"
                onClick={() => {
                  if (id == null) {
                    toast.error(
                      'Error accepting invitation. Invitation id not found',
                      {
                        id: 'accepting-invitation',
                      },
                    );
                    return;
                  }

                  handleSend(docType, id);
                }}
              >
                Send
              </button>
            );
          else return <div />;
        },
      },
    ],
    [merchantDetails.id, handleSend],
  );
  const tableData = React.useMemo(() => data, [data]);
  const pageList = new Array(totalPages).fill(0).map((_, index) => index + 1);
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugAll: process.env.NODE_ENV === 'development',
  });

  React.useEffect(() => {
    setSelectRows(testing);
  }, [setSelectRows, testing]);

  React.useEffect(() => {
    if (pageNo > pageList.length - 1) {
      handlePageInput(String(pageList.length - 1));
    }
    setRowSelection({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageList.length, pageNo]);

  const handleRowClick = (document: Document) => {
    switch (document.docType) {
      case 'PURCHASE_ORDER': {
        if (document.docStatus === 'DRAFT') {
          window.open(
            ROUTES.APP.PURCHASE_ORDER.DRAFT.EDIT(String(document.id)),
            '_blank',
          );
          return;
        }
        window.open(
          ROUTES.APP.PURCHASE_ORDER.VIEW(String(document.id)),
          '_blank',
        );
        return;
      }

      case 'GOOD_RECEIVED_NOTE': {
        if (document.docStatus === 'DRAFT') {
          window.open(ROUTES.APP.GRN.DRAFT.EDIT(String(document.id)), '_blank');
          return;
        }
        window.open(ROUTES.APP.GRN.VIEW(String(document.id)), '_blank');
        return;
      }

      case 'INVOICE': {
        if (document.docStatus === 'DRAFT') {
          window.open(
            ROUTES.APP.INVOICE.DRAFT.EDIT(String(document.id)),
            '_blank',
          );
          return;
        }
        if (document.docStatus === 'EXTRACTED') {
          window.open(
            ROUTES.APP.INVOICE.EXTRACTED.VIEW(String(document.id)),
            '_blank',
          );
          return;
        }
        window.open(ROUTES.APP.INVOICE.VIEW(String(document.id)), '_blank');
        return;
      }

      case 'REMITTANCE_ADVICE': {
        if (document.docStatus === 'DRAFT') {
          window.open(
            ROUTES.APP.REMITTANCE_ADVICE.DRAFT.EDIT(String(document.id)),
            '_blank',
          );
          return;
        }
        window.open(
          ROUTES.APP.REMITTANCE_ADVICE.VIEW(String(document.id)),
          '_blank',
        );
        return;
      }

      default:
        break;
    }
  };

  return (
    <>
      <div className="table__container__v2">
        <table className="table__network">
          <thead>
            <tr>
              <th className="capitalize">Action</th>
              <th className="capitalize">Document No.</th>
              <th className="capitalize">Document Type</th>
              <th className="capitalize">Company Name</th>
              <th className="capitalize">Amount</th>
              <th className="capitalize">Date</th>
              <th className="capitalize">Status</th>
              <th className="capitalize">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    checked={
                      selectedRows.find((item) => item.id === row.id)
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleAdd(row);
                      } else {
                        handleRemove(row.id);
                      }
                    }}
                    type="checkbox"
                    className="rounded active:border-transparent border-slate-300 text-cyan-600 focus:ring-cyan-800"
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleRowClick(row)}
                    className=""
                    formTarget="_blank"
                  >
                    {row.documentNo == null || row.documentNo === ''
                      ? 'No Document No Provided'
                      : row.documentNo}
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <span className="font-normal capitalize ">
                      {row.docType.split('_').join(' ').toLowerCase()}
                    </span>
                    {row.docStatus === 'EXTRACTED' ? (
                      <ExtractInvoiceStatus />
                    ) : null}
                  </div>
                </td>
                <td>{row.companyName}</td>
                <td>{row.amount}</td>
                <td>
                  {row?.issueDateTime === null
                    ? null
                    : formateDateToString(
                        new Date(setTimeZone(row?.issueDateTime)),
                      )}
                </td>
                <td>
                  <Status status={row.statusToString} />
                </td>
                <td>
                  {row.docType !== 'INVOICE' &&
                  row.docStatus === 'SAVED' &&
                  row.supplierId != null ? (
                    <button
                      type="button"
                      className="p-1 font-semibold uppercase text-merchaint-teal-base"
                      onClick={() => {
                        if (row.id == null) {
                          toast.error(
                            'Error accepting invitation. Invitation id not found',
                            {
                              id: 'accepting-invitation',
                            },
                          );
                          return;
                        }

                        handleSend(row.docType, row.id);
                      }}
                    >
                      Send
                    </button>
                  ) : row.docType === 'INVOICE' &&
                    row.docStatus === 'SAVED' &&
                    row.onBehalfId == null ? (
                    <button
                      type="button"
                      className="p-1 font-semibold uppercase text-merchaint-teal-base"
                      onClick={() => {
                        if (row.id == null) {
                          toast.error(
                            'Error accepting invitation. Invitation id not found',
                            {
                              id: 'accepting-invitation',
                            },
                          );
                          return;
                        }

                        handleSend(row.docType, row.id);
                      }}
                    >
                      Send
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-4 mt-6 border-t border-slate-300">
        <div className="flex items-center gap-2">
          <p>Records to display:</p>

          <div className="dropdown-container">
            <select
              className="py-0.5 cursor-pointer pl-2 pr-10 text-gray-600 bg-white border border-gray-300 rounded appearance-none hover:border-gray-400 focus:outline-none"
              id="documentToSHow"
              name="documentToSHow"
              title="documentToSHow"
              onChange={(e) => {
                handleSizeInput(e.target.value);
              }}
              defaultValue={size}
            >
              {[10, 20, 30, 40, 50].map((pageSizeSelect) => (
                <option key={pageSizeSelect} value={pageSizeSelect}>
                  {pageSizeSelect}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pagination-container">
          <section>
            <Pagination
              totalItems={documentResponse.totalCount}
              currentPage={documentResponse.pageNo}
              itemsPerPage={pageSizeInput}
              disableInitialCallback={false}
              onPageChange={(val) => handlePageInput(String(val))}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default RawDocumentsTable;
