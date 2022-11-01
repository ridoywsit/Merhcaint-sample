import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

import Button from 'components/Button';
import { withSessionSsr } from 'lib/auth/session';
import { ROUTES } from 'utils/routes';

import CreateDocModal from '../../components/CreateDocModal';
import AppLayout from '../../components/Layouts/AppLayout';
import Modal from '../../components/Modal';
import UploadInvoiceModal from '../../components/UploadInvoiceModal';
import NewDocument from '../../public/svg/createNewDocument.svg';
import UploadInvoice from '../../public/svg/uploadInvoice.svg';

const Dashboard = () => {
  const [showCreateDocModal, setShowCreateDocModal] = React.useState(false);
  const [showUploadInvoiceModal, setShowUploadInvoiceModal] =
    React.useState(false);
  const openCreateDocModal = () => setShowCreateDocModal(true);
  const openUploadInvoiceModal = () => setShowUploadInvoiceModal(true);

  return (
    <div>
      <div className="p-12">
        <div className="pb-10">
          <p className="text-body-lg">
            Hello! Start sending E-documents here or upload your scanned and PDF
            invoices below
          </p>
        </div>

        <div className="flex gap-10">
          <div className="w-[440px] bg-white p-7 rounded-[20px] space-y-4">
            <NewDocument />
            <p className="text-header-3--medium text-merchaint-text-black-800">
              Create new document
            </p>
            <Button
              type="button"
              variant="primary"
              onClick={openCreateDocModal}
              className="flex items-center gap-2"
            >
              <FiPlus className=" h-[1.125rem] w-[1.125rem]" />
              Create document
            </Button>
          </div>
          <div className="w-[440px] bg-white p-7 rounded-[20px] space-y-4">
            <UploadInvoice />
            <p className="text-header-3--medium text-merchaint-text-black-800">
              Upload invoice
            </p>
            <Button
              type="button"
              variant="primary"
              onClick={openUploadInvoiceModal}
              className="flex items-center gap-2"
            >
              <FiPlus className=" h-[1.125rem] w-[1.125rem]" />
              Upload Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout title="Dashboard">{page}</AppLayout>;
};

export default Dashboard;
