import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Map, 
  Bot, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Languages, 
  Search, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Phone, 
  Mail, 
  Building2, 
  Database,
  BarChart3,
  GitMerge
} from 'lucide-react';

interface HomeViewProps {
  onNavigateToTab: (tab: string) => void;
  onLoginClick: () => void;
  language: 'en' | 'hi';
}

export default function HomeView({ onNavigateToTab, onLoginClick, language }: HomeViewProps) {
  const translations = {
    en: {
      heroTitle: "Transparent Roads.",
      heroTitleAccent: "Accountable Infrastructure.",
      heroSubtitle: "Track road budgets, monitor maintenance, report active issues, and empower citizens through AI-powered transparency registers.",
      exploreDashboard: "Explore Dashboard",
      reportIssue: "Report an Issue",
      
      // Feature section
      featuresTitle: "Core Platform Capabilities",
      featuresSubtitle: "Harnessing technology to foster communication, build accountability, and preserve utility integrity.",
      
      feature1Title: "Road Transparency",
      feature1Desc: "View detailed digital registers listing contractor profiles, specific public budgets, and ongoing pavement conditions.",
      
      feature2Title: "AI Civic Assistant",
      feature2Desc: "Ask our specialized assistant questions about road maintenance guidelines, localized civic budgets, or municipal responsibilities.",
      
      feature3Title: "Smart Complaint Routing",
      feature3Desc: "File safety bugs easily. Our geocoding system automatically detects and routes reports to the correct municipal or regional public works authority.",
      
      feature4Title: "Interactive Road Maps",
      feature4Desc: "Navigate visual color-coded maps showing local road health index, ongoing contractor works, and citizen-flagged safety bottlenecks.",
      
      feature5Title: "Budget Analytics",
      feature5Desc: "Track public funds with absolute clarity. Compare tender projections directly against audited physical completion milestones.",
      
      feature6Title: "Multilingual Accessibility",
      feature6Desc: "Inclusive governance for every resident. Full native dashboard translations, speech synthesis, and queries supported in English, Hindi, and Telugu.",

      // Stats Section
      statsHeadline: "National Infrastructure Integrity Index",
      statRoads: "Roads Monitored",
      statReports: "Citizen Reports Status",
      statBudgets: "Budget Records Tracked",
      statConnected: "Authorities Connected",

      // How It Works
      howItWorksTitle: "How RoadLens Operates",
      howItWorksSub: "Empowering residents to verify regional roadway quality and report bottlenecks in four transparent stages.",
      step1Title: "Step 1: Search a Road",
      step1Desc: "Enter safe landmarks or search via custom addresses to lookup detailed digital registry cards for closest highways.",
      step2Title: "Step 2: View Road Details",
      step2Desc: "Examine detailed logs of past expenditures, current contractors, physical wear indicator indices, and active schedules.",
      step3Title: "Step 3: Report an Issue",
      step3Desc: "Upload pothole, flooding, or lighting hazards with live coordinate tags and instant physical evidence tracking.",
      step4Title: "Step 4: Track Resolution",
      step4Desc: "Monitor real-time resolution updates from civil offices, verified by the community to ensure lasting service.",

      // CTA
      ctaTitle: "Help Build Safer and More Transparent Roads",
      ctaSub: "Join thousands of active residents who verify contractor workmanship, audit local project spending, and make our corridors safer.",
      getStarted: "Get Started",

      // Footer
      aboutTitle: "About RoadLens",
      aboutText: "RoadLens AI is a modern public infrastructure transparency and civic audit register. We organize complex engineering data, budget sheets, and public tenders into actionable community dashboards.",
      contactTitle: "Civic Contact Register",
      contactPhone: "+91 80 4912 3000 (Central Public Desk)",
      contactMail: "support@roadlens.gov.in (Auditor Register)",
      legalTitle: "Regulatory Directory",
      privacyPolicy: "Privacy & Data Protection Policy",
      termsOfUse: "Resident Terms & Service Guidelines"
    },
    hi: {
      heroTitle: "पारदर्शी सड़कें।",
      heroTitleAccent: "जवाबदेह बुनियादी ढांचा।",
      heroSubtitle: "वास्तविक समय में एआई-संचालित पारदर्शिता रजिस्टरों के माध्यम से सड़क बजट को ट्रैक करें, रखरखाव की निगरानी करें, सक्रिय समस्याओं की रिपोर्ट करें और नागरिकों को सशक्त बनाएं।",
      exploreDashboard: "डैशबोर्ड देखें",
      reportIssue: "समस्या दर्ज करें",
      
      // Feature section
      featuresTitle: "मंच की मुख्य क्षमताएं",
      featuresSubtitle: "पारदर्शिता को बढ़ावा देने, जवाबदेही बनाने और नागरिक जुड़ाव को मजबूत करने के लिए प्रौद्योगिकी का उपयोग।",
      
      feature1Title: "सड़क पारदर्शिता",
      feature1Desc: "सड़क निर्माण विवरण, ठेकेदारों, आवंटित बजट और सड़क की समग्र गुणवत्ता को प्रकट करने वाले डिजिटल लॉग देखें।",
      
      feature2Title: "एआई नागरिक सहायक",
      feature2Desc: "सड़क मानकों, आवंटित सार्वजनिक बजट, ठेकेदार प्रतिबद्धताओं या स्थानीय नीतियों के बारे में रोडलेंस एआई से सवाल पूछें।",
      
      feature3Title: "स्मार्ट शिकायत रूटिंग",
      feature3Desc: "सुरक्षा चिंताओं की रिपोर्ट करें और हमारा जियोकोडिंग सिस्टम स्वचालित रूप से संबंधित नगर पालिका, PWD या NHAI कार्यालय को रिपोर्ट भेजेगा।",
      
      feature4Title: "इंटरैक्टिव सड़क मानचित्र",
      feature4Desc: "सड़क की वर्तमान स्थिति, सक्रिय रखरखाव कार्यों और नागरिकों द्वारा ध्वजांकित मुद्दों को दर्शाने वाले इंटरैक्टिव मानचित्रों का पता लगाएं।",
      
      feature5Title: "बजट विश्लेषण",
      feature5Desc: "सार्वजनिक निवेश की पारदर्शी निगरानी करें। निविदा आकलनों की तुलना वास्तविक समय में भौतिक प्रगति के साथ करें।",
      
      feature6Title: "बहुभाषी पहुंच",
      feature6Desc: "सभी के लिए समावेशी शासन। अंग्रेजी, हिंदी और तेलुगु भाषाओं में अनुवाद, आवाज समर्थन और अनुकूलन उपलब्ध है।",

      // Stats Section
      statsHeadline: "राष्ट्रीय बुनियादी ढांचा अखंडता सूचकांक",
      statRoads: "निगरानी की गई सड़कें",
      statReports: "सत्यापित नागरिक रिपोर्ट",
      statBudgets: "ट्रैक किया गया वित्तीय बजट",
      statConnected: "उत्तरदायी सरकारी विभाग",

      // How It Works
      howItWorksTitle: "रोडलेंस कैसे कार्य करता है",
      howItWorksSub: "चार आसान चरणों में सड़क विवरणों की समीक्षा करने और वास्तविक समय में मुद्दों की रिपोर्ट करने के लिए नागरिकों को सशक्त बनाना।",
      step1Title: "चरण 1: सड़क खोजें",
      step1Desc: "आस-पास के सड़क नेटवर्क और उनकी विस्तृत डिजिटल रजिस्ट्री कार्ड को देखने के लिए जीपीएस या विशिष्ट पते दर्ज करें।",
      step2Title: "चरण 2: सड़क विवरण देखें",
      step2Desc: "सड़क की भौतिक स्थिति (Wear Index), आवंटित इतिहास, जिम्मेदार ठेकेदार और सक्रिय रखरखाव गतिविधियों की जानकारी प्राप्त करें।",
      step3Title: "चरण 3: समस्या दर्ज करें",
      step3Desc: "गड्ढों, खराब लाइट्स और रेलिंग समस्याओं की सटीक जीपीएस फोटो और भौगोलिक निर्देशांक के साथ रिपोर्ट दर्ज करें।",
      step4Title: "चरण 4: समाधान ट्रैक करें",
      step4Desc: "संबंधित सरकारी कार्यालयों से समाधान प्रगति की लाइव अपडेट प्राप्त करें, जिसे समुदाय समर्थन द्वारा अंतिम सत्यापन मिलता है।",

      // CTA
      ctaTitle: "सुरक्षित और अधिक पारदर्शी सड़क बनाने में मदद करें",
      ctaSub: "उन हजारों सक्रिय निवासियों में शामिल हों जो स्थानीय ठेकेदार के काम का सत्यापन कर रहे हैं और सार्वजनिक खर्चों का ऑडिट करके सड़कों को सुरक्षित बना रहे हैं।",
      getStarted: "अभी शुरू करें",

      // Footer
      aboutTitle: "रोडलेंस के बारे में",
      aboutText: "रोडलेंस एआई सार्वजनिक बुनियादी ढांचे की पारदर्शिता और ऑडिट का एक आधुनिक मंच है। हम जटिल इंजीनियरिंग रिकॉर्ड, निविदा डेटा और बजटीय वित्तीय विवरणों को सुलभ डैशबोर्ड में बदलते हैं।",
      contactTitle: "नागरिक संपर्क प्रकोष्ठ",
      contactPhone: "+91 80 4912 3000 (केंद्रीय सहायता)",
      contactMail: "support@roadlens.gov.in (ऑडिट सहायता)",
      legalTitle: "नियामक निर्देशिका",
      privacyPolicy: "गोपनीयता और डेटा सुरक्षा नीति",
      termsOfUse: "नागरिक सेवा एवं उपयोग दिशानिर्देश"
    }
  };

  const t = translations[language];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      
      {/* 1. HERO SECTION WITH IMAGE & OVERLAY */}
      <section className="relative bg-slate-950 text-white min-h-[580px] flex items-center justify-center overflow-hidden py-16 px-4 md:px-8">
        {/* Real-world highway backdrop related to infrastructure monitoring & smart cities */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 select-none scale-105 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80')` }}
        />
        {/* Subtle geometric neon grids mask mapping smart city look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1.2px,transparent_1.2px),linear-gradient(to_bottom,#020617_1.2px,transparent_1.2px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-90" />
        
        <div className="relative z-10 max-w-4xl text-center space-y-8 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-300 font-extrabold tracking-widest uppercase">
              CIVIC TRANSPARENCY PLATFORM
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white"
            >
              {t.heroTitle} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                {t.heroTitleAccent}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              {t.heroSubtitle}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <button
              onClick={() => onNavigateToTab('Dashboard')}
              className="w-full sm:w-auto py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:shadow-blue-500/15 active:scale-98 transition duration-155 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.exploreDashboard}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('Report Issues')}
              className="w-full sm:w-auto py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-100 hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-lg border border-slate-800 hover:border-slate-700 active:scale-98 transition duration-155 cursor-pointer flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 animate-bounce" />
              <span>{t.reportIssue}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. STATISTICS BANNER (ELEGANT BENTO TILES) */}
      <section className="relative -mt-10 z-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded" />
            <h3 className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest font-mono">
              {t.statsHeadline}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat Item 1 */}
            <div className="flex items-start gap-4 p-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-black text-slate-850 font-mono tracking-tight block">142+</span>
                <span className="text-xs font-bold text-slate-800 block">{t.statRoads}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Under active civic surveillance</span>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-start gap-4 p-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-black text-slate-850 font-mono tracking-tight block">1,280+</span>
                <span className="text-xs font-bold text-slate-800 block">{t.statReports}</span>
                <span className="text-[10px] text-slate-400 block font-medium">92% resolution efficiency</span>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="flex items-start gap-4 p-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-605 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-black text-slate-855 font-mono tracking-tight block">₹48.5 Cr</span>
                <span className="text-xs font-bold text-slate-800 block">{t.statBudgets}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Audited from government bids</span>
              </div>
            </div>

            {/* Stat Item 4 */}
            <div className="flex items-start gap-4 p-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-black text-slate-850 font-mono tracking-tight block">15+</span>
                <span className="text-xs font-bold text-slate-800 block">{t.statConnected}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Municipal & NHAI authorities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES / FEATURES SECTION (6 CLEAN CARDS) */}
      <section className="max-w-6xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest font-mono">
            {t.featuresTitle}
          </h3>
          <p className="text-slate-500 text-xs md:text-sm tracking-wide leading-relaxed font-medium">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 hover:border-slate-250 hover:shadow-xs transition duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight uppercase font-sans">
                {t.feature1Title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.feature1Desc}
              </p>
              <p className="text-[10.5px] text-blue-600 font-bold bg-blue-50/55 px-2.5 py-1 rounded inline-block">
                View contractors, budgets and expenditure
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('Search Road Details')}
              className="text-[11.5px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-6 group self-start"
            >
              <span>{language === 'hi' ? 'राजमार्ग खोजें' : 'Query Register'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 hover:border-slate-250 hover:shadow-xs transition duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-660 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight uppercase font-sans">
                {t.feature5Title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.feature5Desc}
              </p>
              <p className="text-[10.5px] text-orange-600 font-bold bg-orange-50/50 px-2.5 py-1 rounded inline-block">
                Compare allocated vs spent funds
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('Dashboard')}
              className="text-[11.5px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-6 group self-start"
            >
              <span>{language === 'hi' ? 'ऑडिट डेटा देखें' : 'Inspect Analytics'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 hover:border-slate-250 hover:shadow-xs transition duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight uppercase font-sans">
                {t.feature2Title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.feature2Desc}
              </p>
              <p className="text-[10.5px] text-purple-650 font-bold bg-purple-50/55 px-2.5 py-1 rounded inline-block">
                Ask questions about roads and maintenance
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('AI Bot')}
              className="text-[11.5px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-6 group self-start"
            >
              <span>{language === 'hi' ? 'एआई सहायक खोलें' : 'Consult Assistant'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 hover:border-slate-250 hover:shadow-xs transition duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <GitMerge className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight uppercase font-sans">
                {t.feature3Title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.feature3Desc}
              </p>
              <p className="text-[10.5px] text-rose-600 font-bold bg-rose-50/55 px-2.5 py-1 rounded inline-block">
                Automatically route issues to the correct authority
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('Report Issues')}
              className="text-[11.5px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-6 group self-start"
            >
              <span>{language === 'hi' ? 'शिकायत दर्ज़ करें' : 'Lodge Complaint'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 hover:border-slate-250 hover:shadow-xs transition duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <Map className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight uppercase font-sans">
                {t.feature4Title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.feature4Desc}
              </p>
              <p className="text-[10.5px] text-emerald-650 font-bold bg-emerald-50/55 px-2.5 py-1 rounded inline-block">
                Explore roads and infrastructure visually
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('Map')}
              className="text-[11.5px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-6 group self-start"
            >
              <span>{language === 'hi' ? 'नक्शा लोड करें' : 'Open Map'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 hover:border-slate-250 hover:shadow-xs transition duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition shrink-0">
                <Languages className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight uppercase font-sans">
                {t.feature6Title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t.feature6Desc}
              </p>
              <p className="text-[10.5px] text-indigo-650 font-bold bg-indigo-50/55 px-2.5 py-1 rounded inline-block">
                English, Hindi and Telugu support
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-6 font-mono text-[9px] font-black tracking-wider text-slate-400">
              <span className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded transition">ENGLISH</span>
              <span className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded transition">HINDI (हिंदी)</span>
              <span className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded transition">TELUGU (తెలుగు)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW / "HOW IT WORKS" SEC */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest font-mono">
              Audited Process Flow
            </h3>
            <h2 className="text-2xl font-black text-slate-850 tracking-tight font-sans">
              {t.howItWorksTitle}
            </h2>
            <p className="text-slate-450 text-xs tracking-wide font-medium">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {/* Step 1 */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-150 relative group">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-650 flex items-center justify-center font-extrabold">
                <Search className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider">
                {t.step1Title}
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold">
                {t.step1Desc}
              </p>
              <div className="hidden lg:block absolute top-[45%] right-[-14px] text-slate-300 font-bold text-xl pointer-events-none group-hover:translate-x-1 transition duration-150">
                →
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-150 relative group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-650 flex items-center justify-center font-extrabold">
                <Eye className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-black text-slate-855 uppercase tracking-wider">
                {t.step2Title}
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold">
                {t.step2Desc}
              </p>
              <div className="hidden lg:block absolute top-[45%] right-[-14px] text-slate-300 font-bold text-xl pointer-events-none group-hover:translate-x-1 transition duration-150">
                →
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-150 relative group">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-extrabold">
                <AlertTriangle className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider">
                {t.step3Title}
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold">
                {t.step3Desc}
              </p>
              <div className="hidden lg:block absolute top-[45%] right-[-14px] text-slate-300 font-bold text-xl pointer-events-none group-hover:translate-x-1 transition duration-150">
                →
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-150 group">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-650 flex items-center justify-center font-extrabold">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider">
                {t.step4Title}
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold">
                {t.step4Desc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-850 to-slate-900 rounded-3xl p-8 md:p-14 text-center space-y-6 relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-3">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight font-sans leading-none">
              {t.ctaTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
              {t.ctaSub}
            </p>
          </div>

          <button
            onClick={() => {
              onNavigateToTab('Dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-10 py-3.5 px-8 bg-white hover:bg-slate-50 border border-slate-200 text-blue-900 font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-indigo-950/20 active:scale-98 transition cursor-pointer"
          >
            {t.getStarted}
          </button>
        </div>
      </section>

      {/* 6. EXPANDED FOOTER DETAILS */}
      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Platform identity */}
          <div className="space-y-4 pr-0 md:pr-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 select-none">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold text-xs">
                RL
              </div>
              <span className="font-extrabold text-sm text-slate-800 tracking-tight font-sans">
                RoadLens AI
              </span>
            </div>
            <p className="text-[11.5px] text-slate-450 leading-relaxed font-semibold">
              {t.aboutText}
            </p>
          </div>

          {/* Column 2: Quick actions */}
          <div className="space-y-3.5">
            <div className="border-l-2 border-blue-600 pl-2.5">
              <h4 className="text-[9.5px] font-black tracking-widest text-slate-500 uppercase font-mono">
                {t.legalTitle}
              </h4>
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-slate-600 font-bold">
              <span className="hover:text-blue-600 cursor-pointer">{t.privacyPolicy}</span>
              <span className="hover:text-blue-600 cursor-pointer">{t.termsOfUse}</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => onLoginClick()}>
                Citizen Registration
              </span>
            </div>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-3.5">
            <div className="border-l-2 border-blue-600 pl-2.5">
              <h4 className="text-[9.5px] font-black tracking-widest text-slate-500 uppercase font-mono">
                {t.contactTitle}
              </h4>
            </div>
            <div className="flex flex-col gap-3 text-xs text-slate-600 font-medium font-mono">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-[11px] font-bold text-slate-700">{t.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-[11px] font-bold text-slate-700">{t.contactMail}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Context info */}
          <div className="space-y-4">
            <div className="border-l-2 border-blue-600 pl-2.5">
              <h4 className="text-[9.5px] font-black tracking-widest text-slate-500 uppercase font-mono">
                Information Node
              </h4>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              Integrated with regional public works directories to facilitate citizen ledger transparency. Powered by verified civic reports and GIS datasets.
            </p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-4 border-t border-slate-100 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-[10.5px] text-slate-400 font-bold">
          <span>© 2026 RoadLens AI platform. National Civic Accountability Initiative.</span>
          <div className="flex gap-4">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => {
              onNavigateToTab('Dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              System Status
            </span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => {
              onNavigateToTab('AI Bot');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Civic GPT LLM Sandbox
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
