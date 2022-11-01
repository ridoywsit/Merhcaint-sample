import axios from 'axios';

import { API_URL } from 'environment';
import { ExportRequest } from 'types/export.type';
import { ExtractedInvoice, Invoice } from 'types/invoice';

type GetInvoiceByIdInput = {
  token: string;
  id: number;
};
export const getInvoiceById = ({ id, token }: GetInvoiceByIdInput) => {
  return {
    api() {
      return axios
        .get<Invoice>(`${API_URL}/documents/invoices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getInvoiceById', id];
    },
  };
};
type GetExtractedInvoiceByIdInput = {
  token: string;
  id: number;
};
export const getExtractedInvoiceById = ({
  id,
  token,
}: GetExtractedInvoiceByIdInput) => {
  return {
    api() {
      return axios
        .get<ExtractedInvoice>(
          `${API_URL}/documents/extracted-invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getExtractedInvoiceById', id];
    },
  };
};

export const getGeneratedExtractedInvoiceById = ({
  id,
  token,
}: GetExtractedInvoiceByIdInput) => {
  return {
    api() {
      return axios
        .post<ExtractedInvoice>(
          `${API_URL}/documents/extracted-invoices/${id}/generate-invoice`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getGeneratedExtractedInvoiceById', id];
    },
  };
};

export type UpdateInvoiceByIdInput = {
  token: string;
  id: number;
};
export const updateInvoiceById = ({ id, token }: UpdateInvoiceByIdInput) => {
  return {
    api(invoice: Invoice) {
      return axios
        .put(`${API_URL}/documents/invoices/${id}`, invoice, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['updateInvoiceById', id];
    },
  };
};
type UpdateExtractedInvoiceByIdInput = {
  token: string;
  id: number;
};
export const updateExtractedInvoiceById = ({
  id,
  token,
}: UpdateExtractedInvoiceByIdInput) => {
  return {
    api(invoice: ExtractedInvoice) {
      return axios
        .put(`${API_URL}/documents/extracted-invoices/${id}`, invoice, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['updateInvoiceById', id];
    },
  };
};

type DeleteInvoiceByIdInput = {
  token: string;
  id: number;
};

export const deleteInvoiceById = ({ token, id }: DeleteInvoiceByIdInput) => {
  return {
    api() {
      return axios
        .delete(`${API_URL}/documents/invoices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteInvoiceById', id];
    },
  };
};

type CreateInvoiceInput = {
  token: string;
};
export const createInvoice = ({ token }: CreateInvoiceInput) => {
  return {
    api(invoice: Invoice) {
      return axios
        .post(`${API_URL}/documents/invoices`, invoice, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['createInvoice'];
    },
  };
};

type InvoiceExtractingStatus = {
  failed?: number;
  success?: number;
  left?: number;
};

export const getInvoiceStatus = (token?: string) => {
  return {
    api() {
      return axios
        .get<InvoiceExtractingStatus>(
          `${API_URL}/documents/extracted-invoices/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getInvoiceStatus'];
    },
  };
};

export const invoiceVoid = (token: string) => {
  return {
    api(invoiceId: number) {
      return axios
        .patch(`${API_URL}/documents/invoices/${invoiceId}/void`, undefined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
  };
};
export const invoiceDispute = (token: string) => {
  return {
    api(invoiceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/invoices/${invoiceId}/dispute`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
  };
};
export const invoiceUnDispute = (token: string) => {
  return {
    api(invoiceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/invoices/${invoiceId}/un-dispute`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
  };
};
export const invoiceArchive = (token: string) => {
  return {
    api(invoiceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/invoices/${invoiceId}/archive`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
  };
};
export const invoiceSend = (token?: string) => {
  return {
    api(invoiceId: number) {
      return axios
        .patch(`${API_URL}/documents/invoices/${invoiceId}/send`, undefined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
  };
};

export const sentRequestApproval = ({ id, token }: UpdateInvoiceByIdInput) => {
  return {
    api() {
      return axios
        .patch(
          `${API_URL}/documents/invoices/${id}/request-approval`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['sentRequestApproval', id];
    },
  };
};

export const approveInvoice = ({ id, token }: UpdateInvoiceByIdInput) => {
  return {
    api() {
      return axios
        .patch(
          `${API_URL}/documents/invoices/${id}/approve`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['sentApprove', id];
    },
  };
};
export const exportInvoice = ({ id, token }: UpdateInvoiceByIdInput) => {
  return {
    api(input: ExportRequest) {
      return axios
        .patch(`${API_URL}/documents/invoices/${id}/export`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['exportInvoice', id];
    },
  };
};

export const multipleInvoiceRequestForApproval = (token: string) => {
  return {
    api(ids: number[]) {
      return axios
        .patch(`${API_URL}/documents/invoices/bulk/request-for-approval`, ids, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['multipleInvoiceActions'];
    },
  };
};
export const multipleInvoiceApprove = (token: string) => {
  return {
    api(ids: number[]) {
      return axios
        .patch(`${API_URL}/documents/invoices/bulk/approve`, ids, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['multipleInvoiceApprove'];
    },
  };
};
export const multipleInvoiceExport = (token: string) => {
  return {
    api(ids: number[]) {
      return axios
        .patch(`${API_URL}/documents/invoices/bulk/export`, ids, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['multipleInvoiceExport'];
    },
  };
};
