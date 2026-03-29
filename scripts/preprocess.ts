import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(__dirname, '../packages/core/src/data');
const TMP_DIR = '/tmp';

function cleanNuhilData(filename: string) {
    const filePath = path.join(DATA_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    try {
        const content = JSON.parse(raw);
        const tableObj = content.find((obj: any) => obj.type === 'table');
        if (tableObj && tableObj.data) {
            return tableObj.data;
        }
    } catch (e) {
        console.error(`Failed to parse ${filename}`, e);
    }
    return [];
}

function processPostCodes() {
    const filePath = path.join(TMP_DIR, 'postCodes.js');
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find the first '{' and the last '}'
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start === -1 || end === -1) return [];

    const objStr = content.substring(start, end + 1);

    try {
        const postCodesObj = eval(`(${objStr})`);
        const postCodesArr = Object.entries(postCodesObj).map(([code, data]: [string, any]) => {
            if (!data || !data.en) return null;
            return {
                postcode: code.trim(),
                division: (data.en.division || '').trim(),
                district: (data.en.district || '').trim(),
                upazila: (data.en.thana || '').trim(),
                suboffice: (data.en.suboffice || '').trim(),
                name_en: (data.en.suboffice || '').trim(),
                name_bn: data.bn ? (data.bn.suboffice || '').trim() : (data.en.suboffice || '').trim()
            };
        }).filter(item => item !== null);
        return postCodesArr;
    } catch (e) {
        console.error('Failed to parse postCodes', e);
        return [];
    }
}

async function main() {
    console.log('Starting data preprocessing...');

    const divisions = cleanNuhilData('divisions.json');
    const districts = cleanNuhilData('districts.json');
    const upazilas = cleanNuhilData('upazilas.json');
    const unions = cleanNuhilData('unions.json');
    const postcodes = processPostCodes();

    // Save cleaned data
    fs.writeFileSync(path.join(DATA_DIR, 'divisions.json'), JSON.stringify(divisions, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'districts.json'), JSON.stringify(districts, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'upazilas.json'), JSON.stringify(upazilas, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'unions.json'), JSON.stringify(unions, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'postcodes.json'), JSON.stringify(postcodes, null, 2));

    console.log('Data preprocessing complete!');
}

main();
