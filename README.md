# AddressBookBD

AddressBookBD is a comprehensive, advanced, and easy-to-integrate library and public API for Bangladeshi administrative divisions. It covers all 6 levels: Divisions, Districts, Upazilas/Thanas, Unions, Postcodes, and Villages.

## Features

- ✅ **Complete Hierarchy**: Division → District → Upazila → Union → Village.
- ✅ **Multi-language**: Built-in support for English and Bengali (বাংলা).
- ✅ **Advanced Search**: Fuzzy search across all levels.
- ✅ **React Hooks**: Built-in `useAddress` hook for cascading dropdowns.
- ✅ **API Docs**: Interactive Scalar/OpenAPI documentation.
- ✅ **Parent Filtering**: Easy API filtering by parent IDs.
- ✅ **Postcodes**: Over 2,500 accurate postcodes.
- ✅ **High Performance**: Tiny core package (zero dependencies) and fast Hono-based API.
- ✅ **TypeScript**: Fully typed for a better developer experience.

## Project Structure

This is a monorepo containing:
- `packages/core`: The core logic and data (NPM package candidate).
- `apps/api`: A ready-to-deploy Public API server using Hono.

---

## 📦 Core Library Usage

### Installation
```bash
npm install @address-book-bd/core
```

### Quick Start
```typescript
import { 
  getDivisions, 
  getDistrictsByDivision, 
  search 
} from '@address-book-bd/core';

// Get all divisions
const divisions = getDivisions();

// Search for a location (English or Bengali)
const results = search('Dhaka');
// returns search results including Divisions, Districts, Unions, etc.

// Using the React Hook
// const { divisions, districts, setDivisionId } = useAddress();
```

---

## 🚀 Public API Usage

The API is built with Hono and is ready for deployment.

### Documentation
Interactive documentation is available at `/docs` (Scalar/OpenAPI).

### Endpoints
- `GET /divisions`: List all divisions.
- `GET /districts?division_id=:id`: List districts (optional filter).
- `GET /upazilas?district_id=:id`: List upazilas (optional filter).
- `GET /unions?upazila_id=:id`: List unions (optional filter).
- `GET /villages?union_id=:id`: List villages (optional filter).
- `GET /search?q=query`: Fuzzy search across all levels.

### Running Locally
```bash
npm run dev:api
```
Server runs on [http://localhost:3001](http://localhost:3001) by default.

---

## 🚀 Deployment (Vercel)

The API is ready to be deployed to Vercel.

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` from the root directory.
3. Follow the prompts to link and deploy.

The `vercel.json` is already configured to route all requests to the Hono API.

## Data Source
Data is aggregated and cleaned from open-source repositories including:
- `nuhil/bangladesh-geocode`
- `syedshaon/bd-address`
- Mock data for villages (initial support).

## License
MIT
