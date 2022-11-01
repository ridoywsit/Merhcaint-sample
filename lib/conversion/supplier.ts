import { Merchant } from 'types/merchant';
import { Supplier } from 'types/supplier.type';

export const merchantToSupplier = (merchant: Merchant): Supplier => {
  const result: Supplier = {
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
