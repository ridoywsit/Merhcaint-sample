export type SendInvitationInput = {
  companyName: string;
  email: string;
};

export type Data = {
  error: boolean;
  errors: any[];
  rows: SendInvitationInput[];
  message?: string;
};
