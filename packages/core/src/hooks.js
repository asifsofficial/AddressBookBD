import { useState, useMemo } from 'react';
import { getDivisions, getDistrictsByDivision, getUpazilasByDistrict, getUnionsByUpazila, getVillagesByUnion } from './index';
export const useAddress = () => {
    const [divisionId, setDivisionId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [upazilaId, setUpazilaId] = useState('');
    const [unionId, setUnionId] = useState('');
    const [villageId, setVillageId] = useState('');
    const divisions = useMemo(() => getDivisions(), []);
    const districts = useMemo(() => divisionId ? getDistrictsByDivision(divisionId) : [], [divisionId]);
    const upazilas = useMemo(() => districtId ? getUpazilasByDistrict(districtId) : [], [districtId]);
    const unions = useMemo(() => upazilaId ? getUnionsByUpazila(upazilaId) : [], [upazilaId]);
    const villages = useMemo(() => unionId ? getVillagesByUnion(unionId) : [], [unionId]);
    const handleDivisionChange = (id) => {
        setDivisionId(id);
        setDistrictId('');
        setUpazilaId('');
        setUnionId('');
        setVillageId('');
    };
    const handleDistrictChange = (id) => {
        setDistrictId(id);
        setUpazilaId('');
        setUnionId('');
        setVillageId('');
    };
    const handleUpazilaChange = (id) => {
        setUpazilaId(id);
        setUnionId('');
        setVillageId('');
    };
    const handleUnionChange = (id) => {
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
        selectedDivision: divisions.find((d) => d.id === divisionId),
        selectedDistrict: districts.find((d) => d.id === districtId),
        selectedUpazila: upazilas.find((u) => u.id === upazilaId),
        selectedUnion: unions.find((u) => u.id === unionId),
        selectedVillage: villages.find((v) => v.id === villageId),
    };
};
