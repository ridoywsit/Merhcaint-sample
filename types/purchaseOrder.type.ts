import { components } from 'generatedV2/server.type';

export type PurchaseOrderDocStatus =
  components['schemas']['PurchaseOrder']['docStatus'];

export const DOC_STATUS_LIST = [
  'DRAFT',
  'SAVED',
  'SENT',
  'RECEIVED',
  'EXTRACTED',
  'VOID',
  'ARCHIVED',
  'PENDING_APPROVAL',
  'APPROVED',
  'EXPORTED',
];

export const DOC_STATUS_LIST_FOR_DROPDOWN = DOC_STATUS_LIST.filter(
  (val) => val !== 'DELETED',
);

export const DOC_TYPE_LIST = [
  'PURCHASE_ORDER',
  'GOOD_RECEIVED_NOTE',
  'INVOICE',
  'REMITTANCE_ADVICE',
];

export type PurchaseOrderLineItem = components['schemas']['PurchaseOrderLine'];

export type PurchaseOrder = components['schemas']['PurchaseOrder'];
