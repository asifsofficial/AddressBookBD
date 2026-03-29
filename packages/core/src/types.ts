export interface Division {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface Postcode {
  postcode: string;
  division: string;
  district: string;
  upazila: string;
  suboffice: string;
  name_en: string;
  name_bn: string;
}

export interface Village {
  id: string;
  union_id: string;
  name: string;
  bn_name: string;
}

export type SearchResult = {
  type: 'division' | 'district' | 'upazila' | 'union' | 'postcode' | 'village';
  data: any;
};
