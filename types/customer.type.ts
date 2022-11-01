import { components } from 'generatedV2/server.type';

import { operations } from './../generatedV2/server.type';

export type Customer = components['schemas']['Customer'];
export type CustomerSearch = {
  searchTxt: string;
  page: number;
  size: number;
  sort: 'asc' | 'desc';
};

export type CustomerSearchResponse =
  components['schemas']['CustomerOrSupplierResponseDto'];
export type CustomerSearchInput = Omit<
  operations['search_6']['parameters']['query'],
  'authUser'
>;
