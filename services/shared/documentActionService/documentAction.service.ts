import axios from 'axios';

import { API_URL } from 'environment';
import { Invoice } from 'types/invoice';
import { Merchant } from 'types/merchant';
import { Address, CurrencyCode, DocType } from 'types/util.type';

export type GetDocumentSummary = {
  token: string;
  type: DocType;
  documentId: number;
};

export type DocumentItem = {
  productCode?: string;
  name?: string;
  quantity?: number;
  unitCode?: string;
  amount?: number;
  grnStatus?: 'MATCH' | 'NOT MATCH';
  poStatus?: 'MATCH' | 'NOT MATCH';
};

export type GetDocumentSummaryResponse = {
  currency?: CurrencyCode;
  itemList?: DocumentItem[];
  totalAmount?: number;
  totalTaxAmount?: number;
  grandTotalAmount?: number;
};

export const getDocumentSummary = ({
  token,
  type,
  documentId,
}: GetDocumentSummary) => {
  return {
    api() {
      return axios
        .get<GetDocumentSummaryResponse>(
          `${API_URL}/documents/${type}/${documentId}/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getDocumentSummary', type, documentId];
    },
  };
};

export type GetDocumentMeta = {
  token: string;
  type: DocType;
  documentId: number;
};

export type GetDocumentMetaResponse = {
  po: number[];
  grn: number[];
  invoice: number[];
  ra: number[];
};

export const getDocumentMeta = ({
  token,
  type,
  documentId,
}: GetDocumentMeta) => {
  return {
    api() {
      return axios
        .get<GetDocumentMetaResponse>(
          `${API_URL}/documents/${type}/${documentId}/metadata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getDocumentMeta', type, documentId];
    },
  };
};

export type GetDocumentWithMatch = {
  token: string;
  type: DocType;
  documentId: number;
};

export type GetDocumentWithMatchResponse = Invoice & {
  itemList: DocumentItem[];
};
export const getDocumentWithMatch = ({
  token,
  type,
  documentId,
}: GetDocumentWithMatch) => {
  return {
    api() {
      return axios
        .get<GetDocumentWithMatchResponse>(
          `${API_URL}/documents/${type}/${documentId}/with-match`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getDocumentWithMatch', type, documentId];
    },
  };
};
