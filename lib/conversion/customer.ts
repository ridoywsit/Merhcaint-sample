import { Customer } from 'types/customer.type';
import { Merchant } from 'types/merchant';

export const merchantToCustomer = (merchant: Merchant): Customer => {
  const result: Customer = {
    id: merchant.id,
    name: merchant.name,
    email: '',
    country: merchant.country ?? '',
    industry: merchant.industry,
    billingAddress: merchant.billingAddress,
    shippingAddress: merchant.shippingAddress,
    contactPersonName: merchant.contactPersonName,
    contactPersonEmail: merchant.contactPersonEmail,
    contactPersonMobile: merchant.contactPersonEmail,
  };

  return result;
};
