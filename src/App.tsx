import React, { useState, useEffect } from 'react';
import { MOCK_ROADS, MOCK_TICKETS } from './data/mockData';
import { Road, Complaint } from './types';
import DashboardView from './components/DashboardView';
import SearchView from './components/SearchView';
import ReportView from './components/ReportView';
import MapView from './components/MapView';
import BotView from './components/BotView';
import HomeView from './components/HomeView';
import LoginModal from './components/LoginModal';
import UserProfileModal from './components/UserProfileModal';
import { VoiceAssistProvider, VoiceAssistToggle } from './components/VoiceAssist';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { API_KEY } from './components/GoogleMapContainer';
import { generateLocationBasedData, getFallbackCoordsAndName } from './utils/roadGenerator';
import { t } from './utils/translations';
import {
  Compass,
  LayoutDashboard,
  Search,
  AlertTriangle,
  Map,
  Bot,
  ShieldAlert,
  CheckCircle,
  Menu,
  X,
  Languages,
  User,
  LogIn,
  LogOut,
  FolderDot,
  UserCircle,
  Home as HomeIcon
} from 'lucide-react';

// Centralised custom initializer component loaded after API provider is ready
function LocationInitializer({
  setRoads,
  setTickets,
  setUserCoords,
  setLocationName
}: {
  setRoads: React.Dispatch<React.SetStateAction<Road[]>>;
  setTickets: React.Dispatch<React.SetStateAction<Complaint[]>>;
  setUserCoords: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const geocodingLib = useMapsLibrary('geocoding');
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    if (initDone) return;

    const useStaticFallback = (lat: number, lng: number, fallbackName: string) => {
      const data = generateLocationBasedData(lat, lng, fallbackName);
      setRoads(data.roads);
      setTickets(data.tickets);
      setUserCoords({ lat, lng });
      setLocationName(`${fallbackName} Region Corridor`);
      setInitDone(true);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserCoords({ lat, lng });

          if (!geocodingLib) {
            // If library doesn't load or is delayed, do static fallback
            useStaticFallback(lat, lng, 'Detected Area');
            return;
          }

          try {
            const geocoder = new geocodingLib.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                let city = '';
                let suburb = '';
                for (const component of results[0].address_components) {
                  if (component.types.includes('locality')) {
                    city = component.long_name;
                  } else if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                    suburb = component.long_name;
                  } else if (!city && component.types.includes('administrative_area_level_2')) {
                    city = component.long_name;
                  }
                }
                const displayPlace = suburb || city || 'Local Corridor';
                setLocationName(`${displayPlace} Region Corridor`);

                const data = generateLocationBasedData(lat, lng, displayPlace);
                setRoads(data.roads);
                setTickets(data.tickets);
              } else {
                console.warn('Geocoding service returned status:', status, 'Using coordinate fallback.');
                const data = generateLocationBasedData(lat, lng, 'Local Corridor');
                setRoads(data.roads);
                setTickets(data.tickets);
                setLocationName('Local Corridor Region');
              }
              setInitDone(true);
            });
          } catch (e) {
            console.error('Failed to trigger geocoder. Geocoding API may be disabled:', e);
            useStaticFallback(lat, lng, 'Local Corridor');
          }
        },
        (error) => {
          console.warn('Geolocation failed or denied, keeping default location.', error);
          const defaultLat = 12.9716;
          const defaultLng = 77.5946;
          setUserCoords({ lat: defaultLat, lng: defaultLng });

          if (!geocodingLib) {
            useStaticFallback(defaultLat, defaultLng, 'Bengaluru');
            return;
          }

          try {
            const geocoder = new geocodingLib.Geocoder();
            geocoder.geocode({ location: { lat: defaultLat, lng: defaultLng } }, (results, status) => {
              let cityName = 'Bengaluru';
              if (status === 'OK' && results?.[0]) {
                cityName = results[0].address_components.find(c => c.types.includes('locality'))?.long_name || 'Bengaluru';
              }
              const data = generateLocationBasedData(defaultLat, defaultLng, cityName);
              setRoads(data.roads);
              setTickets(data.tickets);
              setLocationName(`${cityName} Region Corridor`);
              setInitDone(true);
            });
          } catch (e) {
            console.error('Failed to geocode default coordinates:', e);
            useStaticFallback(defaultLat, defaultLng, 'Bengaluru');
          }
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
      );
    } else {
      // No geolocation support
      const defaultLat = 12.9716;
      const defaultLng = 77.5946;
      useStaticFallback(defaultLat, defaultLng, 'Bengaluru');
    }
  }, [geocodingLib, initDone]);

  return null;
}

const translations = {
  en: {
    home: "Home Portal",
    dashboard: "Dashboard",
    search: "Search Road Details",
    report: "Report Issues",
    map: "Road Map",
    bot: "Assistance Bot",
    hub: "Citizen Operations Hub",
    profile: "Assayer Profile",
    resident: "Citizen Resident #8821",
    safety: "RoadLens AI — Safety Transparency Corridor",
    footerDesc: "Empowering citizens to audit public construction budget & report safety concerns.",
    sourceDisclosures: "Source Disclosures",
    auditAssistant: "Audit Assistant",
    reportHazard: "Report Hazard",
    clearRoad: "Clear road oversight",
    sourceAlert: "Civic budget allocations are sourced from verified local agency projects in Karnataka."
  },
  hi: {
    home: "मुख्य पृष्ठ",
    dashboard: "डैशबोर्ड",
    search: "सड़क विवरण खोजें",
    report: "समस्या रिपोर्ट करें",
    map: "सड़क मानचित्र",
    bot: "सहायता बॉट",
    hub: "नागरिक संचालन केंद्र",
    profile: "परखकर्ता प्रोफ़ाइल",
    resident: "नागरिक निवासी #8821",
    safety: "RoadLens AI — सुरक्षा पारदर्शिता कॉरिडोर",
    footerDesc: "सार्वजनिक निर्माण बजट का ऑडिट करने और सुरक्षा चिंताओं की रिपोर्ट करने के लिए नागरिकों को सशक्त बनाना।",
    sourceDisclosures: "स्रोत प्रकटीकरण",
    auditAssistant: "ऑडिट सहायक",
    reportHazard: "खतरे की रिपोर्ट",
    clearRoad: "सड़क की स्पष्ट निगरानी",
    sourceAlert: "नागरिक बजट आवंटन कर्नाटक में सत्यापित स्थानीय एजेंसी परियोजनाओं से प्राप्त होते हैं।"
  },
  
};

const activeTabLabels: Record<string, keyof typeof translations.en> = {
  'Home': 'home',
  'Dashboard': 'hub',
  'Search Road Details': 'search',
  'Report Issues': 'report',
  'Map': 'map',
  'AI Bot': 'bot'
};

export default function App() {
  // Navigation active state: 'Home' | 'Dashboard' | 'Search Road Details' | 'Report Issues' | 'Map' | 'AI Bot'
  const [activeTab, setActiveTab] = useState<string>('Home');

  // User authentication state loading from localStorage
  const [user, setUser] = useState<{ name: string; email: string; loggedIn: boolean } | null>(() => {
    const saved = localStorage.getItem('roadlens_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLoginSuccess = (email: string, name?: string) => {
    const loggedUser = {
      name: name || "Citizen User",
      email: email,
      loggedIn: true
    };
    setUser(loggedUser);
    localStorage.setItem('roadlens_user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('roadlens_user');
    setIsProfileDropdownOpen(false);
  };

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global shared state for Roads and Tickets so submissions immediately reflect
  const [roads, setRoads] = useState<Road[]>(MOCK_ROADS);
  const [tickets, setTickets] = useState<Complaint[]>(MOCK_TICKETS);

  // User detected coordinates
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Dynamic header region name
  const [locationName, setLocationName] = useState<string>('Bengaluru Region Corridor');

  // Selected road tracker (shared between Dashboard, Search, and Map)
  const [selectedRoadId, setSelectedRoadId] = useState<string | null>(null);

  // Preset road for issue filing redirection
  const [preSelectedRoadName, setPreSelectedRoadName] = useState<string | null>(null);

  // Local tracking of ticket IDs liked/endorsed by the current resident
  const [likedTicketIds, setLikedTicketIds] = useState<Record<string, boolean>>({});

  // Language state supporting English and Hindi
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Centralised search handler using Google Geocoder to seek roads anywhere in the world
  const handleSearchLocation = async (query: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const executeFallback = () => {
        console.warn("Geocoding failed or disabled. Executing resilient fallback match for:", query);
        const fallback = getFallbackCoordsAndName(query);
        setLocationName(`${fallback.name} Region Corridor`);
        setUserLocation({ lat: fallback.lat, lng: fallback.lng });

        const data = generateLocationBasedData(fallback.lat, fallback.lng, fallback.name);
        setRoads(data.roads);
        setTickets(data.tickets);

        // Auto-select the first newly generated road!
        if (data.roads.length > 0) {
          setSelectedRoadId(data.roads[0].id);
        }
        resolve(true);
      };

      if (!window.google || !window.google.maps) {
        executeFallback();
        return;
      }

      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: query }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const lat = location.lat();
            const lng = location.lng();

            let city = query;
            for (const component of results[0].address_components) {
              if (component.types.includes('locality')) {
                city = component.long_name;
                break;
              } else if (component.types.includes('administrative_area_level_2')) {
                city = component.long_name;
              }
            }

            setLocationName(`${city} Region Corridor`);
            setUserLocation({ lat, lng });

            const data = generateLocationBasedData(lat, lng, city);
            setRoads(data.roads);
            setTickets(data.tickets);

            // Auto-select the first newly generated road!
            if (data.roads.length > 0) {
              setSelectedRoadId(data.roads[0].id);
            }

            resolve(true);
          } else {
            executeFallback();
          }
        });
      } catch (err) {
        console.error("Geocoder threw exception:", err);
        executeFallback();
      }
    });
  };

  // Like / endorse ticket action handler
  const handleLikeTicket = (ticketId: string) => {
    const isAlreadyLiked = likedTicketIds[ticketId];

    setLikedTicketIds(prev => ({
      ...prev,
      [ticketId]: !isAlreadyLiked
    }));

    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          const currentLikes = t.likes || 0;
          return {
            ...t,
            likes: isAlreadyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1
          };
        }
        return t;
      })
    );

    setRoads(prevRoads =>
      prevRoads.map(r => ({
        ...r,
        issues: r.issues.map(iss => {
          if (iss.id === ticketId) {
            const currentLikes = iss.likes || 0;
            return {
              ...iss,
              likes: isAlreadyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1
            };
          }
          return iss;
        })
      }))
    );
  };

  // Handle new ticket submissions
  const handleNewTicketSubmission = (newTicket: Complaint) => {
    // Append to global tickets
    setTickets(prev => [newTicket, ...prev]);

    // Append to corresponding road segment issues
    setRoads(prevRoads =>
      prevRoads.map(r => {
        if (r.id === newTicket.roadId) {
          return {
            ...r,
            issues: [newTicket, ...r.issues]
          };
        }
        return r;
      })
    );
  };

  // Safe tab switcher
  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select road handler (routes user to details instantly)
  const handleSelectRoadAndInspect = (roadId: string | null) => {
    setSelectedRoadId(roadId);
    handleNavigateToTab('Search Road Details');
  };

  // Select road and immediately pre-populate file issue Form redirection
  const handleRaiseIssueForRoadRedirect = (roadName: string) => {
    setPreSelectedRoadName(roadName);
    handleNavigateToTab('Report Issues');
  };

  const currentText = translations[language];

  const navigationItems = [
    { id: 'Dashboard', label: currentText.dashboard, icon: LayoutDashboard },
    { id: 'Search Road Details', label: currentText.search, icon: Search },
    { id: 'Report Issues', label: currentText.report, icon: AlertTriangle },
    { id: 'Map', label: currentText.map, icon: Map },
    { id: 'AI Bot', label: currentText.bot, icon: Bot },
  ];

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <LocationInitializer
        setRoads={setRoads}
        setTickets={setTickets}
        setUserCoords={setUserLocation}
        setLocationName={setLocationName}
      />
      <VoiceAssistProvider language={language}>
        <div className={`w-screen font-sans flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900 ${activeTab === 'Home' ? 'min-h-screen overflow-y-auto bg-slate-50' : 'h-screen overflow-hidden bg-[#F8FAFC]'}`}>

          {activeTab === 'Home' ? (
            /* Redesigned Home Page (Landing Experience) */
            <div className="flex-1 flex flex-col min-h-0">
              {/* Top Navigation Bar */}
              <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
                {/* Logo Section */}
                <div
                  onClick={() => handleNavigateToTab('Home')}
                  className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-xs group-hover:bg-blue-700 transition">
                    RL
                  </div>
                  <span className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition tracking-tight">RoadLens AI</span>
                </div>

                {/* Navbar links */}
                <nav className="hidden md:flex items-center gap-1.5">
                  <button
                    onClick={() => handleNavigateToTab('Home')}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer bg-slate-100 text-blue-600"
                  >
                    {language === 'hi' ? 'होम' : 'Home'}
                  </button>
                  <button
                    onClick={() => handleNavigateToTab('Dashboard')}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer text-slate-650 hover:text-slate-900"
                  >
                    {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                  </button>
                  <button
                    onClick={() => handleNavigateToTab('Search Road Details')}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer text-slate-650 hover:text-slate-905"
                  >
                    {language === 'hi' ? 'विवरण खोजें' : 'Search Road Details'}
                  </button>
                  <button
                    onClick={() => handleNavigateToTab('Map')}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer text-slate-650 hover:text-slate-900"
                  >
                    {language === 'hi' ? 'नक्शा' : 'Road Map'}
                  </button>
                  <button
                    onClick={() => handleNavigateToTab('AI Bot')}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer text-slate-655 hover:text-slate-900"
                  >
                    {language === 'hi' ? 'एआई सहायक' : 'AI Assistant'}
                  </button>
                </nav>

                {/* Navbar right actions */}
                <div className="flex items-center gap-3">
                  <VoiceAssistToggle language={language} />

                  {/* Language Selector */}
                  <div className="relative inline-block text-left" id="lang-selector-parent-home">
                    <button
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-[10.5px] cursor-pointer transition shadow-3xs"
                    >
                      <Languages className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
                    </button>

                    {isLangDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setIsLangDropdownOpen(false)} />
                        <div className="absolute right-0 mt-1.5 w-36 rounded-lg bg-white border border-slate-200 shadow-md py-1 z-45 animate-fadeIn">
                          <button
                            onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 block cursor-pointer transition ${language === 'en' ? 'text-blue-600 bg-blue-50/40' : 'text-slate-700'}`}
                          >
                            English
                          </button>
                          <button
                            onClick={() => { setLanguage('hi'); setIsLangDropdownOpen(false); }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 block cursor-pointer transition ${language === 'hi' ? 'text-blue-600 bg-blue-50/40' : 'text-slate-700'}`}
                          >
                            हिंदी (Hindi)
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative inline-block text-left">
                    {user ? (
                      <>
                        <button
                          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-705 hover:bg-slate-50 font-bold text-[10.5px] cursor-pointer transition shadow-3xs"
                        >
                          <div className="w-4.5 h-4.5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-extrabold shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="hidden sm:inline truncate max-w-28">{user.name}</span>
                        </button>

                        {isProfileDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30 cursor-default" onClick={() => setIsProfileDropdownOpen(false)} />
                            <div className="absolute right-0 mt-1.5 w-44 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-45 animate-fadeIn">
                              <button
                                onClick={() => { setIsUserProfileOpen(true); setIsProfileDropdownOpen(false); }}
                                className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-705 block cursor-pointer transition flex items-center gap-2 border-b border-slate-100"
                              >
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span>{language === 'hi' ? 'मेरी प्रोफ़ाइल' : 'My Profile'}</span>
                              </button>
                              <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50/50 block cursor-pointer transition flex items-center gap-2"
                              >
                                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                                <span>{language === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-[10.5px] cursor-pointer transition shadow-sm hover:shadow"
                      >
                        <LogIn className="w-3.5 h-3.5 shrink-0" />
                        <span>{language === 'hi' ? 'लॉगिन' : 'Login'}</span>
                      </button>
                    )}
                  </div>

                  {/* Mobile Menu Toggle Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-655 hover:bg-slate-100 cursor-pointer md:hidden shrink-0"
                  >
                    {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </header>

              {/* Mobile Drawer */}
              {isMobileMenuOpen && (
                <div className="fixed inset-x-0 top-[56px] bg-white border-b border-slate-200 p-4 z-45 flex flex-col gap-2.5 shadow-md md:hidden animate-fadeIn">
                  <button
                    onClick={() => { handleNavigateToTab('Home'); }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${activeTab === 'Home' ? 'bg-slate-100 text-blue-600' : 'text-slate-655 hover:bg-slate-50'}`}
                  >
                    {language === 'hi' ? 'होम' : 'Home'}
                  </button>
                  <button
                    onClick={() => { handleNavigateToTab('Dashboard'); }}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold text-slate-655 hover:bg-slate-50 transition cursor-pointer"
                  >
                    {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                  </button>
                  <button
                    onClick={() => { handleNavigateToTab('Search Road Details'); }}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold text-slate-655 hover:bg-slate-50 transition cursor-pointer"
                  >
                    {language === 'hi' ? 'विवरण खोजें' : 'Search Road Details'}
                  </button>
                  <button
                    onClick={() => { handleNavigateToTab('Map'); }}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold text-slate-655 hover:bg-slate-50 transition cursor-pointer"
                  >
                    {language === 'hi' ? 'नक्शा' : 'Road Map'}
                  </button>
                  <button
                    onClick={() => { handleNavigateToTab('AI Bot'); }}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold text-slate-655 hover:bg-slate-50 transition cursor-pointer"
                  >
                    {language === 'hi' ? 'एआई सहायक' : 'AI Assistant'}
                  </button>
                </div>
              )}

              {/* Home View component wrapper */}
              <div className="flex-1">
                <HomeView
                  language={language}
                  onNavigateToTab={handleNavigateToTab}
                  onLoginClick={() => setIsLoginModalOpen(true)}
                />
              </div>

            </div>
          ) : (
            /* Normal Application View Layout (Original structure with sidebar) */
            <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

              {/* Left Side Navigation */}
              <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col p-5 shrink-0 justify-between h-full">
                <div className="space-y-8">
                  {/* Logo container area */}
                  <div
                    onClick={() => handleNavigateToTab('Home')}
                    className="flex items-center gap-3 cursor-pointer select-none group"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold tracking-tight text-sm shadow-xs group-hover:bg-blue-700 transition">
                      RL
                    </div>
                    <div>
                      <h1 className="text-base font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition leading-none">RoadLens AI</h1>
                      <p className="text-[10px] text-slate-440 mt-1 font-medium">{currentText.clearRoad}</p>
                    </div>
                  </div>

                  {/* Sidebar nav elements */}
                  <nav className="space-y-1">
                    {/* Add Home link to application sidebar so users can go back to landing page easily */}
                    <div
                      onClick={() => handleNavigateToTab('Home')}
                      className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-xs transition duration-100 ${
                        activeTab === 'Home'
                          ? 'bg-slate-100 text-blue-600 font-bold'
                          : 'text-slate-655 hover:text-slate-950 font-medium'
                      }`}
                    >
                      <HomeIcon className="w-4.5 h-4.5 shrink-0 text-slate-450" />
                      <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
                    </div>

                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleNavigateToTab(item.id)}
                          className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-xs transition duration-100 ${isActive
                              ? 'bg-slate-100 text-blue-600 font-bold'
                              : 'text-slate-655 hover:text-slate-950 font-medium'
                            }`}
                        >
                          <Icon className="w-4.5 h-4.5 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                  </nav>
                </div>

                {/* Simplified Citizen Verification Indicator */}
                {user ? (
                  <div 
                    onClick={() => setIsUserProfileOpen(true)}
                    className="p-3 bg-blue-50/50 rounded-lg border border-blue-150 cursor-pointer hover:bg-blue-55 transition duration-150 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">{currentText.profile}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <span className="text-xs font-bold text-slate-805 block mt-0.5 group-hover:text-blue-600 transition truncate">{user.name}</span>
                    <span className="text-[9.5px] text-slate-500 block truncate font-mono mt-0.5">{user.email}</span>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="p-3 bg-slate-50/70 rounded-lg border border-slate-150 cursor-pointer hover:bg-slate-100/80 transition duration-150 group"
                  >
                    <span className="text-[9px] font-bold text-slate-455 uppercase tracking-wider block">{currentText.profile}</span>
                    <span className="text-xs font-bold text-slate-705 block mt-0.5 group-hover:text-blue-600 transition">{currentText.resident}</span>
                  </div>
                )}
              </aside>

              {/* Mobile Header */}
              <header className="lg:hidden bg-white border-b border-slate-200 py-3.5 px-4 flex items-center justify-between shadow-xs sticky top-0 z-40">
                <div
                  onClick={() => handleNavigateToTab('Home')}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    RL
                  </div>
                  <h2 className="font-bold text-slate-800 text-sm">RoadLens AI</h2>
                </div>

                <div className="flex items-center gap-2">
                  {user ? (
                    <button
                      onClick={() => setIsUserProfileOpen(true)}
                      className="w-8 h-8 bg-blue-50 text-blue-700 font-extrabold text-[11px] rounded-full border border-blue-200 cursor-pointer flex items-center justify-center transition hover:bg-blue-100 focus:outline-none"
                      title="My Profile"
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-[10.5px] font-bold cursor-pointer hover:bg-slate-100 transition duration-150"
                    >
                      {language === 'hi' ? 'लॉगिन' : 'Login'}
                    </button>
                  )}
                  <button
                    onClick={() => handleNavigateToTab('Report Issues')}
                    className="px-2.5 py-1.5 bg-rose-600 text-white text-[10.5px] font-bold rounded-md cursor-pointer"
                  >
                    {currentText.reportHazard}
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-650 hover:bg-slate-100 cursor-pointer"
                  >
                    {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </header>

              {/* Mobile Navigation Drawer */}
              {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[60px] bg-slate-50/98 backdrop-blur-sm z-30 lg:hidden flex flex-col p-4 border-b border-slate-200 animate-fadeIn shadow-xs">
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavigateToTab('Home')}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'Home'
                          ? 'bg-slate-200 text-blue-600'
                          : 'text-slate-655 hover:bg-slate-100'
                      }`}
                    >
                      <HomeIcon className="w-4.5 h-4.5 text-slate-500" />
                      <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
                    </button>

                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigateToTab(item.id)}
                          className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive
                              ? 'bg-slate-200 text-blue-600'
                              : 'text-slate-655 hover:bg-slate-100'
                            }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Main Section Content */}
              <main className="flex-1 flex flex-col overflow-hidden">

                {/* Top Subheader for Section details */}
                <header className="h-14 border-b border-slate-250 bg-white px-4 md:px-8 flex items-center justify-between shadow-3xs shrink-0 z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                    <h2 className="font-bold text-slate-800 text-xs md:text-xs tracking-wider uppercase">
                      {activeTab === 'Dashboard' ? currentText.hub : currentText[activeTabLabels[activeTab] as keyof typeof currentText] || activeTab}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold text-[10.5px]">
                      {t(locationName, language)}
                    </span>

                    <VoiceAssistToggle language={language} />

                    {/* Language Dropdown Select menu */}
                    <div className="relative inline-block text-left" id="lang-selector-parent">
                      <button
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-[10.5px] cursor-pointer transition shadow-3xs hover:border-slate-300"
                        id="lang-selector-btn"
                      >
                        <Languages className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
                      </button>

                      {isLangDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-30 cursor-default" 
                            onClick={() => setIsLangDropdownOpen(false)}
                          />
                          <div className="absolute right-0 mt-1.5 w-36 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-40 animate-fadeIn" id="lang-dropdown-menu">
                            <button
                              onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 block cursor-pointer transition ${language === 'en' ? 'text-blue-600 bg-blue-50/40' : 'text-slate-700'}`}
                            >
                              English
                            </button>
                            <button
                              onClick={() => { setLanguage('hi'); setIsLangDropdownOpen(false); }}
                              className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 block cursor-pointer transition ${language === 'hi' ? 'text-blue-600 bg-blue-50/40' : 'text-slate-700'}`}
                            >
                              हिंदी (Hindi)
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Login or User Profile dropdown menu */}
                    <div className="relative inline-block text-left" id="user-profile-parent">
                      {user ? (
                        <>
                          <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-[10.5px] cursor-pointer transition shadow-3xs"
                            id="user-profile-btn"
                          >
                            <div className="w-4.5 h-4.5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9.5px] font-extrabold">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline truncate max-w-28">{user.name}</span>
                          </button>

                          {isProfileDropdownOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-30 cursor-default" 
                                onClick={() => setIsProfileDropdownOpen(false)}
                              />
                              <div className="absolute right-0 mt-1.5 w-44 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-40 animate-fadeIn" id="user-profile-menu">
                                <button
                                  onClick={() => { setIsUserProfileOpen(true); setIsProfileDropdownOpen(false); }}
                                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700 block cursor-pointer transition flex items-center gap-2 border-b border-slate-100"
                                >
                                  <User className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{language === 'hi' ? 'मेरी प्रोफ़ाइल' : 'My Profile'}</span>
                                </button>
                                <button
                                  onClick={() => { setIsUserProfileOpen(true); setIsProfileDropdownOpen(false); }}
                                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700 block cursor-pointer transition flex items-center gap-2 border-b border-slate-100"
                                >
                                  <FolderDot className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{language === 'hi' ? 'मेरी रिपोर्ट' : 'My Reports'}</span>
                                </button>
                                <button
                                  onClick={handleLogout}
                                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50/50 block cursor-pointer transition flex items-center gap-2"
                                >
                                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                                  <span>{language === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => setIsLoginModalOpen(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-[10.5px] cursor-pointer transition shadow-sm hover:shadow"
                          id="login-btn-top"
                        >
                          <LogIn className="w-3.5 h-3.5 shrink-0" />
                          <span>{language === 'hi' ? 'लॉगिन' : 'Login'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </header>

                {/* Active view window container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8FAFC]">
                  {activeTab === 'Dashboard' && (
                    <DashboardView
                      roads={roads}
                      tickets={tickets}
                      likedTicketIds={likedTicketIds}
                      onLikeTicket={handleLikeTicket}
                      onSelectRoad={handleSelectRoadAndInspect}
                      onNavigateToTab={handleNavigateToTab}
                      onNewTicketClick={() => handleNavigateToTab('Report Issues')}
                      language={language}
                    />
                  )}

                  {activeTab === 'Search Road Details' && (
                    <SearchView
                      roads={roads}
                      tickets={tickets}
                      likedTicketIds={likedTicketIds}
                      onLikeTicket={handleLikeTicket}
                      selectedRoadId={selectedRoadId}
                      onSelectRoad={setSelectedRoadId}
                      onRaiseIssueForRoad={handleRaiseIssueForRoadRedirect}
                      onSearchLocation={handleSearchLocation}
                      language={language}
                    />
                  )}

                  {activeTab === 'Report Issues' && (
                    <ReportView
                      roads={roads}
                      tickets={tickets}
                      likedTicketIds={likedTicketIds}
                      onLikeTicket={handleLikeTicket}
                      preSelectedRoadName={preSelectedRoadName}
                      onSubmitNewTicket={handleNewTicketSubmission}
                      language={language}
                    />
                  )}

                  {activeTab === 'Map' && (
                    <MapView
                      roads={roads}
                      tickets={tickets}
                      likedTicketIds={likedTicketIds}
                      onLikeTicket={handleLikeTicket}
                      onSelectRoad={handleSelectRoadAndInspect}
                      onNavigateToTab={handleNavigateToTab}
                      onSearchLocation={handleSearchLocation}
                      language={language}
                    />
                  )}

                  {activeTab === 'AI Bot' && (
                    <BotView language={language} />
                  )}
                </div>

                {/* Footer inside main */}
                <footer className="bg-white border-t border-slate-200 py-4 px-4 md:px-8 shrink-0">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-400 font-medium">
                    <div>
                      <p className="font-bold text-slate-600 leading-tight">{currentText.safety}</p>
                      <p className="mt-0.5">{currentText.footerDesc}</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="hover:text-slate-600 cursor-pointer animate-pulse-soft" onClick={() => alert(currentText.sourceAlert)}>{currentText.sourceDisclosures}</span>
                      <span>•</span>
                      <span className="hover:text-slate-600 cursor-pointer" onClick={() => handleNavigateToTab('AI Bot')}>{currentText.auditAssistant}</span>
                    </div>
                  </div>
                </footer>

              </main>
            </div>
          )}

        {/* Login & User Profile overlay Modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          language={language}
        />
        <UserProfileModal
          isOpen={isUserProfileOpen}
          onClose={() => setIsUserProfileOpen(false)}
          user={user}
          tickets={tickets}
          language={language}
          onSelectRoad={handleSelectRoadAndInspect}
        />

      </div>
      </VoiceAssistProvider>
    </APIProvider>
  );
}
