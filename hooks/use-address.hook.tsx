import { Address } from 'types/util.type';

const useAddressString = (address: Address | undefined) => {
  let data: Address | undefined;
  if (address?.id == null) {
    data = address;
  } else {
    const { id, country, ...addressWithoutIdAndCountry } = address;
    let updatedCountry = country?.split('_').join(' ');
    data = {
      ...(addressWithoutIdAndCountry.street
        ? { street: addressWithoutIdAndCountry.street }
        : undefined),
      ...(addressWithoutIdAndCountry.additionalStreet
        ? { additionalStreet: addressWithoutIdAndCountry.additionalStreet }
        : undefined),
      ...(addressWithoutIdAndCountry.city
        ? { city: addressWithoutIdAndCountry.city }
        : undefined),

      ...(addressWithoutIdAndCountry?.zip
        ? { zip: addressWithoutIdAndCountry.zip }
        : undefined),
      ...(country ? { country: updatedCountry } : {}),
    };
  }

  return Object.values(data || {})
    .filter((val) => {
      return val !== '' && val != null;
    })
    .join(', ');
};

export default useAddressString;
