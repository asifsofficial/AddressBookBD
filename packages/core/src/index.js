import divisionsData from './data/divisions.json';
import districtsData from './data/districts.json';
import upazilasData from './data/upazilas.json';
import unionsData from './data/unions.json';
import postcodesData from './data/postcodes.json';
import villagesData from './data/villages.json';
export * from './types';
export * from './hooks';
const divisions = divisionsData;
const districts = districtsData;
const upazilas = upazilasData;
const unions = unionsData;
const postcodes = postcodesData;
const villages = villagesData;
export const getDivisions = () => divisions;
export const getDivisionById = (id) => divisions.find(d => d.id === id);
export const getDistricts = () => districts;
export const getDistrictsByDivision = (divisionId) => districts.filter(d => d.division_id === divisionId);
export const getUpazilas = () => upazilas;
export const getUpazilasByDistrict = (districtId) => upazilas.filter(u => u.district_id === districtId);
export const getUnions = () => unions;
export const getUnionsByUpazila = (upazilaId) => unions.filter(u => u.upazilla_id === upazilaId);
export const getVillages = () => villages;
export const getVillagesByUnion = (unionId) => villages.filter(v => v.union_id === unionId);
export const getPostcodes = () => postcodes;
export const getPostcodesByDistrict = (districtName) => postcodes.filter(p => p.district.toLowerCase().includes(districtName.toLowerCase()));
export const search = (query) => {
    const q = query.toLowerCase();
    const results = [];
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
