import { useState, useEffect } from 'react';
import { 
  useAddress, 
  search, 
  SearchResult,
  getPostcodesByDistrict
} from '@address-book-bd/core';
import { 
  Building2, 
  MapPin, 
  Search, 
  ChevronRight, 
  Code, 
  X,
  Map,
  Globe,
  Navigation
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const {
    divisions,
    districts,
    upazilas,
    unions,
    villages,
    divisionId,
    districtId,
    upazilaId,
    unionId,
    setDivisionId,
    setDistrictId,
    setUpazilaId,
    setUnionId,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedUnion,
  } = useAddress();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<'cascade' | 'search'>('cascade');

  useEffect(() => {
    if (query.length > 2) {
      setSearchResults(search(query));
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const SelectedInfo = ({ label, value, bnValue }: { label: string; value: string; bnValue?: string }) => (
    <div className="flex flex-col p-3 rounded-xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-sm">
      <span className="text-[10px] font-semibold text-nature-700 uppercase tracking-wider">{label}</span>
      <span className="text-slate-800 font-medium">{value}</span>
      {bnValue && <span className="bn text-xs text-slate-500">{bnValue}</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-nature-50/50 selection:bg-nature-200">
      {/* Decorative background blur */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-nature-200 rounded-full blur-[120px] opacity-40 mix-blend-multiply transition-all duration-700 pointer-events-none" />
      <div className="fixed top-1/2 -right-24 w-72 h-72 bg-emerald-200 rounded-full blur-[100px] opacity-30 mix-blend-multiply transition-all duration-700 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-nature-100 mb-6 group cursor-default">
            <div className="w-8 h-8 rounded-full bg-nature-600 flex items-center justify-center text-white shadow-lg shadow-nature-200 group-hover:rotate-12 transition-transform duration-300">
              <MapPin size={18} />
            </div>
            <span className="text-sm font-semibold text-slate-700">AddressBookBD GUI Tester</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Advanced Address <span className="text-nature-600 underline decoration-nature-200 underline-offset-8">Data Playground</span>
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Test the 6-level administrative hierarchy and fuzzy search responses in real-time.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-xl shadow-slate-200/50">
              <div className="flex p-1 gap-1">
                <button
                  onClick={() => setActiveTab('cascade')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                    activeTab === 'cascade' 
                      ? "bg-white text-nature-700 shadow-md scale-[1.02]" 
                      : "text-slate-500 hover:bg-white/40"
                  )}
                >
                  <Navigation size={18} />
                  Cascading Selection
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                    activeTab === 'search' 
                      ? "bg-white text-nature-700 shadow-md scale-[1.02]" 
                      : "text-slate-500 hover:bg-white/40"
                  )}
                >
                  <Search size={18} />
                  Fuzzy Search
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'cascade' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Divisions */}
                    <SelectField
                      label="Division"
                      icon={<Globe size={16} />}
                      value={divisionId}
                      onChange={(e) => setDivisionId(e.target.value)}
                      options={divisions}
                    />

                    {/* Districts */}
                    <SelectField
                      label="District"
                      icon={<Building2 size={16} />}
                      value={districtId}
                      onChange={(e) => setDistrictId(e.target.value)}
                      options={districts}
                      disabled={!divisionId}
                      placeholder="Select District"
                    />

                    {/* Upazilas */}
                    <SelectField
                      label="Upazila / Thana"
                      icon={<MapPin size={16} />}
                      value={upazilaId}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      options={upazilas}
                      disabled={!districtId}
                      placeholder="Select Upazila"
                    />

                    {/* Unions */}
                    <SelectField
                      label="Union / Ward"
                      icon={<Map size={16} />}
                      value={unionId}
                      onChange={(e) => setUnionId(e.target.value)}
                      options={unions}
                      disabled={!upazilaId}
                      placeholder="Select Union"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-nature-600 transition-colors" size={20} />
                      <input
                        type="text"
                        placeholder="Search for any location (English/Bengali)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-white/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 outline-none transition-all shadow-inner text-lg"
                      />
                      {query && (
                        <button 
                          onClick={() => setQuery('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                        >
                          <X size={16} className="text-slate-400" />
                        </button>
                      )}
                    </div>

                    <div className="max-h-[360px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                      {searchResults.length > 0 ? (
                        searchResults.map((res, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-nature-100 hover:bg-white transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-nature-50 flex items-center justify-center text-nature-600 group-hover:scale-110 transition-transform">
                              <MapPin size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-800">{res.data.name || res.data.suboffice || res.data.name_en}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500">{res.type}</span>
                              </div>
                              <div className="bn text-sm text-slate-500">{res.data.bn_name || res.data.name_bn}</div>
                            </div>
                            <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))
                      ) : query.length > 2 ? (
                        <div className="text-center py-12 text-slate-400">No results found for "{query}"</div>
                      ) : (
                        <div className="text-center py-12 text-slate-400 italic">Start typing to search...</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Response Section */}
            {(selectedDivision || selectedDistrict || selectedUpazila || selectedUnion) && (
              <div className="p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <ChevronRight size={16} className="text-nature-600" />
                  Visual Hierarchy Data
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedDivision && <SelectedInfo label="Division" value={selectedDivision.name} bnValue={selectedDivision.bn_name} />}
                  {selectedDistrict && <SelectedInfo label="District" value={selectedDistrict.name} bnValue={selectedDistrict.bn_name} />}
                  {selectedUpazila && <SelectedInfo label="Upazila" value={selectedUpazila.name} bnValue={selectedUpazila.bn_name} />}
                  {selectedUnion && <SelectedInfo label="Union" value={selectedUnion.name} bnValue={selectedUnion.bn_name} />}
                </div>
              </div>
            )}
          </div>

          {/* Code Viewer Panel */}
          <div className="lg:col-span-5 h-[calc(100vh-16rem)] flex flex-col">
            <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-nature-500/10">
              <div className="bg-slate-800/50 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 ml-2 flex items-center gap-1.5">
                    <Code size={14} className="text-nature-400" />
                    RESPONSE_DEBUGGER
                  </span>
                </div>
                <div className="text-[10px] font-mono font-bold text-nature-500 uppercase tracking-widest bg-nature-500/10 px-2 py-0.5 rounded">
                  Status: 200 OK
                </div>
              </div>
              <div className="flex-1 overflow-auto p-6 font-mono text-sm custom-scrollbar">
                <pre className="text-nature-400 leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify({
                    query: activeTab === 'search' ? query : { divisionId, districtId, upazilaId, unionId },
                    timestamp: new Date().toISOString(),
                    results: activeTab === 'search' ? searchResults : {
                      division: selectedDivision,
                      district: selectedDistrict,
                      upazila: selectedUpazila,
                      union: selectedUnion
                    }
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-20 border-t border-nature-100 py-8 text-center">
            <p className="text-sm text-slate-500">
               Built with <span className="text-nature-600 font-bold">@address-book-bd/core</span> • Premium Bangladesh Address Explorer
            </p>
        </footer>
      </div>
    </div>
  );
}

function SelectField({ label, icon, value, onChange, options, disabled, placeholder = 'Select...' }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
        <span className={disabled ? 'text-slate-300' : 'text-nature-600'}>{icon}</span>
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "w-full h-12 pl-4 pr-10 appearance-none bg-white border border-slate-200 rounded-xl outline-none transition-all duration-300 shadow-sm",
            disabled 
              ? "opacity-50 grayscale cursor-not-allowed bg-slate-50" 
              : "hover:border-nature-400 focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 cursor-pointer"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((opt: any) => (
            <option key={opt.id} value={opt.id} className="bn italic">{opt.name} ({opt.bn_name})</option>
          ))}
        </select>
        <ChevronRight size={16} className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform pointer-events-none rotate-90",
          !disabled && "group-hover:text-nature-600"
        )} />
      </div>
    </div>
  );
}
