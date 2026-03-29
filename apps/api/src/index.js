import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { apiReference } from '@scalar/hono-api-reference';
import { getDivisions, getDivisionById, getDistricts, getDistrictsByDivision, getUpazilas, getUpazilasByDistrict, getUnions, getUnionsByUpazila, getVillages, getVillagesByUnion, getPostcodes, search } from '@address-book-bd/core';
const app = new OpenAPIHono();
app.use('*', logger());
app.use('*', cors());
// Helper for pagination
const paginate = (items, page = 1, limit = 20) => {
    const start = (page - 1) * limit;
    const end = page * limit;
    return {
        data: items.slice(start, end),
        total: items.length,
        page,
        limit,
        totalPages: Math.ceil(items.length / limit)
    };
};
// --- API Documentation ---
app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'AddressBookBD API',
        description: 'A comprehensive API for Bangladeshi administrative data.',
    },
});
app.get('/docs', apiReference({
    spec: {
        url: '/openapi.json',
    },
    theme: 'purple',
})); // Using 'as any' as a temporary workaround for strict type issues in Scalar's Hono wrapper
// --- Routes ---
app.get('/', (c) => {
    return c.json({
        message: 'Welcome to AddressBookBD API',
        docs: '/docs',
        endpoints: [
            '/divisions',
            '/districts',
            '/upazilas',
            '/unions',
            '/villages',
            '/postcodes',
            '/search?q=query'
        ]
    });
});
// Divisions
app.get('/divisions', (c) => c.json(getDivisions()));
app.get('/divisions/:id', (c) => {
    const division = getDivisionById(c.req.param('id'));
    return division ? c.json(division) : c.json({ error: 'Not found' }, 404);
});
app.get('/divisions/:id/districts', (c) => c.json(getDistrictsByDivision(c.req.param('id'))));
// Districts
app.get('/districts', (c) => {
    const divisionId = c.req.query('division_id');
    const page = Number(c.req.query('page') || 1);
    const limit = Number(c.req.query('limit') || 20);
    let data = getDistricts();
    if (divisionId) {
        data = getDistrictsByDivision(divisionId);
    }
    return c.json(paginate(data, page, limit));
});
app.get('/districts/:id/upazilas', (c) => c.json(getUpazilasByDistrict(c.req.param('id'))));
// Upazilas
app.get('/upazilas', (c) => {
    const districtId = c.req.query('district_id');
    const page = Number(c.req.query('page') || 1);
    const limit = Number(c.req.query('limit') || 20);
    let data = getUpazilas();
    if (districtId) {
        data = getUpazilasByDistrict(districtId);
    }
    return c.json(paginate(data, page, limit));
});
app.get('/upazilas/:id/unions', (c) => c.json(getUnionsByUpazila(c.req.param('id'))));
// Unions
app.get('/unions', (c) => {
    const upazilaId = c.req.query('upazila_id');
    const page = Number(c.req.query('page') || 1);
    const limit = Number(c.req.query('limit') || 20);
    let data = getUnions();
    if (upazilaId) {
        data = getUnionsByUpazila(upazilaId);
    }
    return c.json(paginate(data, page, limit));
});
app.get('/unions/:id/villages', (c) => c.json(getVillagesByUnion(c.req.param('id'))));
// Villages
app.get('/villages', (c) => {
    const page = Number(c.req.query('page') || 1);
    const limit = Number(c.req.query('limit') || 20);
    return c.json(paginate(getVillages(), page, limit));
});
// Postcodes
app.get('/postcodes', (c) => {
    const page = Number(c.req.query('page') || 1);
    const limit = Number(c.req.query('limit') || 20);
    return c.json(paginate(getPostcodes(), page, limit));
});
// Search
app.get('/search', (c) => {
    const query = c.req.query('q');
    if (!query)
        return c.json({ error: 'Query parameter q is required' }, 400);
    return c.json(search(query));
});
const port = 3001;
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port
});
