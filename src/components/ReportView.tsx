import React, { useState } from 'react';
import { Road, Complaint, IssueCategory, TicketStatus } from '../types';
import { t, Language } from '../utils/translations';
import { TranslatedText } from './TranslatedText';
import { 
  AlertTriangle, 
  Search, 
  MapPin, 
  Building, 
  CheckCircle, 
  Clock, 
  UploadCloud, 
  Mic, 
  MicOff, 
  Send, 
  ChevronRight, 
  Info, 
  RefreshCw,
  PlusCircle,
  X,
  Sparkles,
  Milestone,
  Heart
} from 'lucide-react';

interface ReportViewProps {
  roads: Road[];
  tickets: Complaint[];
  likedTicketIds: Record<string, boolean>;
  onLikeTicket: (ticketId: string) => void;
  preSelectedRoadName: string | null;
  onSubmitNewTicket: (newTicket: Complaint) => void;
  language?: Language;
}

export default function ReportView({ 
  roads, 
  tickets, 
  likedTicketIds,
  onLikeTicket,
  preSelectedRoadName, 
  onSubmitNewTicket,
  language = 'en'
}: ReportViewProps) {
  
  // State management for Form
  const [subject, setSubject] = useState('');
  const [selectedRoadId, setSelectedRoadId] = useState<string>(() => {
    if (preSelectedRoadName) {
      const match = roads.find(r => r.name === preSelectedRoadName);
      return match ? match.id : '';
    }
    return '';
  });
  const [isAutoRouting, setIsAutoRouting] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [description, setDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [category, setCategory] = useState<IssueCategory>('Pothole');
  const [analysisResult, setAnalysisResult] = useState<{
    authority: string;
    reason: string;
    confidence: 'High' | 'Medium' | 'Calculated';
    indicatorsDetected: string[];
  } | null>(null);
  const [selectedAuthority, setSelectedAuthority] = useState('');

  // Automated routing analyzer when fields change
  React.useEffect(() => {
    if (!selectedRoadId) {
      setAnalysisResult(null);
      return;
    }

    setIsAnalyzing(true);
    const timeout = setTimeout(() => {
      const road = roads.find(r => r.id === selectedRoadId);
      if (!road) {
        setIsAnalyzing(false);
        return;
      }

      const combinedText = `${subject} ${description}`.toLowerCase();
      let matchedAuthority = 'Municipal Corporation (City Zone)';
      let matchedReason = 'Routed to local standard municipal division.';
      let confidence: 'High' | 'Medium' | 'Calculated' = 'Medium';
      const indicators: string[] = [];

      // Check for roadway traits
      if (road.type === 'NH') {
        indicators.push('National Highway Corridor');
        matchedAuthority = 'National Highways Authority of India (NHAI)';
        matchedReason = `NH-${road.name.match(/\d+/)?.[0] || 'Central'} is maintained exclusively by the Central Government. Under the National Highways Act, NHAI is responsible for all structural repairs, signs, and physical lighting.`;
        confidence = 'High';
      } else if (road.type === 'SH') {
        indicators.push('State Highway Artery');
        matchedAuthority = 'State Public Works Department (PWD)';
        matchedReason = `This stretch is classified as a State Highway. PWD has direct jurisdictional oversight to handle routine road works, engineering adjustments, and bypass clearances.`;
        confidence = 'High';
      } else {
        // Local/Municipal - classify by content indicator or category
        const isWaterlogging = category === 'Waterlogging' || combinedText.includes('drain') || combinedText.includes('flood') || combinedText.includes('clogged') || combinedText.includes('sewer') || combinedText.includes('waterlogging') || combinedText.includes('overflow') || combinedText.includes('water');
        const isElectrical = category === 'Broken Street Lights' || combinedText.includes('light') || combinedText.includes('electricity') || combinedText.includes('lamp') || combinedText.includes('dark') || combinedText.includes('bulb') || combinedText.includes('wire');
        
        if (isWaterlogging) {
          indicators.push('Fluid/Water Stagnation');
          matchedAuthority = 'Municipal Corporation (Urban Drainage)';
          matchedReason = `Waterlogging / storm-water drain clogging detected. Routed to Municipal Urban Drainage division to prevent further street inundation.`;
          confidence = 'High';
        } else if (isElectrical) {
          indicators.push('Electrical / Illumination Hazard');
          matchedAuthority = 'Municipal Corporation (East Zone Division)';
          matchedReason = `Civic power/lighting hazard detected. Routing to the localized East Zone Municipal Electrical board for electrical repair crews.`;
          confidence = 'High';
        } else {
          indicators.push('Local Civic Pavement Pothole');
          matchedAuthority = 'Municipal Corporation (City Zone)';
          matchedReason = `Routine city street damage detected. Routed to local City Zone civil engineering desk for quick asphalt resurfaced.`;
          confidence = 'Medium';
        }
      }

      setAnalysisResult({
        authority: matchedAuthority,
        reason: matchedReason,
        confidence,
        indicatorsDetected: indicators
      });

      if (isAutoRouting) {
        setSelectedAuthority(matchedAuthority);
      }
      setIsAnalyzing(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [selectedRoadId, category, subject, description, isAutoRouting, roads]);

  // Success state feedback
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [newlyCreatedTicket, setNewlyCreatedTicket] = useState<Complaint | null>(null);
  const [formValidationError, setFormValidationError] = useState<string | null>(null);

  // Suggested categories
  const categories: IssueCategory[] = ['Pothole', 'Waterlogging', 'Damaged Road', 'Broken Street Lights', 'Lack of Signage'];

  // Handler for mock Image Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setUploadedImage(objectUrl);
    }
  };

  // Simulated Speech-to-Text Transcription
  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate real-time audio analysis typing out a structured statement
      setTimeout(() => {
        const transcribes = [
          "Multiple narrow cracks are propagating into a deep shoulder pothole near the highway km 12 bypass mark.",
          "Clogged storm drains near the metro crossing causing severe water accumulation after today's shower.",
          "Severe deterioration of dense bituminous concrete, leaving gravel and loose stones scattered on the street lane.", 
          "The electrical junction box is completely exposed and five consecutive street lights have burned out."
        ];
        const randomPhrase = transcribes[Math.floor(Math.random() * transcribes.length)];
        setDescription(prev => prev ? prev + " " + randomPhrase : randomPhrase);
        setIsRecording(false);
      }, 3200);
    }
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setFormValidationError('Please complete both a summary title and a detailed incident description.');
      setTimeout(() => setFormValidationError(null), 5000);
      return;
    }
    if (!selectedRoadId) {
      setFormValidationError('Please specify the Affected Roadway from the selector.');
      setTimeout(() => setFormValidationError(null), 5000);
      return;
    }
    if (!isAutoRouting && !selectedAuthority) {
      setFormValidationError('Please choose a Maintenance Agency or enable Smart Auto-Routing.');
      setTimeout(() => setFormValidationError(null), 5000);
      return;
    }
    setFormValidationError(null);

    const chosenRoad = roads.find(r => r.id === selectedRoadId);
    if (!chosenRoad) {
      setFormValidationError('Invalid roadway selected.');
      setTimeout(() => setFormValidationError(null), 5000);
      return;
    }

    const finalAuthority = isAutoRouting && analysisResult
      ? analysisResult.authority
      : selectedAuthority || (analysisResult?.authority || chosenRoad.authority);

    // Generate random reference code
    const generatedRefId = `RW-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newId = `comp-${Date.now()}`;

    const newTicket: Complaint = {
      id: newId,
      roadId: chosenRoad.id,
      roadName: chosenRoad.name,
      subject,
      description,
      category,
      authority: finalAuthority,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      imageUrl: uploadedImage || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400',
      citizenName: 'You (Anonymous)',
      referenceId: generatedRefId
    };

    // Callback to parent container to register ticket globally
    onSubmitNewTicket(newTicket);
    setNewlyCreatedTicket(newTicket);
    setHasSubmitted(true);

    // Reset Form
    setSubject('');
    setDescription('');
    setUploadedImage(null);
    setSelectedRoadId('');
    setSelectedAuthority('');
  };

  const getStatusProgressPercent = (status: TicketStatus) => {
    switch (status) {
      case 'Resolved': return 100;
      case 'In Progress': return 66;
      case 'Under Review': return 33;
      default: return 10;
    }
  };

  const getStatusColorClass = (status: TicketStatus) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-500 text-white';
      case 'In Progress': return 'bg-blue-500 text-white';
      case 'Under Review': return 'bg-amber-500 text-white';
      default: return 'bg-rose-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upper Descriptive Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">{t("Report Public Hazards", language)}</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {t("Submit photos, locations, and safety risks. Our automated system routes reports to local civil zones instantly.", language)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Form Column (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-rose-500" /> {t("File New Complaint", language)}
            </h2>
            <span className="text-xs text-slate-400 font-medium">{t("Step 1 of 1", language)}</span>
          </div>

          {/* Quick Success Message */}
          {hasSubmitted && newlyCreatedTicket && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">{t("Issue Successfully Submitted!", language)}</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed mt-0.5">
                    {t("Your complaint has been synchronized with the", language)} <strong>{t("Roadwatch National Gateway", language)}</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-emerald-150 inline-block text-xs text-slate-700">
                <span className="text-slate-400">{t("Tracking Code:", language)}</span> <strong className="font-mono text-emerald-800 text-xs">{newlyCreatedTicket.referenceId}</strong>
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-400">{t("Routed to:", language)}</span> <strong className="text-slate-700">{t(newlyCreatedTicket.authority, language)}</strong>
              </div>

              <div>
                <button 
                  onClick={() => setHasSubmitted(false)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> {t("File another hazard report", language)}
                </button>
              </div>
            </div>
          )}

          {formValidationError && (
            <div className="p-3 bg-rose-50/70 border border-rose-150 text-rose-800 text-xs rounded-xl font-semibold animate-fadeIn flex items-center justify-between">
              <span>⚠️ {t(formValidationError, language)}</span>
              <button type="button" onClick={() => setFormValidationError(null)} className="text-rose-500 hover:text-rose-800">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <form onSubmit={handleFormSubmission} className="space-y-4">
            
            {/* Subject Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 block">{t("Short Summary of Hazard", language)}</label>
              <input
                type="text"
                required
                placeholder={t("e.g. Broken pothole outside Metro exit or Damaged street guard rail...", language)}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs transition"
              />
            </div>

            {/* Quick Category Selection pills */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 block">{t("Select Hazard Category", language)}</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      category === cat
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {t(cat, language)}
                  </button>
                ))}
              </div>
            </div>

            {/* Roads selection Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col justify-start">
                <label className="text-xs font-semibold text-slate-500 block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {t("Affected Roadway", language)}
                </label>
                <select
                  value={selectedRoadId}
                  onChange={(e) => setSelectedRoadId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs text-slate-700 transition"
                >
                  <option value="">{t("-- Choose Roadway --", language)}</option>
                  {roads.map(r => (
                    <option key={r.id} value={r.id}>{t(r.name, language)}</option>
                  ))}
                </select>
              </div>

              {/* Maintenance Authority Selection */}
              <div className="space-y-1.5 flex flex-col justify-start">
                <label className={`text-xs font-semibold block flex items-center gap-1 transition-colors ${
                  isAutoRouting ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Building className="w-3.5 h-3.5 text-slate-400" /> {t("Maintenance Agency", language)}
                </label>
                <div className="space-y-2 relative">
                  <select
                    disabled={isAutoRouting}
                    value={selectedAuthority}
                    onChange={(e) => setSelectedAuthority(e.target.value)}
                    className={`w-full px-3 py-2 border bg-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs transition-all ${
                      isAutoRouting 
                        ? 'opacity-25 bg-slate-100 cursor-not-allowed text-slate-400 border-dashed line-through decoration-slate-400 decoration-2' 
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <option value="">{t("-- Choose Maintenance Agency --", language)}</option>
                    <option value="National Highways Authority of India (NHAI)">{t("National Highways Authority of India (NHAI)", language)}</option>
                    <option value="State Public Works Department (PWD)">{t("State Public Works Department (PWD)", language)}</option>
                    <option value="Municipal Corporation (City Zone)">{t("Municipal Corporation (City Zone)", language)}</option>
                    <option value="Municipal Corporation (East Zone Division)">{t("Municipal Corporation (East Zone Division)", language)}</option>
                    <option value="Municipal Corporation (Urban Drainage)">{t("Municipal Corporation (Urban Drainage)", language)}</option>
                  </select>
                  
                  {isAutoRouting && (
                    <div className="absolute inset-0 bg-slate-100/35 flex items-center justify-center pointer-events-none rounded-xl border border-dashed border-rose-300">
                      <span className="text-[9.5px] font-extrabold text-rose-600 tracking-wider uppercase bg-white border border-rose-200 px-2.5 py-1 rounded-lg shadow-3xs flex items-center gap-1 animate-pulse">
                        🚫 {t("Selection Canceled", language)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Auto-Routing Choice & Analysis Display Section */}
            <div className="bg-slate-50/70 p-4.5 rounded-xl border border-slate-200/80 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" /> {t("AI Agency Routing Engine", language)}
                  </h3>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">{t("Auto-analyzes roadway characteristics, category tags, and typed description to route to correct jurisdictional desk.", language)}</p>
                </div>
                
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 self-start sm:self-auto select-none">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoRouting(true);
                      if (analysisResult) {
                        setSelectedAuthority(analysisResult.authority);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                      isAutoRouting 
                        ? 'bg-slate-800 text-white shadow-3xs' 
                        : 'bg-white text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {t("Auto Dispatch", language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAutoRouting(false)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                      !isAutoRouting 
                        ? 'bg-amber-600 text-white shadow-3xs' 
                        : 'bg-white text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {t("Manual Select", language)}
                  </button>
                </div>
              </div>

              {!selectedRoadId ? (
                <div className="p-1 text-slate-500 text-[11px] flex gap-2 items-center">
                  <Info className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t("Choose an Affected Roadway above to activate automated routing.", language)}</span>
                </div>
              ) : isAnalyzing ? (
                <div className="py-2 flex items-center gap-2.5 text-xs text-blue-600 font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                  <span>{t("Analyzing typed hazard elements & checking public geofences...", language)}</span>
                </div>
              ) : analysisResult ? (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start sm:items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{t("Respective Authority:", language)}</span>
                      <strong className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-150 px-2.5 py-0.5 rounded-lg leading-tight block">
                        {t(analysisResult.authority, language)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] select-none font-bold self-start sm:self-auto">
                      <span className="text-slate-400">{t("Confidence:", language)}</span>
                      <span className={`px-2 py-0.5 rounded border leading-none ${
                        analysisResult.confidence === 'High' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-250' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {t(analysisResult.confidence, language)} {t("Match", language)}
                      </span>
                    </div>
                  </div>

                  {analysisResult.indicatorsDetected.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{t("Detected Indicators:", language)}</span>
                      {analysisResult.indicatorsDetected.map((ind, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-200/60 border border-slate-300 text-slate-600 px-2 py-0.5 rounded-md">
                          ⚡ {t(ind, language)}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wide block">{t("Taxpayer Jurisdiction Reasoning:", language)}</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {t(analysisResult.reason, language)}
                    </p>
                  </div>

                  {isAutoRouting && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 leading-normal">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> {t("Direct auto-routing active. Report will be securely emailed and dispatched to this agency.", language)}
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-1 text-slate-500 text-xs">
                  <span>{t("Routing analysis is awaiting inputs. Choose road segment to populate.", language)}</span>
                </div>
              )}
            </div>

            {/* Detailed Description with Audio Transcription Trigger */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-500 block">{t("Detailed Description", language)}</label>
                
                {/* Audio transcription activator */}
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 ${
                    isRecording 
                      ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5 text-red-600" /> : <Mic className="w-3.5 h-3.5 text-slate-500" />}
                  {isRecording ? t("Listening (pulsing)...", language) : t("Simulate Audio Type-in", language)}
                </button>
              </div>

              {isRecording && (
                <div className="flex items-center gap-1 bg-red-50/50 p-2.5 rounded-xl border border-red-100 text-xs text-red-600 text-center animate-fadeIn">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                  <span className="font-semibold text-[11px]">{t("Speaking: \"Cracks propagating into shoulder potholes...\" transcribing soon...", language)}</span>
                </div>
              )}

              <textarea
                required
                rows={4}
                placeholder={t("Give descriptive particulars (e.g., street location identifiers, depth estimate, hazard level for nighttime travel)...", language)}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs transition"
              />
            </div>

            {/* Drag & Drop Visual uploading container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-xs font-semibold text-slate-500 block">{t("Upload Hazard Photo Evidence", language)}</label>
                
                {!uploadedImage ? (
                  <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-5 hover:bg-slate-50 hover:border-slate-300 transition text-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-600">{t("Drag or click to choose photo file", language)}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{t("JPEG, PNG up to 10MB formats accepted", language)}</p>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={uploadedImage} 
                        alt="Local file upload preview"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-650 truncate max-w-[200px]">evidence_scene_img_local.png</p>
                        <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                          <CheckCircle className="w-3.5 h-3.5" /> {t("Ready for upload cache", language)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                    >
                      <X className="w-4 h-4 text-slate-500 hover:text-rose-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" /> {t("Submit Sworn Hazard Incident Report", language)}
            </button>

          </form>

        </div>

        {/* Previous Complaint Tracking Side (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800">{t("Your Active Complaints", language)}</h3>
                <p className="text-xs text-slate-500">{t("Milestones and logs of reports under your active session.", language)}</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono font-medium">
                {tickets.length} {t("total", language)}
              </span>
            </div>

            <div className="space-y-4 divide-y divide-slate-100 max-h-[560px] overflow-y-auto pr-1">
              {tickets.map((ticket, idx) => {
                const percent = getStatusProgressPercent(ticket.status);
                return (
                  <div key={ticket.id} className={`space-y-3 pt-4 first:pt-0`}>
                    
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <span className="text-[10px] font-mono text-slate-450 block">{t("Ref:", language)} {ticket.referenceId}</span>
                        <h4 className="text-xs font-bold text-slate-700 leading-tight block"><TranslatedText text={ticket.subject} language={language} /></h4>
                        <p className="text-[11px] text-blue-600 font-semibold">{t(ticket.roadName, language)}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-bold ${getStatusColorClass(ticket.status)}`}>
                        {t(ticket.status, language)}
                      </span>
                    </div>

                    {/* Progress tracking line bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>{t("Jurisdiction:", language)} <strong>{t(ticket.authority, language)}</strong></span>
                        <span>{percent}% {t("Completed", language)}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-400"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Collated details footer */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100/40 text-[10px] text-slate-400">
                      <div className="flex flex-col text-[10px]">
                        <span>{t("Report by:", language)} <strong className="text-slate-600">{t(ticket.citizenName, language)}</strong></span>
                        <span>{t("Filed by:", language)} {ticket.date}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikeTicket(ticket.id);
                        }}
                        className={`px-2 py-0.5 rounded-lg border transition duration-150 flex items-center gap-1 font-semibold text-[10px] cursor-pointer hover:shadow-3xs ${
                          likedTicketIds[ticket.id]
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'bg-white border-slate-150 text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        title={likedTicketIds[ticket.id] ? t("Remove endorsement", language) : t("Endorse report", language)}
                      >
                        <Heart className={`w-3 h-3 transition-transform ${likedTicketIds[ticket.id] ? 'fill-rose-500 text-rose-600 scale-110' : 'text-slate-400'}`} />
                        <span>{ticket.likes || 0}</span>
                      </button>
                    </div>

                  </div>
                );
              })}

              {tickets.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <CheckCircle className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-650">{t("No complaints registered yet.", language)}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t("Use the lodge form above to submit your first hazard ticket.", language)}</p>
                </div>
              )}
            </div>

          </div>

          {/* Legal disclaimer box */}
          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/20 text-[11px] text-rose-700 leading-normal space-y-1">
            <span className="font-bold block uppercase tracking-wider text-rose-800">{t("Public Responsibility Notice", language)}</span>
            <p>
              {t("Information filed on RoadLens is logged directly under public oversight. Submitting falsified information is subject to penalty under Section 177 of Indian Penal Code. Always upload clear geo-tagged snapshots when possible.", language)}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
