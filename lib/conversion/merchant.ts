import { Customer } from 'types/customer.type';
import { Merchant } from 'types/merchant';
import { Supplier } from 'types/supplier.type';

export const customerToMerchant = (customer: Customer): Merchant => {
  const result: Merchant = {
    id: customer.id,
    name: customer.name,
    uen: '',
    industry: customer.industry,
    country: customer.country ?? '',
    billingAddress: customer.billingAddress,
    shippingAddress: customer.shippingAddress,
    contactPersonName: customer.contactPersonName,
    contactPersonEmail: customer.contactPersonEmail,
    contactPersonMobile: customer.contactPersonEmail,
  };

  return result;
};
export const supplierToMerchant = (supplier: Supplier): Merchant => {
  const result: Merchant = {
    id: supplier.id,
    name: supplier.name,
    uen: '',
    industry: supplier.industry,
    country: supplier.country ?? '',
    billingAddress: supplier.billingAddress,
    shippingAddress: supplier.shippingAddress,
    contactPersonName: supplier.contactPersonName,
    contactPersonEmail: supplier.contactPersonEmail,
    contactPersonMobile: supplier.contactPersonEmail,
  };

  return result;
};
