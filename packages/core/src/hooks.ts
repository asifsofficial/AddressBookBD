import { useState, useMemo } from 'react';
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  getVillagesByUnion,
  Division,
  District,
  Upazila,
  Union,
  Village
} from './index';

export const useAddress = () => {
  const [divisionId, setDivisionId] = useState<string>('');
  const [districtId, setDistrictId] = useState<string>('');
  const [upazilaId, setUpazilaId] = useState<string>('');
  const [unionId, setUnionId] = useState<string>('');
  const [villageId, setVillageId] = useState<string>('');

  const divisions = useMemo(() => getDivisions(), []);
  const districts = useMemo(() => divisionId ? getDistrictsByDivision(divisionId) : [], [divisionId]);
  const upazilas = useMemo(() => districtId ? getUpazilasByDistrict(districtId) : [], [districtId]);
  const unions = useMemo(() => upazilaId ? getUnionsByUpazila(upazilaId) : [], [upazilaId]);
  const villages = useMemo(() => unionId ? getVillagesByUnion(unionId) : [], [unionId]);

  const handleDivisionChange = (id: string) => {
    setDivisionId(id);
    setDistrictId('');
    setUpazilaId('');
    setUnionId('');
    setVillageId('');
  };

  const handleDistrictChange = (id: string) => {
    setDistrictId(id);
    setUpazilaId('');
    setUnionId('');
    setVillageId('');
  };

  const handleUpazilaChange = (id: string) => {
    setUpazilaId(id);
    setUnionId('');
    setVillageId('');
  };

  const handleUnionChange = (id: string) => {
    setUnionId(id);
    setVillageId('');
  };

  return {
    // Data
    divisions,
    districts,
    upazilas,
    unions,
    villages,
    
    // IDs
    divisionId,
    districtId,
    upazilaId,
    unionId,
    villageId,
    
    // Handlers
    setDivisionId: handleDivisionChange,
    setDistrictId: handleDistrictChange,
    setUpazilaId: handleUpazilaChange,
    setUnionId: handleUnionChange,
    setVillageId,
    
    // Selected Objects
    selectedDivision: divisions.find((d: Division) => d.id === divisionId),
    selectedDistrict: districts.find((d: District) => d.id === districtId),
    selectedUpazila: upazilas.find((u: Upazila) => u.id === upazilaId),
    selectedUnion: unions.find((u: Union) => u.id === unionId),
    selectedVillage: villages.find((v: Village) => v.id === villageId),
  };
};
