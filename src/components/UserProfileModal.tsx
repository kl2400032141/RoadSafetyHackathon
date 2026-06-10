import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, ShieldCheck, Mail, Calendar, Award, AlertCircle, Heart, Clock, FileText, ChevronRight } from 'lucide-react';
import { Complaint } from '../types';
import { TranslatedText } from './TranslatedText';
import { t as translate, Language } from '../utils/translations';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string; loggedIn: boolean } | null;
  tickets: Complaint[];
  language: 'en' | 'hi';
  onSelectRoad: (roadId: string) => void;
}

export default function UserProfileModal({ isOpen, onClose, user, tickets, language, onSelectRoad }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'reports'>('profile');

  if (!user) return null;

  const translations = {
    en: {
      profileHub: "Citizen Assayer Hub",
      profileDetails: "Profile Details",
      submittedReports: "My Submitted Reports",
      verificationStatus: "Verification Status",
      verifiedResident: "Fully Verified Citizen Resident",
      emailLabel: "Registered Email",
      assignedRole: "Citizen Assayer Level",
      roleValue: "Class-A Civil Auditor (Tier 1)",
      joinedDate: "Joined RoadLens Network",
      joinedVal: "June 10, 2026",
      civicScore: "Civic Integrity Rating",
      scoreVal: "Solid (98 / 100)",
      scoreDesc: "Reflects reporting accuracy, verified coordinates usage, and active peer audits.",
      noReports: "You have not filed any safety tickets yet in this session.",
      noReportsSub: "Go to 'Report Issues' tab and submit a pothole, lighting gap, or broken divider to file your first official case.",
      filedOn: "Filed on",
      viewRoad: "View Road Segment",
      endorsements: "Endorsements Received",
      statusText: "Status"
    },
    hi: {
      profileHub: "नागरिक परीक्षण केंद्र",
      profileDetails: "प्रोफ़ाइल विवरण",
      submittedReports: "मेरे सबमिट किए गए मामले",
      verificationStatus: "सत्यापन स्थिति",
      verifiedResident: "पूर्णतः सत्यापित नागरिक निवासी",
      emailLabel: "पंजीकृत ईमेल",
      assignedRole: "नागरिक परीक्षक स्तर",
      roleValue: "क्लास-ए सिविल ऑडिटर (टियर 1)",
      joinedDate: "रोडलेंस नेटवर्क में शामिल होने की तिथि",
      joinedVal: "10 जून, 2026",
      civicScore: "नागरिक सत्यनिष्ठा रेटिंग",
      scoreVal: "मजबूत (98 / 100)",
      scoreDesc: "यह रिपोर्टिंग की सटीकता, सत्यापित निर्देशांकों के उपयोग और सक्रिय सहकर्मी ऑडिट को दर्शाता है।",
      noReports: "आपने इस सत्र में अभी तक कोई सुरक्षा टिकट दर्ज नहीं किया है।",
      noReportsSub: "अपना पहला आधिकारिक मामला दर्ज करने के लिए 'समस्या रिपोर्ट करें' टैब पर जाएं और गड्ढा, लाइट की कमी या टूटे हुए डिवाइडर को सबमिट करें।",
      filedOn: "दर्ज की तिथि",
      viewRoad: "सड़क खंड देखें",
      endorsements: "प्राप्त अनुमोदन",
      statusText: "स्थिति"
    }
  };

  const t = translations[language];

  // Filter tickets that belong to this citizen user
  const userTickets = tickets.filter(
    (ticket) =>
      ticket.citizenName === user.name ||
      ticket.citizenName === 'Citizen Resident #8821' ||
      ticket.citizenName === 'Arjun Mehta' // Show mock data report initially as part of their dynamic profile for richness
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border border-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-100';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10 flex flex-col max-h-[85vh]"
          >
            {/* Header branding band */}
            <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">{t.profileHub}</h3>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">{user.name}</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition duration-150 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs bar */}
            <div className="flex border-b border-slate-200 bg-slate-50/50">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition duration-150 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.profileDetails}
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition duration-150 cursor-pointer ${
                  activeTab === 'reports'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.submittedReports} ({userTickets.length})
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Profile Details Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Verification Banner */}
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex gap-3.5 items-start">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">{t.verificationStatus}</h4>
                      <p className="text-xs text-blue-700/90 font-medium mt-0.5">{t.verifiedResident}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Coordinates detected & validated via real-time satellite telemetry alignment.
                      </p>
                    </div>
                  </div>

                  {/* Profile Key Value items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/30">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">{t.emailLabel}</span>
                      <span className="text-xs font-bold text-slate-700 block mt-1 truncate">{user.email}</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/30">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">{t.joinedDate}</span>
                      <span className="text-xs font-bold text-slate-700 block mt-1">{t.joinedVal}</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/30">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">{t.assignedRole}</span>
                      <span className="text-xs font-bold text-slate-700 block mt-1">{t.roleValue}</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/30">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">{t.civicScore}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-slate-700">{t.scoreVal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score Description Disclaimer */}
                  <p className="text-[10px] text-slate-400 text-center leading-normal max-w-sm mx-auto">
                    {t.scoreDesc}
                  </p>
                </div>
              )}

              {/* Submitted Reports Tab */}
              {activeTab === 'reports' && (
                <div className="space-y-3.5 animate-fadeIn">
                  {userTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 rounded-xl border border-slate-150 bg-slate-50/30 space-y-3 hover:shadow-xs transition duration-150">
                      
                      {/* Ticket Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Ref: {ticket.referenceId}</span>
                            <span className={`text-[9.5px] px-2 py-0.5 rounded-lg font-bold ${getStatusColor(ticket.status)}`}>
                              {translate(ticket.status, language)}
                            </span>
                          </div>
                          
                          <h4 className="font-bold text-xs text-slate-800 leading-snug mt-1">
                            <TranslatedText text={ticket.subject} language={language} />
                          </h4>
                          
                          <p className="text-[10.5px] text-blue-600 font-semibold mt-0.5">
                            {translate(ticket.roadName.split(' (')[0], language)}
                          </p>
                        </div>
                      </div>

                      {/* Description body */}
                      <p className="text-xs text-slate-500 leading-relaxed pl-1 border-l-2 border-slate-200">
                        <TranslatedText text={ticket.description} language={language} />
                      </p>

                      {/* Footer actions of report item */}
                      <div className="flex items-center justify-between text-[10px] text-slate-450 pt-2 border-t border-slate-100/60">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t.filedOn}: {ticket.date}</span>
                        
                        <button
                          onClick={() => {
                            onSelectRoad(ticket.roadId);
                            onClose();
                          }}
                          className="flex items-center gap-0.5 text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          <span>{t.viewRoad}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Empty state fallback */}
                  {userTickets.length === 0 && (
                    <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl">
                      <AlertCircle className="w-8 h-8 text-slate-350 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-700">{t.noReports}</h4>
                      <p className="text-xs text-slate-450 leading-relaxed max-w-xs mx-auto">{t.noReportsSub}</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
