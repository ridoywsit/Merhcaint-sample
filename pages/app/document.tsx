import { dehydrate } from '@tanstack/react-query';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';

import DocumentPage from 'components/DocumentPage';
import AppLayout from 'components/Layouts/AppLayout';
import Modal from 'components/Modal';
import { withSessionSsr } from 'lib/auth/session';
import { getDocuments } from 'services/documents';
import { defaultQueryClient } from 'services/util';
import { ROUTES } from 'utils/routes';

const DocumentMainPage = () => {
  const [showPreviewDocumentsModal, setShowPreviewDocumentsModal] =
    React.useState(false);
  return <DocumentPage />;
};

DocumentMainPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout title="Document">{page}</AppLayout>;
};

export default DocumentMainPage;
