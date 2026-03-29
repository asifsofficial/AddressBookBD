import { describe, it, expect } from 'vitest';
import { getDivisions, getDistrictsByDivision, search } from '../index';
describe('AddressBookBD Core', () => {
    it('should return all 8 divisions', () => {
        const divisions = getDivisions();
        console.log('Divisions length:', divisions.length);
        console.log('Divisions:', JSON.stringify(divisions, null, 2));
        expect(divisions.length).toBe(8);
        expect(divisions.some(d => d.name === 'Dhaka')).toBe(true);
    });
    it('should return districts for a division', () => {
        const dhakaDivId = '6'; // Dhaka's ID in nuhil data is usually different, let's check
        const divisions = getDivisions();
        const dhaka = divisions.find(d => d.name === 'Dhaka');
        if (dhaka) {
            const districts = getDistrictsByDivision(dhaka.id);
            expect(districts.length).toBeGreaterThan(0);
            expect(districts.some(d => d.name === 'Dhaka')).toBe(true);
        }
    });
    it('should search for locations', () => {
        const results = search('Dhaka');
        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.type === 'division')).toBe(true);
    });
    it('should search in Bengali', () => {
        const results = search('ঢাকা');
        expect(results.length).toBeGreaterThan(0);
    });
});
