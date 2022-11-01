export type roles = Role[];

export type RoleNames =
  | 'ROLE_MERCHANT_OWNER'
  | 'ROLE_MERCHANT_MEMBER'
  | 'ROLE_CLERK'
  | 'ROLE_APPROVAL';
export type PrivilegeNames =
  | 'ADD_NEW_MEMBER'
  | 'VIEW_MEMBER_PROFILE'
  | 'ALLOW_MEMBER_ACTION'
  | 'UPDATE_MERCHANT_INFO'
  | 'INVITE_MERCHANT'
  | 'ALLOW_NETWORK_ACTION'
  | 'ADD_NEW_CUSTOMER'
  | 'ALLOW_CUSTOMER_ACTION'
  | 'ADD_NEW_SUPPLIER'
  | 'ALLOW_SUPPLIER_ACTION'
  | 'CREATE_DOCUMENT'
  | 'ALLOW_DOCUMENT_BASIC_ACTION'
  | 'CAN_REQUEST_APPROVAL_DOCUMENT'
  | 'CAN_APPROVE_DOCUMENT'
  | 'CAN_EXPORT_DOCUMENT';

export type Role = {
  id: string;
  name: RoleNames;
  privileges: Privilege[];
};

export type Privilege = {
  id: number;
  name: PrivilegeNames;
};

type HasRoleInput = {
  roles?: Role[];
  roleName: RoleNames;
};

export const hasRole = ({ roles, roleName }: HasRoleInput) => {
  if (roles == null) {
    return false;
  }
  return roles.some((role) => role.name === roleName);
};

type HasPrivilegeInput = {
  roles?: Role[];
  privilegeName: PrivilegeNames;
};

export const hasPrivilege = ({ roles, privilegeName }: HasPrivilegeInput) => {
  if (roles == null) {
    return false;
  }
  return roles.some((role) =>
    role.privileges.some((privilege) => privilege.name === privilegeName),
  );
};
