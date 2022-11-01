import axios from 'axios';

import { API_URL } from 'environment';
import { PurchaseOrder } from 'types/purchaseOrder.type';

type GetPurchaseOrderByIdInput = {
  token: string;
  id: number;
};
export const getPurchaseOrderById = ({
  id,
  token,
}: GetPurchaseOrderByIdInput) => {
  return {
    api() {
      return axios
        .get<PurchaseOrder>(`${API_URL}/documents/purchase-orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getPurchaseOrderById', id];
    },
  };
};

type UpdatePurchaseOrderByIdInput = {
  token: string;
  id: number;
};
export const updatePurchaseOrderById = ({
  id,
  token,
}: UpdatePurchaseOrderByIdInput) => {
  return {
    api(purchaseOrder: PurchaseOrder) {
      return axios
        .put<PurchaseOrder>(
          `${API_URL}/documents/purchase-orders/${id}`,
          purchaseOrder,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['updatePurchaseOrderById', id];
    },
  };
};

type DeletePurchaseOrderByIdInput = {
  token: string;
  id: number;
};

export const deletePurchaseOrderById = ({
  token,
  id,
}: DeletePurchaseOrderByIdInput) => {
  return {
    api() {
      return axios
        .delete(`${API_URL}/documents/purchase-orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deletePurchaseOrderById', id];
    },
  };
};

type CreatePurchaseOrderInput = {
  token: string;
  purchaseOrder: PurchaseOrder;
};
export const createPurchaseOrder = () => {
  return {
    api({ token, purchaseOrder }: CreatePurchaseOrderInput) {
      return axios
        .post(`${API_URL}/documents/purchase-orders`, purchaseOrder, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['createPurchaseOrder'];
    },
  };
};

export const purchaseOrderAccept = (token: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/accept`,
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
export const purchaseOrderReject = (token: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/reject`,
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
export const purchaseOrderDispute = (token: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/dispute`,
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
export const purchaseOrderUnDispute = (token: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/un-dispute`,
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
export const purchaseOrderVoid = (token: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/void`,
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
export const purchaseOrderArchive = (token: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/archive`,
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
export const purchaseOrderSend = (token?: string) => {
  return {
    api(purchaseOrderId: number) {
      return axios
        .patch(
          `${API_URL}/documents/purchase-orders/${purchaseOrderId}/send`,
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
