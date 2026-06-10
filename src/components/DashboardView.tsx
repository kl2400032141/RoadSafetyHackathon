import React, { useState } from 'react';
import { Road, Complaint, RoadType } from '../types';
import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import GoogleMapContainer from './GoogleMapContainer';
import { t, Language } from '../utils/translations';
import { TranslatedText } from './TranslatedText';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Layers, 
  ArrowUpRight, 
  Info,
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label, language }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm text-xs">
        <p className="font-bold text-slate-800 mb-1">{t(label, language)}</p>
        <p className="text-blue-600 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          {t("Sanctioned:", language)} <span className="font-bold text-slate-800">₹{payload[0].value.toFixed(2)} Cr</span>
        </p>
        <p className="text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          {t("Spent:", language)} <span className="font-bold text-slate-800">₹{payload[1].value.toFixed(2)} Cr</span>
        </p>
        {payload[0].value > 0 && (
          <p className="text-[10px] text-slate-400 mt-1.5 pt-1 border-t border-slate-100">
            {t("Utilization Rate:", language)} <span className="font-bold text-slate-600">{((payload[1].value / payload[0].value) * 100).toFixed(1)}%</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

interface DashboardViewProps {
  roads: Road[];
  tickets: Complaint[];
  likedTicketIds: Record<string, boolean>;
  onLikeTicket: (ticketId: string) => void;
  onSelectRoad: (roadId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onNewTicketClick: () => void;
  language: Language;
}

export default function DashboardView({ 
  roads, 
  tickets, 
  likedTicketIds,
  onLikeTicket,
  onSelectRoad,
  onNavigateToTab,
  onNewTicketClick,
  language
}: DashboardViewProps) {
  const [selectedType, setSelectedType] = useState<RoadType | 'All'>('All');
  const [selectedRoadMarker, setSelectedRoadMarker] = useState<Road | null>(null);
  const [selectedTicketMarker, setSelectedTicketMarker] = useState<Complaint | null>(null);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);
  
  // Filter roads based on selection
  const filteredRoads = selectedType === 'All' 
    ? roads 
    : roads.filter(r => r.type === selectedType);

  // Filter tickets based on Selected Road Type (derived from road relations)
  const filteredTickets = selectedType === 'All'
    ? tickets
    : tickets.filter(ticket => {
        const matchingRoad = roads.find(r => r.id === ticket.roadId);
        return matchingRoad?.type === selectedType;
      });

  // Aggregated math
  const totalAllocated = filteredRoads.reduce((sum, r) => sum + r.budgetAllocated, 0);
  const totalSpent = filteredRoads.reduce((sum, r) => sum + r.budgetSpent, 0);
  const averageSpentPercentage = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  // Counts of issues by status
  const totalIssues = filteredTickets.length;
  const pendingCount = filteredTickets.filter(t => t.status === 'Pending').length;
  const inProgressCount = filteredTickets.filter(t => t.status === 'In Progress' || t.status === 'Under Review').length;
  const resolvedCount = filteredTickets.filter(t => t.status === 'Resolved').length;

  // Map to crores for clear visual range in charts
  const chartData = filteredRoads.map((road) => {
    const rawName = road.name.split(' (')[0];
    const translatedName = t(rawName, language);
    const shortName = translatedName
      .replace('National Highway ', 'NH-')
      .replace('State Highway ', 'SH-')
      .replace('राष्ट्रीय राजमार्ग ', 'NH-')
      .replace('राज्य राजमार्ग ', 'SH-');
    
    return {
      name: shortName,
      'Sanctioned Budget (INR Cr)': road.budgetAllocated / 10000000,
      'Spent Budget (INR Cr)': road.budgetSpent / 10000000,
    };
  });

  const formatCurrencyInCrores = (val: number) => {
    // 1 Crore = 1,00,00,000 (ten million)
    const crores = val / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  };

  const getConditionColor = (cond: Road['condition']) => {
    switch (cond) {
      case 'Excellent': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Fair': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Poor': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
            {t("Resolved", language)}
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF5FE] text-[#1E88E5]">
            {t("In Progress", language)}
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706]">
            {t("Under Review", language)}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626]">
            {t("Pending", language)}
          </span>
        );
    }
  };

  const getTicketBorderColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Resolved': return 'border-l-2 border-[#4CAF50]';
      case 'In Progress': return 'border-l-2 border-[#2196F3]';
      case 'Under Review': return 'border-l-2 border-[#FFC107]';
      default: return 'border-l-2 border-[#F44336]';
    }
  };  return (
    <div className="space-y-6">
      
      {/* Dynamic Filter Strip */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 font-medium">
          {t("Dashboard Summary Metric Index", language)}
        </p>

        {/* Filter Bar */}
        <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-150">
          {(['All', 'NH', 'SH', 'Local'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                selectedType === type
                  ? 'bg-white text-blue-600 shadow-3xs border border-slate-200'
                  : 'text-slate-650 hover:text-slate-900'
              }`}
            >
              {type === 'All' ? t('All Networks', language) : t(type, language)}
            </button>
          ))}
        </div>
      </div>

      {/* Simplified Bento Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#E2E8F0] shadow-3xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t("Sanctioned Budget", language)}</p>
              <h3 className="text-lg font-bold text-slate-800 mt-1">{formatCurrencyInCrores(totalAllocated)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50/50 text-blue-600 flex items-center justify-center border border-blue-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-450 mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-350" />
            <span>{t(`Across ${filteredRoads.length} segments in this layer`, language)}</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#E2E8F0] shadow-3xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t("Treasury Disbursed", language)}</p>
              <h3 className="text-lg font-bold text-slate-800 mt-1">{formatCurrencyInCrores(totalSpent)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50/50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-450">
              <span>{t("Utilization:", language)} <strong>{averageSpentPercentage.toFixed(1)}%</strong></span>
            </div>
            <div className="w-full bg-slate-105 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(averageSpentPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#E2E8F0] shadow-3xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t("Citizen Grievances", language)}</p>
              <h3 className="text-lg font-bold text-slate-800 mt-1">{totalIssues} {t("Active Cases", language)}</h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-rose-50/50 text-rose-500 flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3.5 pt-2 border-t border-slate-100/50 flex justify-between text-[10.5px] text-slate-500">
            <span>{t("Pending", language)}: <strong className="text-rose-600 font-bold">{pendingCount}</strong></span>
            <span>{t("Active", language)}: <strong className="text-indigo-600 font-bold">{inProgressCount}</strong></span>
            <span>{t("Fixed", language)}: <strong className="text-emerald-600 font-bold">{resolvedCount}</strong></span>
          </div>
        </div>

      </div>

      {/* Budget Overview Chart */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">{t("Financial Performance Overview", language)}</h2>
            <p className="text-[11px] text-slate-450 mt-0.5">{t("Budget Sanctioned vs. Budget Disbursed across selected road segments (in Crores).", language)}</p>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] font-bold shrink-0 select-none">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-3 h-3 rounded-xs bg-[#3B82F6] inline-block" /> {t("Sanctioned Budget", language)}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-3 h-3 rounded-xs bg-[#10B981] inline-block" /> {t("Spent Budget", language)}
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          {chartData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
              <Info className="w-8 h-8 text-slate-300 mb-2" />
              <span>No statistical data for the selected network layer.</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94A3B8" 
                  fontSize={10} 
                  fontWeight={600}
                  tickLine={false} 
                  axisLine={false}
                  dy={8}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={10} 
                  fontWeight={600}
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `₹${value} Cr`}
                  dx={-4}
                />
                <ChartTooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Bar 
                  dataKey="Sanctioned Budget (INR Cr)" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={32}
                />
                <Bar 
                  dataKey="Spent Budget (INR Cr)" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={32} 
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Real-time Civil Map section */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-800">{t("Geospatial Audit Network", language)}</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">{t("Real-time civil budget tracking & active hazards near your location.", language)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 mr-2">
              <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full inline-block" /> {t("Road Segment", language)}
              <span className="w-2.5 h-2.5 bg-[#EF4444] rounded-full inline-block ml-2" /> {t("Citizen Issue", language)}
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-semibold border border-blue-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> {t("Live GPS Search", language)}
            </span>
          </div>
        </div>

        <GoogleMapContainer 
          id="dashboard-nearby-map" 
          height="320px" 
          zoom={11}
          onLocationDetected={(coords) => setUserCoords(coords)}
        >
          {userCoords && (
            <AdvancedMarker position={userCoords} title={t("My Location", language)}>
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-40 animate-ping" />
                <span className="relative rounded-full h-3.5 w-3.5 bg-blue-600 border-2 border-white shadow-xs" />
              </div>
            </AdvancedMarker>
          )}

          {roads.map(road => {
            if (!road.gmpCenter) return null;
            return (
              <AdvancedMarker
                key={`dash-road-${road.id}`}
                position={road.gmpCenter}
                title={t(road.name, language)}
                onClick={() => {
                  setSelectedRoadMarker(road);
                  setSelectedTicketMarker(null);
                }}
              >
                <Pin background="#10B981" borderColor="#047857" glyphColor="#fff" scale={0.9} />
              </AdvancedMarker>
            );
          })}

          {tickets.map(ticket => {
            if (!ticket.gmpCoordinate) return null;
            return (
              <AdvancedMarker
                key={`dash-ticket-${ticket.id}`}
                position={ticket.gmpCoordinate}
                title={t(ticket.subject, language)}
                onClick={() => {
                  setSelectedTicketMarker(ticket);
                  setSelectedRoadMarker(null);
                }}
              >
                <Pin background="#EF4444" borderColor="#B91C1C" glyphColor="#fff" scale={0.8} />
              </AdvancedMarker>
            );
          })}

          {selectedRoadMarker && selectedRoadMarker.gmpCenter && (
            <InfoWindow
              position={selectedRoadMarker.gmpCenter}
              onCloseClick={() => setSelectedRoadMarker(null)}
            >
              <div className="p-2 space-y-1.5 max-w-[220px] bg-white text-xs select-text">
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold border border-emerald-200">
                  {t(selectedRoadMarker.type, language)} {t("Segment", language)}
                </span>
                <h4 className="font-bold text-slate-800 text-xs leading-snug">{t(selectedRoadMarker.name, language)}</h4>
                <div className="text-[10px] space-y-0.5 text-slate-600">
                  <p>{t("Contractor:", language)} <strong>{t(selectedRoadMarker.contractor, language)}</strong></p>
                  <p>{t("Allocated", language)}: <strong className="text-slate-800">₹{(selectedRoadMarker.budgetAllocated / 10000000).toFixed(2)} Cr</strong></p>
                  <p>{t("Condition:", language)} <strong className="text-emerald-700">{t(selectedRoadMarker.condition, language)}</strong></p>
                </div>
                <button
                  onClick={() => {
                    onSelectRoad(selectedRoadMarker.id);
                  }}
                  className="w-full text-center py-1 mt-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[10px] font-bold transition"
                >
                  {t("Inspect Financial Ledger", language)}
                </button>
              </div>
            </InfoWindow>
          )}

          {selectedTicketMarker && selectedTicketMarker.gmpCoordinate && (
            <InfoWindow
              position={selectedTicketMarker.gmpCoordinate}
              onCloseClick={() => setSelectedTicketMarker(null)}
            >
              <div className="p-2 space-y-1.5 max-w-[220px] bg-white text-xs select-text">
                <span className="text-[9px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-extrabold border border-rose-250">
                  {t(selectedTicketMarker.category, language)}
                </span>
                <h4 className="font-bold text-slate-800 text-xs leading-snug"><TranslatedText text={selectedTicketMarker.subject} language={language} /></h4>
                <p className="text-[10.5px] text-slate-500 leading-normal line-clamp-2"><TranslatedText text={selectedTicketMarker.description} language={language} /></p>
                <div className="text-[10px] flex items-center justify-between text-slate-450 border-t border-slate-100 pt-1">
                  <span>{t("Filed by:", language)} <strong>{t(selectedTicketMarker.citizenName, language)}</strong></span>
                  <span className="font-semibold text-rose-600">{t(selectedTicketMarker.status, language)}</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMapContainer>
      </div>

      {/* Balanced 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Merged Left Column: Audited Road Networks (7 cols) */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-800">{t("Audited Road Networks & Budgets", language)}</h2>
                <p className="text-[11px] text-slate-450 mt-0.5">{t("Track contractor compliance, road score, and financial progress.", language)}</p>
              </div>
              <button 
                onClick={() => onNavigateToTab('Search Road Details')}
                className="text-xs font-bold text-blue-650 hover:underline transition cursor-pointer"
              >
                {t("Inspect Ledger", language)}
              </button>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredRoads.map((road) => {
                const spentPercent = road.budgetAllocated > 0 ? (road.budgetSpent / road.budgetAllocated) * 100 : 0;
                return (
                  <div 
                    key={road.id} 
                    onClick={() => onSelectRoad(road.id)}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/15 hover:bg-slate-50/60 cursor-pointer transition flex flex-col gap-2.5 group"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm border ${
                            road.type === 'NH' 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : road.type === 'SH' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {t(road.type, language)} {t("Series", language)}
                          </span>
                          <span className={`text-[8.5px] font-bold border px-1.5 py-0.5 rounded-full ${getConditionColor(road.condition)}`}>
                            {t("Condition:", language)} {t(road.condition, language)}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition flex items-center gap-1">
                          {t(road.name, language)}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" />
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-450 block font-medium">{t("Treasury Spent", language)}</span>
                        <span className="text-xs font-bold text-slate-800">
                          {formatCurrencyInCrores(road.budgetSpent)} <span className="text-[10px] text-slate-350 font-normal">/ {formatCurrencyInCrores(road.budgetAllocated)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-450">
                        <span>{t("Contractor:", language)} <strong className="text-slate-655">{t(road.contractor, language)}</strong></span>
                        <span className="font-semibold text-slate-700">{t("Utilization:", language)} {spentPercent.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(spentPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredRoads.length === 0 && (
                <div className="py-12 text-center text-slate-450">
                  <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs">{t("No active segments found matches the filter category.", language)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Citizen Reports / Concerns (5 cols) */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-800">{t("Citizen Safety Pulse", language)}</h2>
                <p className="text-[11px] text-slate-450 mt-0.5">{t("Live active defect logs reported near you.", language)}</p>
              </div>
              <button
                onClick={onNewTicketClick}
                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-100 transition shadow-3xs flex items-center gap-1 cursor-pointer"
              >
                {t("Report Hazard", language)}
              </button>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className={`p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/10 space-y-2 ${getTicketBorderColor(ticket.status)} pl-3`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 font-mono">{t("CODE:", language)} {ticket.referenceId}</span>
                      <h3 className="text-xs font-bold text-slate-700 leading-snug"><TranslatedText text={ticket.subject} language={language} /></h3>
                      <p className="text-[10px] text-blue-600 font-semibold hover:underline cursor-pointer" onClick={() => onSelectRoad(ticket.roadId)}>
                        {t(ticket.roadName.split(' (')[0], language)}
                      </p>
                    </div>
                    <div className="shrink-0">{getStatusBadge(ticket.status)}</div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    <TranslatedText text={ticket.description} language={language} />
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100/50 text-[10px] text-slate-445">
                    <div className="flex flex-col text-[10px]">
                      <span>{t("Report by:", language)} <strong className="text-slate-600">{t(ticket.citizenName, language)}</strong></span>
                      <span>{ticket.date}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeTicket(ticket.id);
                      }}
                      className={`px-2 py-0.5 rounded-lg border transition duration-150 flex items-center gap-1 font-semibold text-[10px] cursor-pointer hover:shadow-3xs ${
                        likedTicketIds[ticket.id]
                           ? 'bg-rose-50 border-rose-200 text-rose-600'
                           : 'bg-white border-slate-150 text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                      title={likedTicketIds[ticket.id] ? "Remove endorsement" : "Endorse report"}
                    >
                      <Heart className={`w-3 h-3 transition-transform ${likedTicketIds[ticket.id] ? 'fill-rose-500 text-rose-600 scale-110' : 'text-slate-400'}`} />
                      <span>{ticket.likes || 0}</span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredTickets.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <CheckCircle className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">{t("All clear!", language)}</p>
                  <p className="text-[10px] text-slate-450 mt-1">{t("No outstanding hazards reported in this selection.", language)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
