import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { useInterval } from 'react-use';

import useUserHook from 'hooks/use-user.hook';
import { getInvoiceStatus } from 'services/invoiceService';
import { useInvoiceStore } from 'store/invoiceStore';

const InvoiceExtractionStatus = () => {
  const { data } = useUserHook();
  const extractionStatus = useInvoiceStore((state) => state.isExtracting);
  const queryClient = useQueryClient();
  const setIsExtractingFalse = useInvoiceStore(
    (state) => state.setIsExtractingFalse,
  );
  const { getKey: getStatusKey, api: getStatusApi } = getInvoiceStatus(
    data?.token,
  );

  const { data: invoiceExtractionData, refetch: refetchExtractionStatus } =
    useQuery(getStatusKey(), getStatusApi, {
      enabled: extractionStatus,
      onSuccess(data) {
        queryClient.invalidateQueries(['documents']);
        if (
          data.failed != null &&
          data.success != null &&
          data.failed + data.success > 0
        ) {
          if (data.success > 0) {
            toast.success(`${data.success} invoices extracted successfully`, {
              duration: 10000,
              id: 'success-toast-extraction',
            });
          }

          if (data.failed > 0) {
            toast.error(`${data.failed} invoices extraction failed`),
              {
                duration: 10000,
                id: 'error-toast-extraction-123',
              };
          }
        }
        if (data.left != null && data.left > 0) {
          if (data.left > 0) {
            toast(`${data.left} files are left to extract`, {
              duration: 10000,
              id: 'left-toast-extraction',
            });
          }
        }
      },
    });

  useInterval(
    () => {
      if (
        invoiceExtractionData?.left != null &&
        invoiceExtractionData.failed != null &&
        invoiceExtractionData.success != null &&
        invoiceExtractionData.failed +
          invoiceExtractionData.left +
          invoiceExtractionData.success ===
          0
      ) {
        setIsExtractingFalse();
      } else {
        refetchExtractionStatus();
      }
    },
    extractionStatus ? 10000 : null,
  );

  return (
    <>
      {/* {extractionStatus &&
      invoiceExtractionData?.failed != null &&
      invoiceExtractionData.success != null &&
      invoiceExtractionData.failed + invoiceExtractionData.success > 0 ? (
        <div className="flex gap-4">
          <Button variant="clear" className="text-green-800">
            Success: {invoiceExtractionData.success}
          </Button>
          <Button variant="clear" className="text-red-800">
            Failed: {invoiceExtractionData.failed}
          </Button>
        </div>
      ) : null}
      {extractionStatus &&
      invoiceExtractionData?.left != null &&
      invoiceExtractionData?.left > 0 ? (
        <div className="flex gap-4">
          <Button variant="clear" className="text-cyan-700">
            {invoiceExtractionData.left} files left to extract
          </Button>
        </div>
      ) : null} */}
    </>
  );
};

export default InvoiceExtractionStatus;
