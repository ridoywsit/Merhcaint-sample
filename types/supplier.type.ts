import { components, operations } from 'generatedV2/server.type';

export type Supplier = components['schemas']['Supplier'];
export type SupplierSearch = {
  searchTxt: string;
  page: number;
  size: number;
  sort: 'asc' | 'desc';
};

export type SupplierSearchResponse =
  components['schemas']['CustomerOrSupplierResponseDto'];
export type SupplierSearchInput = Omit<
  operations['search_3']['parameters']['query'],
  'authUser'
>;
