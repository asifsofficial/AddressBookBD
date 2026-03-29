import * as react from 'react';

interface Division {
    id: string;
    name: string;
    bn_name: string;
    url: string;
}
interface District {
    id: string;
    division_id: string;
    name: string;
    bn_name: string;
    lat?: string;
    lon?: string;
    url: string;
}
interface Upazila {
    id: string;
    district_id: string;
    name: string;
    bn_name: string;
    url: string;
}
interface Union {
    id: string;
    upazilla_id: string;
    name: string;
    bn_name: string;
    url: string;
}
interface Postcode {
    postcode: string;
    division: string;
    district: string;
    upazila: string;
    suboffice: string;
    name_en: string;
    name_bn: string;
}
interface Village {
    id: string;
    union_id: string;
    name: string;
    bn_name: string;
}
type SearchResult = {
    type: 'division' | 'district' | 'upazila' | 'union' | 'postcode' | 'village';
    data: any;
};

declare const useAddress: () => {
    divisions: Division[];
    districts: District[];
    upazilas: Upazila[];
    unions: Union[];
    villages: Village[];
    divisionId: string;
    districtId: string;
    upazilaId: string;
    unionId: string;
    villageId: string;
    setDivisionId: (id: string) => void;
    setDistrictId: (id: string) => void;
    setUpazilaId: (id: string) => void;
    setUnionId: (id: string) => void;
    setVillageId: react.Dispatch<react.SetStateAction<string>>;
    selectedDivision: Division | undefined;
    selectedDistrict: District | undefined;
    selectedUpazila: Upazila | undefined;
    selectedUnion: Union | undefined;
    selectedVillage: Village | undefined;
};

declare const getDivisions: () => Division[];
declare const getDivisionById: (id: string) => Division | undefined;
declare const getDistricts: () => District[];
declare const getDistrictsByDivision: (divisionId: string) => District[];
declare const getUpazilas: () => Upazila[];
declare const getUpazilasByDistrict: (districtId: string) => Upazila[];
declare const getUnions: () => Union[];
declare const getUnionsByUpazila: (upazilaId: string) => Union[];
declare const getVillages: () => Village[];
declare const getVillagesByUnion: (unionId: string) => Village[];
declare const getPostcodes: () => Postcode[];
declare const getPostcodesByDistrict: (districtName: string) => Postcode[];
declare const search: (query: string) => SearchResult[];

export { type District, type Division, type Postcode, type SearchResult, type Union, type Upazila, type Village, getDistricts, getDistrictsByDivision, getDivisionById, getDivisions, getPostcodes, getPostcodesByDistrict, getUnions, getUnionsByUpazila, getUpazilas, getUpazilasByDistrict, getVillages, getVillagesByUnion, search, useAddress };
