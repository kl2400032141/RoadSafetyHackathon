import React, { useState, useEffect } from 'react';
import { Road, Complaint, ExpenseItem } from '../types';
import { AdvancedMarker, InfoWindow, Pin, useMap } from '@vis.gl/react-google-maps';
import GoogleMapContainer from './GoogleMapContainer';
import { t, Language } from '../utils/translations';
import { TranslatedText } from './TranslatedText';

// Custom Polyline helper since @vis.gl/react-google-maps delegation is lightweight
function MapPolyline({ 
  path, 
  strokeColor = '#3b82f6', 
  strokeWeight = 5, 
  strokeOpacity = 0.8,
  onClick
}: { 
  key?: any;
  path: { lat: number; lng: number }[];
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  onClick?: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !path || path.length === 0) return;

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor,
      strokeOpacity,
      strokeWeight,
    });

    polyline.setMap(map);

    let clickListener: google.maps.MapsEventListener | null = null;
    if (onClick) {
      clickListener = polyline.addListener('click', onClick);
    }

    return () => {
      polyline.setMap(null);
      if (clickListener) {
        clickListener.remove();
      }
    };
  }, [map, path, strokeColor, strokeWeight, strokeOpacity, onClick]);

  return null;
}

import { 
  Search, 
  MapPin, 
  Calendar, 
  User, 
  DollarSign, 
  Building, 
  Layers, 
  Wrench, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight,
  PlusCircle,
  FileText,
  BadgeAlert,
  X,
  FileDown,
  ExternalLink,
  Milestone,
  ChevronRight,
  Info,
  Heart
} from 'lucide-react';

interface SearchViewProps {
  roads: Road[];
  tickets: Complaint[];
  likedTicketIds: Record<string, boolean>;
  onLikeTicket: (ticketId: string) => void;
  selectedRoadId: string | null;
  onSelectRoad: (roadId: string | null) => void;
  onRaiseIssueForRoad: (roadName: string) => void;
  onSearchLocation?: (query: string) => Promise<boolean>;
  language: Language;
}

export default function SearchView({ 
  roads, 
  tickets, 
  likedTicketIds,
  onLikeTicket,
  selectedRoadId,
  onSelectRoad,
  onRaiseIssueForRoad,
  onSearchLocation,
  language
}: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [gmpPopupOpen, setGmpPopupOpen] = useState(true);

  // Keep details popup open when selecting another road
  useEffect(() => {
    if (selectedRoadId) {
      setGmpPopupOpen(true);
    }
  }, [selectedRoadId]);

  // Filter roads based on search query supporting both English and translated matching
  const filteredRoads = roads.filter(road => {
    const query = searchQuery.toLowerCase();
    const nameMatchEn = road.name.toLowerCase().includes(query);
    const contractorMatchEn = road.contractor.toLowerCase().includes(query);
    const locationMatchEn = road.location.toLowerCase().includes(query);
    
    const translatedName = t(road.name, language).toLowerCase();
    const translatedContractor = t(road.contractor, language).toLowerCase();
    const translatedLocation = t(road.location, language).toLowerCase();
    
    const nameMatchHi = translatedName.includes(query);
    const contractorMatchHi = translatedContractor.includes(query);
    const locationMatchHi = translatedLocation.includes(query);
    
    return nameMatchEn || contractorMatchEn || locationMatchEn || nameMatchHi || contractorMatchHi || locationMatchHi;
  });

  // Retrieve current active road object
  const activeRoad = roads.find(r => r.id === selectedRoadId) || roads[0];

  // Retrieve complaints raised on this specific road
  const activeRoadTickets = tickets.filter(t => t.roadId === activeRoad.id);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-500 text-white';
      case 'In Progress': return 'bg-blue-500 text-white';
      case 'Under Review': return 'bg-amber-500 text-white';
      default: return 'bg-rose-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search Header Container */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{t("Search & Audit Public Roads", language)}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("Look up contractor histories, audit civil ledger codes, and trace pending safety fixes.", language)}
          </p>
        </div>

        {/* Search bar input */}
        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            if (searchQuery.trim() === '') return;
            if (onSearchLocation) {
              const success = await onSearchLocation(searchQuery);
              if (success) {
                setSearchQuery('');
              }
            }
          }}
          className="relative max-w-2xl"
        >
          <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={t("Type a segment name or enter a city name (e.g., Vijayawada) to relocate entire corridor...", language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-16 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm placeholder:text-slate-400 transition"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 hover:shadow-xs transition cursor-pointer"
          >
            {t("Go", language)}
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1.5">
          <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase">{t("Suggested Roads:", language)}</span>
          {roads.slice(0, 5).map((road) => (
            <button
              key={road.id}
              onClick={() => {
                onSelectRoad(road.id);
                setSearchQuery('');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                selectedRoadId === road.id
                  ? 'bg-blue-50 border-blue-250 text-blue-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-655 hover:bg-slate-50'
              }`}
            >
              {t(road.name.split(' (')[0], language)}
            </button>
          ))}
        </div>
      </div>

      {!selectedRoadId ? (
        /* Box of Road Names only */
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-100/10">
            <div>
              <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase">{t("Public Roads Directory", language)} ({filteredRoads.length} {t("Segment", language)})</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t("Please search or select a road below to inspect detailed contractor logs, audited spending ledgers, maps, and citizen grievances.", language)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoads.map((road) => (
              <div
                key={road.id}
                onClick={() => {
                  onSelectRoad(road.id);
                  setSearchQuery('');
                }}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/10 hover:bg-blue-50/20 hover:border-blue-250 cursor-pointer transition flex flex-col justify-between group h-28 hover:shadow-3xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className={`text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm border ${
                      road.type === 'NH' 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : road.type === 'SH' 
                        ? 'bg-amber-50 text-amber-700 border-amber-200' 
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {t(road.type, language)} {language === 'hi' ? 'मार्ग' : 'Route'}
                    </span>
                    <span className="text-[10px] text-slate-445 font-semibold">{road.lengthKm} Km</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-850 group-hover:text-blue-600 transition truncate">
                    {t(road.name.split(' (')[0], language)}
                  </h3>
                  <p className="text-[10.5px] text-slate-400 mt-0.5 truncate">{t(road.location, language)}</p>
                </div>

                <div className="mt-2 text-[10px] text-blue-600 font-bold flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>{t("Inspect Details & spent", language)}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}

            {filteredRoads.length === 0 && (
              <div className="py-12 text-center text-slate-400 col-span-full">
                <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">{t("No matching routes found.", language)}</p>
                <p className="text-[11.5px] text-slate-445 mt-1">{t("Try clarifying your terms or look at the recommended suggested highways.", language)}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Detailed Specifications of active road card */
        <div className="space-y-4">
          
          {/* Back button option bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-3xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <p className="text-xs text-slate-500 font-medium">{t("Currently inspecting:", language)}</p>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                {t(activeRoad.name, language)}
              </span>
            </div>
            <button 
              onClick={() => {
                onSelectRoad(null);
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              ← {t("Back to Road Directory", language)}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Search Suggestion Results within details */}
            {searchQuery.trim().length > 0 && (
              <div className="lg:col-span-12 bg-white p-4 rounded-xl border border-[#E2E8F0] max-h-[220px] overflow-y-auto shadow-xs">
                <h3 className="text-xs font-bold text-slate-400 mb-2 px-1 uppercase tracking-wider">{t("Switch to Matching Road", language)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredRoads.map((road) => (
                    <div
                      key={road.id}
                      onClick={() => {
                        onSelectRoad(road.id);
                        setSearchQuery('');
                      }}
                      className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 truncate">{t(road.name, language)}</h4>
                        <p className="text-xs text-slate-400">{t(road.location, language)} • {t("Contractor:", language)} {t(road.contractor, language)}</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t("Inspect", language)} <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                  {filteredRoads.length === 0 && (
                    <p className="text-sm text-slate-400 p-4 text-center col-span-2">{t("No matching road assets found.", language)}</p>
                  )}
                </div>
              </div>
            )}

            {/* Column 1: Road Details Card & Spending Details (7 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-5">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm border ${
                    activeRoad.type === 'NH' 
                      ? 'bg-red-50 text-red-700 border-red-200' 
                      : activeRoad.type === 'SH' 
                      ? 'bg-orange-50 text-orange-700 border-orange-200' 
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {activeRoad.type === 'NH' ? t('National Highway', language) : activeRoad.type === 'SH' ? t('State Highway', language) : t('Municipal Local Road', language)}
                  </span>
                  
                  <span className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full ${
                    activeRoad.condition === 'Excellent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    activeRoad.condition === 'Good' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                    activeRoad.condition === 'Fair' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {t("Condition Score:", language)} {t(activeRoad.condition, language)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800">{t(activeRoad.name, language)}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {t(activeRoad.location, language)}
                </p>
              </div>

              {/* Raise Issue Trigger button */}
              <button 
                onClick={() => onRaiseIssueForRoad(activeRoad.name)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl tracking-tight transition shadow-sm flex items-center gap-1.5 self-start"
              >
                <PlusCircle className="w-4 h-4" /> {t("Raise Issue", language)}
              </button>
            </div>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left specifications column */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{t("Assigned Contractor", language)}</p>
                    <p className="text-sm font-semibold text-slate-700">{t(activeRoad.contractor, language)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{t("Sanctioning Authority", language)}</p>
                    <p className="text-sm font-semibold text-slate-700">{t(activeRoad.authority, language)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{t("Last Repair Completion Date", language)}</p>
                    <p className="text-sm font-semibold text-slate-700">{t(activeRoad.lastRepairDate, language)}</p>
                  </div>
                </div>
              </div>

              {/* Right specifications column (Budget overview indicators) */}
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t("Budget Allocation Analysis", language)}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-slate-400">{t("Allocated", language)}</p>
                      <p className="text-sm font-bold text-slate-800">{formatCurrency(activeRoad.budgetAllocated)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">{t("Spent to Date", language)}</p>
                      <p className="text-sm font-bold text-slate-800">{formatCurrency(activeRoad.budgetSpent)}</p>
                    </div>
                  </div>
                </div>

                {/* Spent audit trigger bar */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{t("Utilization Quotient", language)}</span>
                    <span className="font-semibold text-slate-700">{((activeRoad.budgetSpent / activeRoad.budgetAllocated) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(activeRoad.budgetSpent / activeRoad.budgetAllocated) * 105}%` }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setSelectedExpense(activeRoad.expenses[0] || null);
                      setIsBudgetModalOpen(true);
                    }}
                    className="w-full mt-1.5 py-2 px-3 bg-white hover:bg-slate-50 text-blue-600 text-xs font-semibold rounded-lg border border-slate-200 hover:border-slate-300 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" /> {t("Audit Detailed Spent Ledger", language)}
                  </button>
                </div>

              </div>

            </div>

            {/* Extra Structural parameters (length in km, lane configurations) */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-150 text-xs shadow-none">
              <div className="p-3 bg-slate-50/30 rounded-lg text-center">
                <span className="text-slate-400 block text-[10px] tracking-wider uppercase mb-0.5">{t("Asset Segment Length", language)}</span>
                <span className="font-bold text-slate-755 text-sm">{activeRoad.lengthKm} {t("Kilometers", language)}</span>
              </div>
              <div className="p-3 bg-slate-50/30 rounded-lg text-center">
                <span className="text-slate-400 block text-[10px] tracking-wider uppercase mb-0.5">{t("Lane Configuration", language)}</span>
                <span className="font-bold text-slate-755 text-sm">{activeRoad.lanes} {t("Way Lanes Carriageway", language)}</span>
              </div>
            </div>

          </div>

          {/* Issue Tracking Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <h2 className="text-base font-semibold text-slate-800 mb-1">{t("Citizen Issues Filed on This Road", language)}</h2>
            <p className="text-xs text-slate-400 mb-4">{t("Tracking public grievances, structural deterioration reports, and maintenance responses.", language)}</p>

            {activeRoadTickets.length === 0 ? (
              <div className="py-8 text-center text-slate-400 bg-slate-50/40 rounded-xl border border-dashed border-slate-200">
                <CheckCircle className="w-7 h-7 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-600">{t("Zero active safety issues reported!", language)}</p>
                <p className="text-[11px] text-slate-400">{t("Citizens are highly satisfied with this segment or no hazards exist.", language)}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeRoadTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 space-y-4">
                    
                    {/* Upper ticket state */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-100">
                          {t(ticket.category, language)}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-700 mt-1"><TranslatedText text={ticket.subject} language={language} /></h4>
                      </div>
                      <span className={`text-xs px-2.5 py-1 font-semibold rounded-full ${getStatusColor(ticket.status)} self-start sm:self-center`}>
                        {t(ticket.status, language)}
                      </span>
                    </div>

                    {/* Description details */}
                    <p className="text-xs text-slate-500 leading-relaxed"><TranslatedText text={ticket.description} language={language} /></p>

                    {/* Progress tracking bar */}
                    <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-100">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t("Administrative Milestones", language)}</p>
                      <div className="relative flex justify-between items-center text-center">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -translate-y-1/2 -z-0" />
                        
                        {/* Steps */}
                        {[
                          { name: 'Pending', step: 'Pending' },
                          { name: 'Review', step: 'Under Review' },
                          { name: 'Fixing', step: 'In Progress' },
                          { name: 'Resolved', step: 'Resolved' }
                        ].map((m, idx) => {
                          const isActive = ticket.status === m.step || 
                            (ticket.status === 'Under Review' && idx === 0) ||
                            (ticket.status === 'In Progress' && idx <= 1) ||
                            (ticket.status === 'Resolved');
                          return (
                            <div key={idx} className="relative z-10 flex flex-col items-center">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold border ${
                                isActive 
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                                  : 'bg-white border-slate-200 text-slate-400'
                              }`}>
                                {idx + 1}
                              </div>
                              <span className="text-[9px] font-medium text-slate-500 mt-1">{t(m.name, language)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer info metadata */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100/40">
                      <div className="flex flex-col text-[10px]">
                        <span>{t("Report ID:", language)} <strong className="text-slate-600">{ticket.referenceId}</strong></span>
                        <span>{t("Filed Date:", language)} {ticket.date}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikeTicket(ticket.id);
                        }}
                        className={`px-2.5 py-1 rounded-lg border transition duration-150 flex items-center gap-1.5 font-bold cursor-pointer hover:shadow-3xs ${
                          likedTicketIds[ticket.id]
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'bg-white border-slate-150 text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        title={likedTicketIds[ticket.id] ? "Remove endorsement" : "Endorse report"}
                      >
                        <Heart className={`w-3.5 h-3.5 transition-transform ${likedTicketIds[ticket.id] ? 'fill-rose-500 text-rose-600 scale-110' : 'text-slate-450'}`} />
                        <span>{ticket.likes || 0}</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Column 2: Map Placement Integration (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-800">{t("Geospatial Alignment", language)}</h3>
              <p className="text-xs text-slate-500">{t("Highlighted vector segment on the local grid map.", language)}</p>
            </div>

            {/* Real-time Google Maps alignment */}
            <div className="relative h-96 w-full rounded-xl overflow-hidden border border-slate-150 shadow-xs">
              <GoogleMapContainer 
                id="search-road-map" 
                height="100%" 
                zoom={13} 
                center={activeRoad.gmpCenter || { lat: 12.9716, lng: 77.5946 }}
              >
                {/* Highlight Selected Road using native Maps Polyline */}
                {activeRoad.gmpCoordinates && (
                  <MapPolyline 
                    path={activeRoad.gmpCoordinates} 
                    strokeColor={activeRoad.type === 'NH' ? '#de2e2e' : activeRoad.type === 'SH' ? '#ea580c' : '#2563eb'}
                    strokeWeight={6}
                    strokeOpacity={0.95}
                  />
                )}

                {/* Draw other roads around it with lower opacity */}
                {roads.map(r => {
                  if (r.id === activeRoad.id || !r.gmpCoordinates) return null;
                  return (
                    <MapPolyline 
                      key={`other-road-${r.id}`}
                      path={r.gmpCoordinates} 
                      strokeColor="#64748b"
                      strokeWeight={3}
                      strokeOpacity={0.35}
                      onClick={() => onSelectRoad(r.id)}
                    />
                  );
                })}

                {/* Show road marker / popup of active road */}
                {activeRoad.gmpCenter && (
                  <AdvancedMarker 
                    position={activeRoad.gmpCenter}
                    onClick={() => setGmpPopupOpen(true)}
                  >
                    <Pin background={activeRoad.type === 'NH' ? '#de2e2e' : activeRoad.type === 'SH' ? '#ea580c' : '#2563eb'} glyphColor="#fff" />
                  </AdvancedMarker>
                )}

                {/* Popup (InfoWindow) with: Road Name, Budget, Contractor, Last Repair Date */}
                {gmpPopupOpen && activeRoad.gmpCenter && (
                  <InfoWindow
                    position={activeRoad.gmpCenter}
                    onCloseClick={() => setGmpPopupOpen(false)}
                  >
                    <div className="p-2 space-y-1.5 max-w-[200px] text-xs bg-white select-text">
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-extrabold border">
                        {t(activeRoad.type, language)} {t("Segment", language)}
                      </span>
                      <h4 className="font-bold text-slate-800 text-xs leading-snug">{t(activeRoad.name, language)}</h4>
                      <div className="text-[10px] space-y-1 text-slate-600 leading-normal">
                        <p>{t("Contractor:", language)} <strong>{t(activeRoad.contractor, language)}</strong></p>
                        <p>{t("Budget:", language)} <strong className="text-blue-600">₹{(activeRoad.budgetAllocated / 10000000).toFixed(2)} Cr</strong></p>
                        <p>{t("Last Repair:", language)} <strong>{t(activeRoad.lastRepairDate, language)}</strong></p>
                        <p>{t("Condition:", language)} <strong className="text-emerald-700">{t(activeRoad.condition, language)}</strong></p>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMapContainer>
            </div>

            <p className="text-xs text-slate-400 leading-normal">
              {t("This geometric segment represents", language)} {activeRoad.lengthKm} {t("Km of maintenance responsibility assigned to", language)} <strong>{t(activeRoad.contractor, language)}</strong>.
            </p>
          </div>

          {/* Quick Guide about Audits */}
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3 text-xs text-blue-700">
            <Milestone className="w-5 h-5 shrink-0 text-blue-500" />
            <div className="space-y-1">
              <span className="font-semibold text-blue-800">{t("Why are details public?", language)}</span>
              <p className="leading-relaxed text-blue-600">
                {t("Under the National Road Safety mandate of 2026, all taxpayers deserve visibility into civil labor pricing. Click on the Spending ledger to inspect concrete batch files and signed inspectors invoices.", language)}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )}

      {/* DETAILED BUDGET SPENT BREALDOWN MODAL */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">{t("Government Ledger Audit", language)}</span>
                <h3 className="text-lg font-bold text-slate-800">{t("Itemized Expenditure:", language)} {t(activeRoad.name, language)}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{t("Approved and disbursed by", language)} <strong>{t(activeRoad.authority, language)}</strong></p>
              </div>
              <button 
                onClick={() => {
                  setIsBudgetModalOpen(false);
                  setSelectedExpense(null);
                }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Aggregated spent bar metric */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{t("Sanctioned Treasury Pool", language)}</p>
                  <p className="text-base font-extrabold text-slate-800">{formatCurrency(activeRoad.budgetAllocated)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase">{t("Contractor Invoiced Outflow", language)}</p>
                  <p className="text-base font-extrabold text-emerald-600">{formatCurrency(activeRoad.budgetSpent)}</p>
                </div>
              </div>

              {/* Expense category list */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("Sub-Project Line Items", language)}</h4>

                <div className="space-y-3">
                  {activeRoad.expenses.map((exp) => (
                    <div 
                      key={exp.id}
                      onClick={() => setSelectedExpense(exp)}
                      className={`p-4 rounded-xl border cursor-pointer transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        selectedExpense?.id === exp.id 
                          ? 'border-blue-500 bg-blue-50/20 shadow-xs' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="space-y-1 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono font-medium rounded">
                            {exp.id.toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">{t(exp.category, language)}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{t(exp.description, language)}</p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-800">{formatCurrency(exp.amount)}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{t("Contributes:", language)} {exp.percentage}%</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${selectedExpense?.id === exp.id ? 'rotate-90 text-blue-500' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected expense document verification detail */}
              {selectedExpense && (
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">{t("Signed Digital Verification Proof", language)}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <CheckCircle className="w-3 h-3" /> {t("Treasury Matched", language)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-blue-900">{t(selectedExpense.category, language)} {t("Details", language)}</h5>
                    <p className="text-xs text-blue-700/80 leading-relaxed">{t(selectedExpense.description, language)}</p>
                  </div>

                  {/* PDF document downloadable placeholder box */}
                  <div className="p-3 bg-white rounded-lg border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 truncate max-w-[180px] sm:max-w-xs">{t(selectedExpense.proofName, language)}</p>
                        <p className="text-[10px] text-slate-400">{t("Signed with secure e-Sign MD5", language)}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setDownloadSuccess(selectedExpense.proofName);
                        setTimeout(() => setDownloadSuccess(null), 4000);
                      }}
                      className="px-2.5 py-1 text-[10px] font-semibold hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-md transition flex items-center gap-1 cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" /> {t("Get PDF", language)}
                    </button>
                  </div>

                  {downloadSuccess && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] rounded-lg animate-fadeIn flex items-center justify-between">
                      <span>✓ {t("Initiated audit ledger download for:", language)} <strong className="font-bold">{t(downloadSuccess, language)}</strong></span>
                      <button onClick={() => setDownloadSuccess(null)} className="text-emerald-500 hover:text-emerald-800">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                <Info className="w-3.5 h-3.5 text-slate-300" /> {t("Complete Audit conforms to standard National Safety Standards code ISO 15607.", language)}
              </span>
              <button 
                onClick={() => {
                  setIsBudgetModalOpen(false);
                  setSelectedExpense(null);
                }}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-semibold cursor-pointer transition text-xs"
              >
                {t("Done", language)}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
