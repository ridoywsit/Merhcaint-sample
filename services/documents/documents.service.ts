import axios from 'axios';

import { API_URL } from 'environment';
import { components, operations } from 'generatedV2/server.type';
import { DocType } from 'types/util.type';

export type DocumentSearchRequestPayload =
  components['schemas']['DocumentSearchRequest'];

export type GetDocumentsInput = {
  page?: string;
  size?: string;
  sort?: string;
  documentSearchRequest?: DocumentSearchRequestPayload;
  token: string;
};

type ValueOf<T> = T[keyof T];

const DOC_STATUS = [
  { id: 'ACCEPTED', value: 'ACCEPTED' },
  { id: 'APPROVED', value: 'APPROVED' },
  { id: 'EXTRACTED', value: 'EXTRACTED' },
  { id: 'DELETED', value: 'DELETED' },
  { id: 'DRAFT', value: 'DRAFT' },
  { id: 'VOID', value: 'VOID' },
  { id: 'REJECTED', value: 'REJECTED' },
  { id: 'SENT', value: 'SENT' },
  { id: 'SAVED', value: 'SAVED' },
  { id: 'RECEIVED', value: 'RECEIVED' },
] as const;
export type DocStatus = ValueOf<typeof DOC_STATUS[number]>;

export type Document = {
  id: number;
  version: number;
  documentNo: string;
  amount: number;
  issueDateTime: string;
  creatorId: number;
  onBehalfId: number;
  supplierId: number;
  receiverId?: number;
  supplierName?: string;
  companyName: string;
  creatorArchived: boolean;
  receiverArchived: boolean;
  docStatus: DocStatus;
  dispute: number;
  docType:
    | 'PURCHASE_ORDER'
    | 'GOOD_RECEIVED_NOTE'
    | 'INVOICE'
    | 'REMITTANCE_ADVICE';
  statusToString: DocStatus;
};
export type GetDocumentsResponse = {
  pageNo: number;
  totalCount: number;
  totalPages: number;
  content: Array<Document>;
};
export const getDocuments = ({
  page,
  size,
  sort,
  documentSearchRequest,
  token,
}: GetDocumentsInput) => {
  const finalPage = page ? page : '0';
  const finalSize = size ? size : '10';
  const finalSort = sort ? sort : 'asc';
  const params = new URLSearchParams({
    page: finalPage,
    size: finalSize,
    sort: finalSort,
  }).toString();
  const payload: DocumentSearchRequestPayload = {
    documentNo: documentSearchRequest?.documentNo
      ? documentSearchRequest.documentNo
      : '',
    docType: documentSearchRequest?.docType
      ? documentSearchRequest.docType
      : '',
    docStatus: documentSearchRequest?.docStatus
      ? documentSearchRequest.docStatus
      : '',
    dateFrom: documentSearchRequest?.dateFrom
      ? documentSearchRequest.dateFrom
      : '',
    dateTo: documentSearchRequest?.dateTo ? documentSearchRequest.dateTo : '',
    searchText: documentSearchRequest?.searchText
      ? documentSearchRequest.searchText
      : '',
  };
  return {
    api() {
      return axios
        .post<GetDocumentsResponse>(
          `${API_URL}/documents?${params}`,
          {
            ...payload,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      const page = finalPage ? finalPage : '0';
      const size = finalSize ? finalSize : '10';
      const sort = finalSort ? finalSort : 'asc';
      return [
        'documents',
        page,
        size,
        sort,
        {
          documentNo: documentSearchRequest?.documentNo ?? '',
          docType: documentSearchRequest?.docType ?? '',
          docStatus: documentSearchRequest?.docStatus ?? '',
          dateFrom: documentSearchRequest?.dateFrom ?? '',
          dateTo: documentSearchRequest?.dateTo ?? '',
          searchText: documentSearchRequest?.searchText ?? '',
        },
      ];
    },
  };
};

type FindDuplicateInput = Omit<
  operations['findDuplicateDocument']['parameters']['query'],
  'authUser'
> & {
  type: operations['findDuplicateDocument']['parameters']['path']['type'];
  token: string;
  creatorId: number;
};

export function findDuplicate(params: FindDuplicateInput) {
  return {
    api() {
      const httpParams = new URLSearchParams();
      httpParams.append('documentNo', params.documentNo);
      httpParams.append('creatorId', params.creatorId.toString());
      httpParams.append('type', params.type);

      return axios
        .get<boolean>(
          `${API_URL}/documents/${
            params.type
          }/find-duplicate?${httpParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${params.token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
  };
}
