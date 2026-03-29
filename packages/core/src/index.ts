import divisionsData from './data/divisions.json';
import districtsData from './data/districts.json';
import upazilasData from './data/upazilas.json';
import unionsData from './data/unions.json';
import postcodesData from './data/postcodes.json';
import villagesData from './data/villages.json';

import { 
  Division, 
  District, 
  Upazila, 
  Union, 
  Postcode, 
  Village,
  SearchResult 
} from './types';

export * from './types';
export * from './hooks';

const divisions = divisionsData as unknown as Division[];
const districts = districtsData as unknown as District[];
const upazilas = upazilasData as unknown as Upazila[];
const unions = unionsData as unknown as Union[];
const postcodes = postcodesData as unknown as Postcode[];
const villages = villagesData as unknown as Village[];

export const getDivisions = (): Division[] => divisions;
export const getDivisionById = (id: string): Division | undefined => 
  divisions.find(d => d.id === id);

export const getDistricts = (): District[] => districts;
export const getDistrictsByDivision = (divisionId: string): District[] => 
  districts.filter(d => d.division_id === divisionId);

export const getUpazilas = (): Upazila[] => upazilas;
export const getUpazilasByDistrict = (districtId: string): Upazila[] => 
  upazilas.filter(u => u.district_id === districtId);

export const getUnions = (): Union[] => unions;
export const getUnionsByUpazila = (upazilaId: string): Union[] => 
  unions.filter(u => u.upazilla_id === upazilaId);

export const getVillages = (): Village[] => villages;
export const getVillagesByUnion = (unionId: string): Village[] => 
  villages.filter(v => v.union_id === unionId);

export const getPostcodes = (): Postcode[] => postcodes;
export const getPostcodesByDistrict = (districtName: string): Postcode[] => 
  postcodes.filter(p => p.district.toLowerCase().includes(districtName.toLowerCase()));

export const search = (query: string): SearchResult[] => {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search divisions
  divisions.filter(d => d.name.toLowerCase().includes(q) || d.bn_name.includes(q))
    .forEach(d => results.push({ type: 'division', data: d }));

  // Search districts
  districts.filter(d => d.name.toLowerCase().includes(q) || d.bn_name.includes(q))
    .forEach(d => results.push({ type: 'district', data: d }));

  // Search upazilas
  upazilas.filter(u => u.name.toLowerCase().includes(q) || u.bn_name.includes(q))
    .forEach(u => results.push({ type: 'upazila', data: u }));

  // Search unions
  unions.filter(u => u.name.toLowerCase().includes(q) || u.bn_name.includes(q))
    .forEach(u => results.push({ type: 'union', data: u }));

  // Search postcodes
  postcodes.filter(p => p.postcode.includes(q) || p.name_en.toLowerCase().includes(q) || p.name_bn.includes(q))
    .forEach(p => results.push({ type: 'postcode', data: p }));

  // Search villages
  villages.filter(v => v.name.toLowerCase().includes(q) || v.bn_name.includes(q))
    .forEach(v => results.push({ type: 'village', data: v }));

  return results.slice(0, 20); // Limit results
};
