export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  INVITE: '/invite',
  onboarding: '/on-boarding',
  EXPIRED: '/expired',
  404: '/404',
  APP: {
    NOTIFICATION: '/app/notifications',
    HOME: '/app/dashboard',
    DOCUMENTS: '/app/document',
    NETWORK: {
      HOME: '/app/network',
      list: '/app/network/list',
      company: {
        HOME: (slug: string) => `/app/network/company/${slug}`,
      },
      SAVE_COMPANY: {
        CUSTOMER: {
          CREATE: '/app/network/save-company/customer/create',
          VIEW: (customerId: number) =>
            `/app/network/save-company/customer/view/${customerId}`,
          EDIT: (customerId: number) =>
            `/app/network/save-company/customer/${customerId}`,
        },
        SUPPLIER: {
          CREATE: '/app/network/save-company/supplier/create',
          VIEW: (supplierId: number) =>
            `/app/network/save-company/supplier/view/${supplierId}`,
          EDIT: (supplierId: number) =>
            `/app/network/save-company/supplier/${supplierId}`,
        },
      },
    },
    STORAGE: '/app/storage',
    STORE: '/app/store',
    SETTINGS: {
      HOME: '/app/settings',
      EDIT: '/app/settings/edit',
      USER: '/app/settings/users',
      ADDRESS_MANAGEMENT: '/app/settings/address-management',
      APPROVAL_POLICY: '/app/settings/approval-policy',
      USER_BY_ID: (userId: number) => `/app/settings/users/${userId}`,
    },
    PROFILE: {
      HOME: '/app/profile',
      EDIT_PROFILE: '/app/profile/edit',
      EDIT_PASSWORD: '/app/profile/edit-password',
    },
    GRN: {
      NEW: '/app/grn/new',
      DRAFT: {
        EDIT: (slug: string) => `/app/grn/draft/${slug}`,
      },
      VIEW: (slug: string) => `/app/grn/${slug}`,
    },
    INVOICE: {
      NEW: '/app/invoice/new',
      DRAFT: {
        EDIT: (slug: string) => `/app/invoice/draft/${slug}`,
      },
      VIEW: (slug: string) => `/app/invoice/${slug}`,
      EXTRACTED: {
        VIEW: (slug: string) => `/app/invoice/extracted/${slug}`,
        VIEW_EXTRACTED_INVOICE: (slug: string) =>
          `/app/invoice/extracted/view/${slug}`,
      },
    },
    PURCHASE_ORDER: {
      NEW: '/app/purchase-order/new',
      DRAFT: {
        EDIT: (slug: string) => `/app/purchase-order/draft/${slug}`,
      },
      VIEW: (slug: string) => `/app/purchase-order/${slug}`,
    },
    REMITTANCE_ADVICE: {
      NEW: '/app/remittance/new',
      DRAFT: {
        EDIT: (slug: string) => `/app/remittance/draft/${slug}`,
      },
      VIEW: (slug: string) => `/app/remittance/${slug}`,
    },
  },
} as const;
