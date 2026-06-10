// Comprehensive localization dictionary and translator helper for RoadLens AI
// Supports English (en), Hindi (hi), and Telugu (te)

export type Language = 'en' | 'hi';

// Static string values lookup dictionary
export const DICTIONARY: Record<string, Record<Language | 'te', string>> = {
  // General labels and words
  "Segment": {
    en: "Segment",
    hi: "खंड",
    te: "విభాగం"
  },
  "Series": {
    en: "Series",
    hi: "श्रृंखला",
    te: "సిరీస్"
  },
  "Condition:": {
    en: "Condition:",
    hi: "स्थिति:",
    te: "పరిస్థితి:"
  },
  "CODE:": {
    en: "CODE:",
    hi: "कोड:",
    te: "కోడ్:"
  },
  "Report by:": {
    en: "Report by:",
    hi: "द्वारा रिपोर्ट:",
    te: "నివేదించిన వారు:"
  },
  "Filed by:": {
    en: "Filed by:",
    hi: "द्वारा दायर:",
    te: "దాఖలు చేసిన వారు:"
  },
  "Status:": {
    en: "Status:",
    hi: "स्थिति:",
    te: "స్థితి:"
  },
  "Filters:": {
    en: "Filters:",
    hi: "फ़िल्टर:",
    te: "వడపోతలు:"
  },
  "Public Roads Directory": {
    en: "Public Roads Directory",
    hi: "सार्वजनिक सड़क निर्देशिका",
    te: "పబ్లిక్ రోడ్స్ డైరెక్టరీ"
  },
  "Please search or select a road below to inspect detailed contractor logs, audited spending ledgers, maps, and citizen grievances.": {
    en: "Please search or select a road below to inspect detailed contractor logs, audited spending ledgers, maps, and citizen grievances.",
    hi: "विस्तृत ठेकेदार लॉग, ऑडिट किए गए खर्च बहीखाते, मानचित्र और नागरिक शिकायतों का निरीक्षण करने के लिए कृपया नीचे एक सड़क खोजें या चुनें।",
    te: "వివరణాత్మక కాంట్రాక్టర్ లాగ్‌లు, ఆడిట్ చేయబడిన ఖర్చు లెడ్జర్‌లు, మ్యాప్‌లు మరియు పౌర సమస్యలను పరిశీలించడానికి దయచేసి క్రింద ఒక రహదారిని శోధించండి లేదా ఎంచుకోండి."
  },
  "Inspect Details & spent": {
    en: "Inspect Details & spent",
    hi: "विवरण और खर्च का निरीक्षण करें",
    te: "వివరాలు & ఖర్చులను పరిశీలించండి"
  },
  "No matching routes found.": {
    en: "No matching routes found.",
    hi: "कोई मिलान मार्ग नहीं मिले।",
    te: "సరిపోలే మార్గాలు ఏవీ కనుగొనబడలేదు."
  },
  "Try clarifying your terms or look at the recommended suggested highways.": {
    en: "Try clarifying your terms or look at the recommended suggested highways.",
    hi: "अपने शब्दों को स्पष्ट करने का प्रयास करें या अनुशंसित सुझाई गई सड़कों को देखें।",
    te: "మీ పదాలను స్పష్టంగా నమోదు చేయడానికి ప్రయత్నించండి లేదా సిఫార్సు చేయబడిన రహదారులను చూడండి."
  },
  "Currently inspecting:": {
    en: "Currently inspecting:",
    hi: "वर्तमान में निरीक्षण किया जा रहा है:",
    te: "ప్రస్తుతం తనిఖీ చేయబడుతోంది:"
  },
  "Back to Road Directory": {
    en: "Back to Road Directory",
    hi: "सड़क निर्देशिका पर वापस जाएं",
    te: "తిరిగి రోడ్డు డైరెక్టరీకి వెళ్లు"
  },
  "Switch to Matching Road": {
    en: "Switch to Matching Road",
    hi: "मिलान सड़क पर स्विच करें",
    te: "సరిపోలే రోడ్డుకు మారండి"
  },
  "National Highway": {
    en: "National Highway",
    hi: "राष्ट्रीय राजमार्ग",
    te: "జాతీయ రహదారి"
  },
  "State Highway": {
    en: "State Highway",
    hi: "राज्य राजमार्ग",
    te: "రాష్ట్ర రహదారి"
  },
  "Municipal Local Road": {
    en: "Municipal Local Road",
    hi: "नगर निगम स्थानीय सड़क",
    te: "మునిసిపల్ లోకల్ రోడ్డు"
  },
  "Condition Score:": {
    en: "Condition Score:",
    hi: "स्थिति स्कोर:",
    te: "పరిస్థితి స్కోరు:"
  },
  "Raise Issue": {
    en: "Raise Issue",
    hi: "समस्या उठाएं",
    te: "సమస్యను నివేదించండి"
  },
  "Assigned Contractor": {
    en: "Assigned Contractor",
    hi: "सौंपा गया ठेकेदार",
    te: "కేటాయించిన కాంట్రాక్టర్"
  },
  "Sanctioning Authority": {
    en: "Sanctioning Authority",
    hi: "मंजूरी देने वाला प्राधिकरण",
    te: "మంజూరు చేసే అధికారం"
  },
  "Last Repair Completion Date": {
    en: "Last Repair Completion Date",
    hi: "अंतिम मरम्मत पूरी होने की तिथि",
    te: "చివరి మరమ్మతు పూర్తయిన తేదీ"
  },
  "Budget Allocation Analysis": {
    en: "Budget Allocation Analysis",
    hi: "बजट आवंटन विश्लेषण",
    te: "బడ్జెట్ కేటాయింపు విశ్లేషణ"
  },
  "Allocated": {
    en: "Allocated",
    hi: "आवंटित",
    te: "కేటాయించినది"
  },
  "Spent to Date": {
    en: "Spent to Date",
    hi: "आज तक का खर्च",
    te: "ఈనాటి వరకు ఖర్చు"
  },
  "Utilization Quotient": {
    en: "Utilization Quotient",
    hi: "उपयोगिता भागफल",
    te: "వినియోగ నిష్పత్తి"
  },
  "Audit Detailed Spent Ledger": {
    en: "Audit Detailed Spent Ledger",
    hi: "विस्तृत खर्च बहीखाते का ऑडिट करें",
    te: "వివరణాత్మక వ్యయాల లెడ్జర్‌ను ఆడిట్ చేయండి"
  },
  "Asset Segment Length": {
    en: "Asset Segment Length",
    hi: "सम्पत्ति खंड की लंबाई",
    te: "ఆస్తి విభాగం పొడవు"
  },
  "Lane Configuration": {
    en: "Lane Configuration",
    hi: "लेन विन्यास",
    te: "లేన్ కాన్ఫిగరేషన్"
  },
  "Kilometers": {
    en: "Kilometers",
    hi: "किलोमीटर",
    te: "కిలోమీటర్లు"
  },
  "Way Lanes Carriageway": {
    en: "Way Lanes Carriageway",
    hi: "वे लेन कैरीज़वे",
    te: "లేన్ల క్యారేజ్‌వే"
  },
  "Citizen Issues Filed on This Segment": {
    en: "Citizen Issues Filed on This Segment",
    hi: "इस खंड पर दर्ज की गई नागरिक समस्याएं",
    te: "ఈ విభాగంలో నమోదైన పౌర సమస్యలు"
  },
  "Tracking public grievances, structural deterioration reports, and maintenance responses.": {
    en: "Tracking public grievances, structural deterioration reports, and maintenance responses.",
    hi: "सार्वजनिक शिकायतों, संरचनात्मक क्षति रिपोर्टों और रखरखाव प्रतिक्रियाओं पर नज़र रखना।",
    te: "ప్రజల సమస్యలు, నివేదికలు మరియు నిర్వహణ ప్రతిస్పందనలను ట్రాక్ చేయడం."
  },
  "Zero active safety issues reported!": {
    en: "Zero active safety issues reported!",
    hi: "शून्य सक्रिय सुरक्षा समस्याएं दर्ज!",
    te: "క్రియాశీల భద్రతా సమస్యలు ఏవీ లేవు!"
  },
  "Citizens are highly satisfied with this segment or no hazards exist.": {
    en: "Citizens are highly satisfied with this segment or no hazards exist.",
    hi: "नागरिक इस खंड से अत्यधिक संतुष्ट हैं या कोई खतरा मौजूद नहीं है।",
    te: "పౌరులు ఈ విభాగం పట్ల చాలా సంతృప్తిగా ఉన్నారు లేదా ఎలాంటి ప్రమాదాలు లేవు."
  },
  "Administrative Milestones": {
    en: "Administrative Milestones",
    hi: "प्रशासनिक मील के पत्थर",
    te: "పరిపాలనా మైలురాళ్ళు"
  },
  "Report ID:": {
    en: "Report ID:",
    hi: "रिपोर्ट आईडी:",
    te: "నివేదిక ID:"
  },
  "Filed Date:": {
    en: "Filed Date:",
    hi: "दर्ज तिथि:",
    te: "దాఖలు చేసిన తేదీ:"
  },
  "No matching road assets found.": {
    en: "No matching road assets found.",
    hi: "कोई मिलान सड़क संपत्तियां नहीं मिलीं।",
    te: "సరిపోలే రోడ్డు ఆస్తులు కనుగొనబడలేదు."
  },
  "Geospatial Alignment": {
    en: "Geospatial Alignment",
    hi: "जियोस्पेशियल संरेखण",
    te: "జియోస్పేషియల్ అలైన్‌మెంట్"
  },
  "Highlighted vector segment on the local grid map.": {
    en: "Highlighted vector segment on the local grid map.",
    hi: "स्थानीय ग्रिड मानचित्र पर हाइलाइट किया गया वेक्टर खंड।",
    te: "స్థానిక గ్రిడ్ మ్యాప్‌లో హైలైట్ చేయబడిన వెక్టర్ విభాగం."
  },
  "Budget:": {
    en: "Budget:",
    hi: "बजट:",
    te: "బడ్జెట్:"
  },
  "Last Repair:": {
    en: "Last Repair:",
    hi: "अंतिम मरम्मत:",
    te: "చివరి మరమ్మతు:"
  },
  "Relayed:": {
    en: "Relayed:",
    hi: "पुनर्निर्मित:",
    te: "తిరిగి నిర్మించబడింది:"
  },
  "This geometric segment represents": {
    en: "This geometric segment represents",
    hi: "यह ज्यामितीय खंड प्रतिनिधित्व करता है",
    te: "ఈ రేఖాగణిత విభాగం సూచిస్తుంది"
  },
  "Km of maintenance responsibility assigned to": {
    en: "Km of maintenance responsibility assigned to",
    hi: "किमी रखरखाव की जिम्मेदारी सौंपी गई",
    te: "కిలోమీటర్ల పొడవైన నిర్వహణ బాధ్యత కేటాయించబడింది"
  },
  "Why are details public?": {
    en: "Why are details public?",
    hi: "विवरण सार्वजनिक क्यों हैं?",
    te: "వివరాలు ఎందుకు బహిరంగం చేశారు?"
  },
  "Under the National Road Safety mandate of 2026, all taxpayers deserve visibility into civil labor pricing. Click on the Spending ledger to inspect concrete batch files and signed inspectors invoices.": {
    en: "Under the National Road Safety mandate of 2026, all taxpayers deserve visibility into civil labor pricing. Click on the Spending ledger to inspect concrete batch files and signed inspectors invoices.",
    hi: "2026 के राष्ट्रीय सड़क सुरक्षा जनादेश के तहत, सभी करदाता नागरिक श्रम मूल्य निर्धारण में दृश्यता के पात्र हैं। कंक्रीट बैच फाइलों और हस्ताक्षरित निरीक्षकों के इनवॉइस का निरीक्षण करने के लिए खर्च बहीखाते पर क्लिक करें।",
    te: "2026 జాతీయ రహదారి భద్రతా ఆదేశం ప్రకారం, పన్ను చెల్లింపుదారులందరికీ పనుల వ్యయాలపై పారదర్శకత పొందే హక్కు ఉంది. కాంక్రీట్ బ్యాచ్ ఫైళ్లు & సంతకం చేసిన ఇన్‌వాయిస్‌లను పరిశీలించడానికి బడ్జెట్ వ్యయాల లెడ్జర్‌పై క్లిక్ చేయండి."
  },
  "Government Ledger Audit": {
    en: "Government Ledger Audit",
    hi: "सरकारी बहीखाता ऑडिट",
    te: "ప్రభుత్వ లెడ్జర్ ఆడిట్"
  },
  "Itemized Expenditure:": {
    en: "Itemized Expenditure:",
    hi: "मदवार व्यय:",
    te: "ఐటమైజ్డ్ ఖర్చులు:"
  },
  "Approved and disbursed by": {
    en: "Approved and disbursed by",
    hi: "स्वीकृत और संवितरित किया गया",
    te: "ఆమోదించబడి మరియు పంపిణీ చేయబడింది"
  },
  "Sanctioned Treasury Pool": {
    en: "Sanctioned Treasury Pool",
    hi: "स्वीकृत कोषागार निधि",
    te: "మంజూరైన ట్రెజరీ పూల్"
  },
  "Contractor Invoiced Outflow": {
    en: "Contractor Invoiced Outflow",
    hi: "ठेकेदार का चालान किया गया बहिर्वाह",
    te: "కాంట్రాక్టర్ ఇన్‌వాయిస్ అవుట్‌ఫ్లో"
  },
  "Sub-Project Line Items": {
    en: "Sub-Project Line Items",
    hi: "उप-परियोजना मद सूची",
    te: "ఉప-ప్రాజెక్ట్ లైన్ అంశాలు"
  },
  "Contributes:": {
    en: "Contributes:",
    hi: "योगदान करता है:",
    te: "భాగస్వామ్యం:"
  },
  "Signed Digital Verification Proof": {
    en: "Signed Digital Verification Proof",
    hi: "हस्ताक्षरित डिजिटल सत्यापन प्रमाण",
    te: "సంతకం చేసిన డిజిటల్ ధృవీకరణ రుజువు"
  },
  "Treasury Matched": {
    en: "Treasury Matched",
    hi: "कोषागार मिलान किया गया",
    te: "ఖజానాతో సరిపోలింది"
  },
  "Details": {
    en: "Details",
    hi: "विवरण",
    te: "వివరాలు"
  },
  "Signed with secure e-Sign MD5": {
    en: "Signed with secure e-Sign MD5",
    hi: "सुरक्षित ई-साइन MD5 के साथ हस्ताक्षरित",
    te: "సురక్షితమైన ఈ-సైన్ MD5 తో సంతకం చేయబడింది"
  },
  "Get PDF": {
    en: "Get PDF",
    hi: "पीडीएफ प्राप्त करें",
    te: "PDF పొందండి"
  },
  "Initiated audit ledger download for:": {
    en: "Initiated audit ledger download for:",
    hi: "के लिए ऑडिट लेजर डाउनलोड शुरू किया गया:",
    te: "ఆడిట్ లెడ్జర్ డౌన్‌లోడ్ ప్రారంభించబడింది:"
  },
  "Complete Audit conforms to standard National Safety Standards code ISO 15607.": {
    en: "Complete Audit conforms to standard National Safety Standards code ISO 15607.",
    hi: "पूर्ण ऑडिट मानक राष्ट्रीय सुरक्षा मानक कोड ISO 15607 के अनुरूप है।",
    te: "పూర్తి ఆడిట్ ప్రామాణిక జాతీయ భద్రతా ప్రమాణాల కోడ్ ISO 15607 కు అనుగుణంగా ఉంటుంది."
  },
  "Done": {
    en: "Done",
    hi: "पूर्ण",
    te: "పూర్తయింది"
  },
  // General navbar & header tags
  "Dashboard": {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    te: "డ్యాష్‌బోర్డ్"
  },
  "Search Road Details": {
    en: "Search Road Details",
    hi: "सड़क विवरण खोजें",
    te: "రోడ్డు వివరాలను శోధించండి"
  },
  "Report Issues": {
    en: "Report Issues",
    hi: "समस्या रिपोर्ट करें",
    te: "సమస్యలను నివేదించండి"
  },
  "Road Map": {
    en: "Road Map",
    hi: "सड़क मानचित्र",
    te: "రోడ్డు మ్యాప్"
  },
  "Assistance Bot": {
    en: "Assistance Bot",
    hi: "सहायता बॉट",
    te: "సహాయక బాట్"
  },
  "Citizen Operations Hub": {
    en: "Citizen Operations Hub",
    hi: "नागरिक संचालन केंद्र",
    te: "సిటిజన్ ఆపరేషన్స్ హబ్"
  },
  "Assayer Profile": {
    en: "Assayer Profile",
    hi: "परखकर्ता प्रोफ़ाइल",
    te: "అస్సేయర్ ప్రొఫైల్"
  },
  "Citizen Resident #8821": {
    en: "Citizen Resident #8821",
    hi: "नागरिक निवासी #8821",
    te: "పౌర నివాసి #8821"
  },
  "RoadLens AI — Safety Transparency Corridor": {
    en: "RoadLens AI — Safety Transparency Corridor",
    hi: "RoadLens AI — सुरक्षा पारदर्शिता कॉरिडोर",
    te: "RoadLens AI — భద్రతా పారదర్శకత కారిడార్"
  },
  "Empowering citizens to audit public construction budget & report safety concerns.": {
    en: "Empowering citizens to audit public construction budget & report safety concerns.",
    hi: "सार्वजनिक निर्माण बजट का ऑडिट करने और सुरक्षा चिंताओं की रिपोर्ट करने के लिए नागरिकों को सशक्त बनाना।",
    te: "ప్రజా నిర్మాణ బడ్జెట్‌ను ఆడిట్ చేయడానికి & భద్రతా సమస్యలను నివేదించడానికి పౌరులను శక్తివంతం చేయడం."
  },
  "Source Disclosures": {
    en: "Source Disclosures",
    hi: "स्रोत प्रकटीकरण",
    te: "మూల వెల్లడి"
  },
  "Audit Assistant": {
    en: "Audit Assistant",
    hi: "ऑडिट सहायक",
    te: "ఆడిట్ సహాయకుడు"
  },
  "Report Hazard": {
    en: "Report Hazard",
    hi: "खतरे की रिपोर्ट",
    te: "ప్రమాదాన్ని నివేదించండి"
  },
  "Clear road oversight": {
    en: "Clear road oversight",
    hi: "सड़क की स्पष्ट निगरानी",
    te: "స్పష్టమైన రహదారి పర్యవేక్షణ"
  },
  "Civic budget allocations are sourced from verified local agency projects in Karnataka.": {
    en: "Civic budget allocations are sourced from verified local agency projects in Karnataka.",
    hi: "नागरिक बजट आवंटन कर्नाटक में सत्यापित स्थानीय एजेंसी परियोजनाओं से प्राप्त होते हैं।",
    te: "పౌర బడ్జెట్ కేటాయింపులు కర్ణాటకలోని ధృవీకరించబడిన స్థానిక ఏజెన్సీ ప్రాజెక్ట్‌ల నుండి సేకరించబడ్డాయి."
  },

  // DashboardView
  "Dashboard Summary Metric Index": {
    en: "Dashboard Summary Metric Index",
    hi: "डैशबोर्ड सारांश मीट्रिक सूचकांक",
    te: "డ్యాష్‌బోర్డ్ సారాంశం మెట్రిక్ సూచిక"
  },
  "All Networks": {
    en: "All Networks",
    hi: "सभी नेटवर्क",
    te: "అన్ని నెట్‌వర్క్‌లు"
  },
  "Sanctioned Budget": {
    en: "Sanctioned Budget",
    hi: "स्वीकृत बजट",
    te: "మంజూరైన బడ్జెట్"
  },
  "Treasury Disbursed": {
    en: "Treasury Disbursed",
    hi: "कोषागार वितरित",
    te: "ట్రెజరీ పంపిణీ"
  },
  "Citizen Grievances": {
    en: "Citizen Grievances",
    hi: "नागरिक शिकायतें",
    te: "పౌర సమస్యలు"
  },
  "Active Cases": {
    en: "Active Cases",
    hi: "सक्रिय मामले",
    te: "క్రియాశీల కేసులు"
  },
  "Utilization Rate:": {
    en: "Utilization Rate:",
    hi: "उपयोग दर:",
    te: "వినియోగ రేటు:"
  },
  "Sanctioned:": {
    en: "Sanctioned:",
    hi: "स्वीकृत:",
    te: "మంజూరైనది:"
  },
  "Spent:": {
    en: "Spent:",
    hi: "खर्च:",
    te: "ఖర్చు చేసినది:"
  },
  "Across {count} segments in this layer": {
    en: "Across {count} segments in this layer",
    hi: "इस परत में {count} खंडों में",
    te: "ఈ లేయర్‌లో {count} విభాగాలలో"
  },
  "Utilization:": {
    en: "Utilization:",
    hi: "उपयोग:",
    te: "వినియోగం:"
  },
  "Financial Performance Overview": {
    en: "Financial Performance Overview",
    hi: "वित्तीय प्रदर्शन सिंहावलोकन",
    te: "ఆర్థిక పనితీరు సారాంశం"
  },
  "Budget Sanctioned vs. Budget Disbursed across selected road segments (in Crores).": {
    en: "Budget Sanctioned vs. Budget Disbursed across selected road segments (in Crores).",
    hi: "चयनित सड़क खंडों में स्वीकृत बजट बनाम वितरित बजट (करोड़ में)।",
    te: "ఎంపిక చేసిన రోడ్డు విభాగాలలో మంజూరైన బడ్జెట్ వర్సెస్ పంపిణీ చేసిన బడ్జెట్ (కోట్లలో)."
  },
  "Spent Budget": {
    en: "Spent Budget",
    hi: "खर्च किया गया बजट",
    te: "ఖర్చు బడ్జెట్"
  },
  "Geospatial Audit Network": {
    en: "Geospatial Audit Network",
    hi: "जियोस्पेशियल ऑडिट नेटवर्क",
    te: "భూగోళ ఆడిట్ నెట్‌వర్క్"
  },
  "Real-time civil budget tracking & active hazards near your location.": {
    en: "Real-time civil budget tracking & active hazards near your location.",
    hi: "वास्तविक समय में नागरिक बजट ट्रैकिंग और आपके स्थान के पास सक्रिय खतरे।",
    te: "మీ స్థానానికి సమీపంలో నిజ-సమయ పౌర బడ్జెట్ ట్రాకింగ్ & క్రియాశీల ప్రమాదాలు."
  },
  "Road Segment": {
    en: "Road Segment",
    hi: "सड़क खंड",
    te: "రోడ్డు విభాగం"
  },
  "Citizen Issue": {
    en: "Citizen Issue",
    hi: "नागरिक समस्या",
    te: "సిటిజన్ ఇష్యూ"
  },
  "Live GPS Search": {
    en: "Live GPS Search",
    hi: "लाइव जीपीएस खोज",
    te: "లైవ్ జీపీఎస్ శోధన"
  },
  "My Location": {
    en: "My Location",
    hi: "मेरा स्थान",
    te: "నా స్థానం"
  },
  "Inspect Financial Ledger": {
    en: "Inspect Financial Ledger",
    hi: "वित्तीय बहीखाता का निरीक्षण करें",
    te: "ఆర్థిక లెడ్జర్‌ను పరిశీలించండి"
  },
  "Audited Road Networks & Budgets": {
    en: "Audited Road Networks & Budgets",
    hi: "ऑडिट की गई सड़क नेटवर्क और बजट",
    te: "ఆడిట్ చేయబడిన రోడ్డు నెట్‌వర్క్‌లు & బడ్జెట్‌లు"
  },
  "Track contractor compliance, road score, and financial progress.": {
    en: "Track contractor compliance, road score, and financial progress.",
    hi: "ठेकेदार अनुपालन, सड़क स्कोर और वित्तीय प्रगति को ट्रैक करें।",
    te: "కాంట్రాక్టర్ సమ్మతి, రస్తా స్కోర్ మరియు ఆర్థిక పురోగతిని ట్రాక్ చేయండి."
  },
  "Inspect Ledger": {
    en: "Inspect Ledger",
    hi: "लेजर का निरीक्षण करें",
    te: "లెడ్జర్ తనిఖీ"
  },
  "Treasury Spent": {
    en: "Treasury Spent",
    hi: "कोषागार खर्च",
    te: "ఖజానా ఖర్చు"
  },
  "Contractor:": {
    en: "Contractor:",
    hi: "ठेकेदार:",
    te: "కాంట్రాక్టర్:"
  },
  "No active segments found matches the filter category.": {
    en: "No active segments found matches the filter category.",
    hi: "फ़िल्टर श्रेणी से मेल खाने वाले कोई सक्रिय खंड नहीं मिले।",
    te: "ఫిల్టర్ వర్గానికి సరిపోయే సక్రియ విభాగాలు ఏవీ కనుగొనబడలేదు."
  },
  "Citizen Safety Pulse": {
    en: "Citizen Safety Pulse",
    hi: "नागरिक सुरक्षा पल्स",
    te: "సిటిజన్ సేఫ్టీ పల్స్"
  },
  "Live active defect logs reported near you.": {
    en: "Live active defect logs reported near you.",
    hi: "आपके पास रिपोर्ट किए गए लाइव सक्रिय दोष लॉग।",
    te: "మీ దగ్గర నివేదించబడిన ప్రత్యక్ష క్రియాశీల లోపం లాగ్‌లు."
  },
  "All clear!": {
    en: "All clear!",
    hi: "सब साफ है!",
    te: "అంతా క్లియర్!"
  },
  "No outstanding hazards reported in this selection.": {
    en: "No outstanding hazards reported in this selection.",
    hi: "इस चयन में कोई बकाया खतरा दर्ज नहीं किया गया है।",
    te: "ఈ ఎంపికలో ఎలాంటి ప్రమాదాలు నివేదించబడలేదు."
  },

  // SearchView
  "Search & Audit Public Roads": {
    en: "Search & Audit Public Roads",
    hi: "सार्वजनिक सड़कों की खोज और ऑडिट",
    te: "ప్రజా రహదారుల శోధన & ఆడిట్"
  },
  "Look up contractor histories, audit civil ledger codes, and trace pending safety fixes.": {
    en: "Look up contractor histories, audit civil ledger codes, and trace pending safety fixes.",
    hi: "ठेकेदार के इतिहास को देखें, नागरिक बहीखाता कोड का ऑडिट करें, और लंबित सुरक्षा सुधारों को ट्रैक करें।",
    te: "కాంట్రాక్టర్ చరిత్రలను వెతకండి, సివిల్ లెడ్జర్ కోడ్‌లను ఆడిట్ చేయండి మరియు పెండింగ్ భద్రతా పరిష్కారాలను కనుగొనండి."
  },
  "Type a segment name or enter a city name (e.g., Vijayawada) to relocate entire corridor...": {
    en: "Type a segment name or enter a city name (e.g., Vijayawada) to relocate entire corridor...",
    hi: "पूरे गलियारे को स्थानांतरित करने के लिए एक खंड का नाम लिखें या शहर का नाम (जैसे, विजयवाड़ा) दर्ज करें...",
    te: "మొత్తం కారిడార్‌ను మార్చడానికి విభాగానికి చెందిన పేరు లేదా నగరం పేరు (ఉదా. విజయవాడ) నమోదు చేయండి..."
  },
  "Go": {
    en: "Go",
    hi: "जाएं",
    te: "వెళ్లు"
  },
  "Suggested Roads:": {
    en: "Suggested Roads:",
    hi: "सुझाई गई सड़कें:",
    te: "సూచించబడిన రోడ్లు:"
  },
  "Audit Ledger:": {
    en: "Audit Ledger:",
    hi: "ऑडिट बहीखाता:",
    te: "ఆడిట్ లెడ్జర్:"
  },
  "Close Ledger": {
    en: "Close Ledger",
    hi: "लेजर बंद करें",
    te: "లెడ్జర్ ముగించు"
  },
  "Contractor Integrity Profile": {
    en: "Contractor Integrity Profile",
    hi: "ठेकेदार सत्यनिष्ठा प्रोफ़ाइल",
    te: "కాంట్రాక్టర్ సమగ్రత ప్రొఫైల్"
  },
  "Maintenance Agency & Ward Guard": {
    en: "Maintenance Agency & Ward Guard",
    hi: "रखरखाव एजेंसी और वार्ड गार्ड",
    te: "నిర్వహణ ఏజెన్सी & వార్డ్ గార్డ్"
  },
  "Physical Specifications": {
    en: "Physical Specifications",
    hi: "भौतिक विनिर्देश",
    te: "భౌతిక వివరాలు"
  },
  "Total Road Length": {
    en: "Total Road Length",
    hi: "कुल सड़क की लंबाई",
    te: "మొత్తం రోడ్డు పొడవు"
  },
  "Lanes Count": {
    en: "Lanes Count",
    hi: "लेन की संख्या",
    te: "లేన్ల సంఖ్య"
  },
  "Last Surface Laying Repair": {
    en: "Last Surface Laying Repair",
    hi: "अंतिम सतह बिछाने की मरम्मत",
    te: "చివరి రస్తా ఉపరితల మరమ్మత్తు"
  },
  "Roadway Integrity Index": {
    en: "Roadway Integrity Index",
    hi: "सड़क मार्ग सत्यनिष्ठा सूचकांक",
    te: "రోడ్‌వే సమగ్రత సూచిక"
  },
  "Capital Expense Ledger Breakdown": {
    en: "Capital Expense Ledger Breakdown",
    hi: "पूंजीगत व्यय खाता विवरण",
    te: "మూలధన వ్యయ లెడ్జర్ విశ్లేషణ"
  },
  "Citizen Audit Index": {
    en: "Citizen Audit Index",
    hi: "नागरिक ऑडिट सूचकांक",
    te: "సిటిజన్ ఆడిట్ ఇండెక్స్"
  },
  "Financial Progress Summary": {
    en: "Financial Progress Summary",
    hi: "वित्तीय प्रगति सारांश",
    te: "ఆర్థిక పురోగతి సారాంశం"
  },
  "Spent": {
    en: "Spent",
    hi: "खर्च किया गया",
    te: "ఖర్చు చేసినది"
  },
  "Remaining": {
    en: "Remaining",
    hi: "शेष",
    te: "మిగిలినది"
  },
  "Ledger Code": {
    en: "Ledger Code",
    hi: "लेजर कोड",
    te: "లెడ్జర్ కోడ్"
  },
  "Amount": {
    en: "Amount",
    hi: "राशि",
    te: "మొత్తం"
  },
  "Audit Evidence Code": {
    en: "Audit Evidence Code",
    hi: "ऑडिट साक्ष्य कोड",
    te: "ఆడిట్ సాక్ష్య కోడ్"
  },
  "View Proof / Bill Receipt": {
    en: "View Proof / Bill Receipt",
    hi: "प्रमाण / बिल रसीद देखें",
    te: "సాక్ష్యం / బిల్లు రశీదును వీక్షించండి"
  },
  "No expenses filed on this ledger.": {
    en: "No expenses filed on this ledger.",
    hi: "इस बहीखाता पर कोई खर्च दर्ज नहीं किया गया है।",
    te: "ఈ లెడ్జర్‌లో ఎలాంటి ఖర్చులు దాఖలు కాలేదు."
  },
  "No outstanding issues filed on this roadway.": {
    en: "No outstanding issues filed on this roadway.",
    hi: "इस सड़क मार्ग पर कोई बकाया समस्या दर्ज नहीं की गई है।",
    te: "ఈ రోడ్‌వేలో ఎలాంటి సమస్యలు దాఖలు కాలేదు."
  },
  "Download Full Audit Ledger PDF": {
    en: "Download Full Audit Ledger PDF",
    hi: "पूर्ण ऑडिट खाता पीडीएफ डाउनलोड करें",
    te: "పూర్తి ఆడిట్ లెడ్జర్ PDF డౌన్‌లోడ్ చేసుకోండి"
  },
  "Download Proof": {
    en: "Download Proof",
    hi: "प्रमाण डाउनलोड करें",
    te: "సాక్ష్యం డౌన్‌లోడ్"
  },
  "Evidence Ledger Code Proof Certificate": {
    en: "Evidence Ledger Code Proof Certificate",
    hi: "साक्ष्य खाता कोड प्रमाण पत्र",
    te: "సాక్ష్య లెడ్జర్ కోడ్ ప్రూఫ్ సర్టిఫికేట్"
  },
  "Proof Document Title": {
    en: "Proof Document Title",
    hi: "प्रमाण फ़ाइल शीर्षक",
    te: "సాక్ష్య పత్రం శీర్షిక"
  },
  "Transaction ID": {
    en: "Transaction ID",
    hi: "लेनदेन आईडी",
    te: "లావాదేవీ ఐడీ"
  },
  "Assayer Digital Stamp": {
    en: "Assayer Digital Stamp",
    hi: "परखकर्ता डिजिटल स्टैम्प",
    te: "అస్సేయర్ డిజిటల్ స్టాంప్"
  },
  "Signed & Sealed": {
    en: "Signed & Sealed",
    hi: "हस्ताक्षरित एवं मुहरबंद",
    te: "సంతకం మరియు ముద్రించబడింది"
  },
  "Close Document": {
    en: "Close Document",
    hi: "दस्तावेज़ बंद करें",
    te: "పత్రాన్ని మూసివేయండి"
  },
  "Ledger downloaded successfully!": {
    en: "Ledger downloaded successfully!",
    hi: "बहीखाता सफलतापूर्वक डाउनलोड हो गया!",
    te: "లెడ్జర్ విజయవంతంగా డౌన్‌లోడ్ చేయబడింది!"
  },
  "Search Results matched": {
    en: "Search Results matched",
    hi: "खोज परिणाम मेल खाते हैं",
    te: "శోధన ఫలితాలు సరిపోలాయి"
  },
  "Back to Top": {
    en: "Back to Top",
    hi: "वापस ऊपर जाएं",
    te: "తిరిగి పైకి వెళ్లు"
  },

  // ReportView
  "File a Public Roadway Concern": {
    en: "File a Public Roadway Concern",
    hi: "सार्वजनिक सड़क मार्ग चिंता दर्ज करें",
    te: "రోడ్ల రక్షణ మరియు భద్రతా సమస్యను దాఖలు చేయండి"
  },
  "File a new safety ticket, take photo evidence, and utilize auto-agent routing.": {
    en: "File a new safety ticket, take photo evidence, and utilize auto-agent routing.",
    hi: "एक नया सुरक्षा टिकट दर्ज करें, फोटो साक्ष्य लें, और स्वचालित एजेंट रूटिंग का उपयोग करें।",
    te: "కొత్త భద్రత టికెట్ దాఖలు చేయండి, ఫోటో సాక్ష్యాన్ని తీసుకోండి మరియు ఆటోమేటిక్ ఏజెంట్ రూటింగ్‌ను ఉపయోగించండి."
  },
  "Affected Road Segment": {
    en: "Affected Road Segment",
    hi: "प्रभावित सड़क खंड",
    te: "ప్రభావిత రోడ్డు విభాగం"
  },
  "Specify the road segment...": {
    en: "Specify the road segment...",
    hi: "सड़क खंड निर्दिष्ट करें...",
    te: "రోడ్డు విభాగాన్ని పేర్కొనండి..."
  },
  "Issue Category": {
    en: "Issue Category",
    hi: "समस्या की श्रेणी",
    te: "సమస్య వర్గం"
  },
  "Select category...": {
    en: "Select category...",
    hi: "श्रेणी चुनें...",
    te: "వర్గాన్ని ఎంచుకోండి..."
  },
  "Incident Title": {
    en: "Incident Title",
    hi: "घटना का शीर्षक",
    te: "సంఘటన శీర్షిక"
  },
  "Describe what you found (e.g., Deep asphalt pothole, broken safety barrier)": {
    en: "Describe what you found (e.g., Deep asphalt pothole, broken safety barrier)",
    hi: "वर्णन करें कि आपको क्या मिला (जैसे, गहरा डामर गड्ढा, टूटी हुई सुरक्षा बाधा)",
    te: "మీరు కనుగొన్న దాన్ని వివరించండి (ఉదా., లోతైన తారు గుంత, విరిగిన భద్రతా అవరోధం)"
  },
  "Detailed Incident Description": {
    en: "Detailed Incident Description",
    hi: "घटना का विस्तृत विवरण",
    te: "సంఘటన యొక్క వివరణాత్మక వివరణ"
  },
  "Provide a detailed description of the safety hazard": {
    en: "Provide a detailed description of the safety hazard",
    hi: "सुरक्षा खतरे का विस्तृत विवरण प्रदान करें",
    te: "భద్రతా ప్రమాదం యొక్క వివరణాत्मक వివరాలను అందించండి"
  },
  "Evidence Image Upload": {
    en: "Evidence Image Upload",
    hi: "साक्ष्य छवि अपलोड",
    te: "సాక్ష్య చిత్రం అప్‌లోడ్"
  },
  "Click or drag to upload evidence scene...": {
    en: "Click or drag to upload evidence scene...",
    hi: "साक्ष्य दृश्य अपलोड करने के लिए क्लिक करें या खींचें...",
    te: "సాక్ష్య దృశ్యాన్ని అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా ఇక్కడకు లాగండి..."
  },
  "Voice Note Transcription": {
    en: "Voice Note Transcription",
    hi: "ध्वनि नोट प्रतिलेखन",
    te: "వాయిస్ నోట్ లిప్యంతరీకరణ"
  },
  "Hold to record, speak to describe incident...": {
    en: "Hold to record, speak to describe incident...",
    hi: "रिकॉर्ड करने के लिए दबाए रखें, घटना का वर्णन करने के लिए बोलें...",
    te: "రికార్డ్ చేయడానికి పట్టుకోండి, సంఘటనను వివరించడానికి మాట్లాడండి..."
  },
  "Start Recording": {
    en: "Start Recording",
    hi: "रिकॉर्डिंग शुरू करें",
    te: "రికార్డింగ్ ప్రారంభించండి"
  },
  "Recording active... Speak now.": {
    en: "Recording active... Speak now.",
    hi: "रिकॉर्डिंग सक्रिय है... अब बोलें।",
    te: "రికార్డింగ్ యాక్టివ్‌గా ఉంది... ఇప్పుడు మాట్లాడండి."
  },
  "Smart Auto-Routing Enabled": {
    en: "Smart Auto-Routing Enabled",
    hi: "स्मार्ट ऑटो-रूटिंग सक्षम",
    te: "స్మార్ట్ ఆటో-రూటింగ్ ప్రారంభించబడింది"
  },
  "Disable to manually select department": {
    en: "Disable to manually select department",
    hi: "विभाग को मैन्युअल रूप से चुनने के लिए अक्षम करें",
    te: "విభాగాన్ని మాన్యువల్‌గా ఎంచుకోవడానికి నిలిపివేయండి"
  },
  "Maintenance Agency Routing": {
    en: "Maintenance Agency Routing",
    hi: "रखरखाव एजेंसी रूटिंग",
    te: "నిర్వహణ ఏజెన్సీ రూటింగ్"
  },
  "Assigned department": {
    en: "Assigned department",
    hi: "आवंटित विभाग",
    te: "కేటాయించిన విభాగం"
  },
  "Smart Route Recommendation Confidence": {
    en: "Smart Route Recommendation Confidence",
    hi: "स्मार्ट रूट अनुशंसा विश्वसनीयता",
    te: "స్మార్ట్ రూట్ సిఫార్సు విశ్వసనీయత"
  },
  "Indicators Detected": {
    en: "Indicators Detected",
    hi: "संकेत मिले",
    te: "గుర్తించిన సంకేతాలు"
  },
  "Submit Citizen Report Case Ticketing": {
    en: "Submit Citizen Report Case Ticketing",
    hi: "नागरिक रिपोर्ट मामला टिकट जमा करें",
    te: "సిటిజన్ రిపోర్ట్ కేస్ టికెటింగ్‌ను సమర్పించండి"
  },
  "Ticket Submitted Successfully!": {
    en: "Ticket Submitted Successfully!",
    hi: "टिकट सफलतापूर्वक जमा हो गया!",
    te: "టికెట్ విజవంతంగా సమర్పించబడింది!"
  },
  "Case ID": {
    en: "Case ID",
    hi: "मामला आईडी",
    te: "కేసు ఐడీ"
  },
  "Assigned Maintenance Agency": {
    en: "Assigned Maintenance Agency",
    hi: "आवंटित रखरखाव एजेंसी",
    te: "కేటాయించిన నిర్వహణ ఏజెన్సీ"
  },
  "Thank you for helping keep our corridors safe.": {
    en: "Thank you for helping keep our corridors safe.",
    hi: "हमारे गलियारों को सुरक्षित रखने में मदद करने के लिए धन्यवाद।",
    te: "మా రహదారులను సురక్షితంగా ఉంచడంలో సహాయపడినందుకు ధన్యవాదాలు."
  },
  "File another report": {
    en: "File another report",
    hi: "एक और रिपोर्ट दर्ज करें",
    te: "మరో నివేదికను దాఖలు చేయండి"
  },

  // MapView
  "Segment Filters:": {
    en: "Segment Filters:",
    hi: "खंड फ़िल्टर:",
    te: "విభాగం ఫిల్టర్లు:"
  },
  "Close Details": {
    en: "Close Details",
    hi: "विवरण बंद करें",
    te: "వివరాలు మూసివేయి"
  },
  "Interactive Map View": {
    en: "Interactive Map View",
    hi: "इंटरैक्टिव मानचित्र दृश्य",
    te: "ఇంటరాక్టివ్ మ్యాప్ వీక్షణ"
  },
  "Visualizing roadway condition index, ledger codes, and defect trackers.": {
    en: "Visualizing roadway condition index, ledger codes, and defect trackers.",
    hi: "सड़क मार्ग की स्थिति सूचकांक, बहीखाता कोड और दोष ट्रैकर्स की कल्पना करना।",
    te: "రోడ్‌వే కండిషన్ ఇండెక్స్, లెడ్జర్ కోడ్‌లు మరియు లోపం ట్రాకర్‌లను దృశ్యమానం చేయడం."
  },
  "Roadway Condition Class": {
    en: "Roadway Condition Class",
    hi: "सड़क मार्ग की स्थिति वर्ग",
    te: "రోడ్వే పరిస్థితి తరగతి"
  },
  "Active Hazards": {
    en: "Active Hazards",
    hi: "सक्रिय खतरे",
    te: "క్రియాశీల హానికారకములు"
  },
  "Filter Network Layer": {
    en: "Filter Network Layer",
    hi: "फ़िल्टर नेटवर्क परत",
    te: "నెట్‌వర్క్ లేయర్‌ని ఫిల్టర్ చేయండి"
  },
  "Grievance Ticket Registry": {
    en: "Grievance Ticket Registry",
    hi: "शिकायत टिकट रजिस्ट्री",
    te: "సమస్యల టికెట్ రిజిస్ట్రీ"
  },

  // Words like status names (Pending, Active, Fixed etc.)
  "Pending": {
    en: "Pending",
    hi: "लंबित",
    te: "పెండింగ్"
  },
  "Active": {
    en: "Active",
    hi: "सक्रिय",
    te: "క్రియాశీల"
  },
  "Fixed": {
    en: "Fixed",
    hi: "ठीक हुआ",
    te: "పరిష్కరించబడింది"
  },
  "Under Review": {
    en: "Under Review",
    hi: "समीक्षाधीन",
    te: "సమీక్షలో ఉంది"
  },
  "In Progress": {
    en: "In Progress",
    hi: "प्रगति पर",
    te: "ప్రగతిలో ఉంది"
  },
  "Resolved": {
    en: "Resolved",
    hi: "हल किया गया",
    te: "పరిష్కరించబడింది"
  },

  // Roadway conditions
  "Excellent": {
    en: "Excellent",
    hi: "उत्कृष्ट",
    te: "అద్భుతం"
  },
  "Good": {
    en: "Good",
    hi: "अच्छा",
    te: "మంచిది"
  },
  "Fair": {
    en: "Fair",
    hi: "ठीक-ठाक",
    te: "పర్వాలేదు"
  },
  "Poor": {
    en: "Poor",
    hi: "खराब",
    te: "దారుణం"
  },

  // Roadway and Category Types
  "NH": {
    en: "NH",
    hi: "रा.रा.",
    te: "జా.ర."
  },
  "SH": {
    en: "SH",
    hi: "रा.मा.",
    te: "రా.ర."
  },
  "Local": {
    en: "Local",
    hi: "स्थानीय",
    te: "స్థానిక"
  },
  "Pothole": {
    en: "Pothole",
    hi: "गड्ढा",
    te: "గుంత"
  },
  "Waterlogging": {
    en: "Waterlogging",
    hi: "जलभराव",
    te: "నీటి నిల్వ"
  },
  "Damaged Road": {
    en: "Damaged Road",
    hi: "क्षतिग्रस्त सड़क",
    te: "పాడైపోయిన రోడ్డు"
  },
  "Broken Street Lights": {
    en: "Broken Street Lights",
    hi: "टूटी स्ट्रीट लाइटें",
    te: "పగిలిపోయిన వీధి దీపాలు"
  },
  "Lack of Signage": {
    en: "Lack of Signage",
    hi: "संकेतों की कमी",
    te: "సంకేత బోర్డుల లేమి"
  },

  // Miscellaneous Words
  "Filters": {
    en: "Filters",
    hi: "फ़िल्टर",
    te: "వడపోతలు"
  }
};

// Specialized dictionary fields to handle dynamic strings returned by mock data (road names, contractors, etc.)
export const DYNAMIC_STRINGS: Record<string, Record<Language | 'te', string>> = {
  // Road names
  "National Highway 48 (NH-48 Bypass)": {
    en: "National Highway 48 (NH-48 Bypass)",
    hi: "राष्ट्रीय राजमार्ग 48 (NH-48 बाईपास)",
    te: "जాతీయ రహదారి 48 (NH-48 బైపాస్)"
  },
  "State Highway 12 (SH-12 Main)": {
    en: "State Highway 12 (SH-12 Main)",
    hi: "राज्य राजमार्ग 12 (SH-12 मुख्य)",
    te: "రాష్ట్ర రహదారి 12 (SH-12 మెయిన్)"
  },
  "Outer Ring Road (ORR) Service Lane": {
    en: "Outer Ring Road (ORR) Service Lane",
    hi: "आउटर रिंग रोड (ORR) सर्विस लेन",
    te: "ఔటర్ రింగ్ రోడ్ (ORR) సర్వీస్ లేన్"
  },
  "M.G. Road (Central Market Segment)": {
    en: "M.G. Road (Central Market Segment)",
    hi: "एम.जी. रोड (केंद्रीय बाजार खंड)",
    te: "M.G. రోడ్ (సెంట్రల్ మార్కెట్ సెగ్మెంట్)"
  },
  "Kasturba Marg": {
    en: "Kasturba Marg",
    hi: "कस्तूरबा मार्ग",
    te: "కస్తూర్బా మార్గ్"
  },
  "Sarjapur Road Segment (Wipro Artery)": {
    en: "Sarjapur Road Segment (Wipro Artery)",
    hi: "सरजापुर रोड खंड (विप्रो धमनी)",
    te: "సర్జాపూర్ రోడ్ సెగ్మెంట్ (విప్రో ఆర్టరీ)"
  },
  "Sarjapur Main Link Road": {
    en: "Sarjapur Main Link Road",
    hi: "सरजापुर मुख्य लिंक मार्ग",
    te: "సర్జాపూర్ మెయిన్ లింక్ రోడ్"
  },
  "Varthur Main Road (Local Drainage Zone)": {
    en: "Varthur Main Road (Local Drainage Zone)",
    hi: "वरथुर मेन रोड (स्थानीय ड्रेनेज क्षेत्र)",
    te: "వర్తూరు మెయిన్ రోడ్డు (స్థానిక పారుదల జోన్)"
  },
  "Whitefield Inner Ring Bypass": {
    en: "Whitefield Inner Ring Bypass",
    hi: "व्हाइटफील्ड इनर रिंग बाईपास",
    te: "వైట్‌ఫీల్డ్ ఇన్నర్ రింగ్ బైపాస్"
  },

  // Dynamic road names created by coordinate triggers
  "Bengaluru Region Corridor": {
    en: "Bengaluru Region Corridor",
    hi: "बेंगलुरु क्षेत्रीय कॉरिडोर",
    te: "బెంగళూరు ప్రాంతీయ కారిడార్"
  },
  "Vijayawada Region Corridor": {
    en: "Vijayawada Region Corridor",
    hi: "विजयवाड़ा क्षेत्रीय कॉरिडोर",
    te: "విజయవాడ ప్రాంతీయ కారిడార్"
  },

  // Contractor names
  "Infratech Projects Ltd.": {
    en: "Infratech Projects Ltd.",
    hi: "इन्फ्राटेक प्रोजेक्ट्स लिमिटेड",
    te: "ఇన్ఫ్రాటెక్ ప్రాజెక్ట్స్ లిమిటెడ్"
  },
  "Apex Infrastructure & Sons": {
    en: "Apex Infrastructure & Sons",
    hi: "एपेक्स इंफ्रास्ट्रक्चर एंड संस",
    te: "అపెక్స్ ఇన్‌ఫ్రాస్ట్రక్చర్ & సన్స్"
  },
  "Navdeep Buildcon Pvt. Ltd.": {
    en: "Navdeep Buildcon Pvt. Ltd.",
    hi: "नवदीप बिल्डकॉन प्राइवेट लिमिटेड",
    te: "నవదీప్ బిల్డ్‌కాన్ ప్రైవేట్ లిమిటెడ్"
  },
  "Standard Urban Bitumen Corp": {
    en: "Standard Urban Bitumen Corp",
    hi: "स्टैंडर्ड अर्बन बिटुमिन कॉर्प",
    te: "స్టాండర్డ్ అర్బన్ బిటుమెన్ కార్పొరేషన్"
  },
  "Karnataka Highway Developers": {
    en: "Karnataka Highway Developers",
    hi: "कर्नाटक हाईवे डेवलपर्स",
    te: "కర్ణాటక హైవే డెవలపర్స్"
  },
  "Eastern Transit Builders": {
    en: "Eastern Transit Builders",
    hi: "ईस्टर्न ट्रांजिट बिल्डर्स",
    te: "ఈస్టర్న్ ట్రాన్సిట్ బిల్డర్స్"
  },
  "Whitefield Metro Connectors": {
    en: "Whitefield Metro Connectors",
    hi: "व्हाइटफील्ड मेट्रो कनेक्टर्स",
    te: "వైట్‌ఫీల్డ్ మెట్రో కనెక్టర్స్"
  },

  // Maintenance agencies / authorities
  "National Highways Authority of India (NHAI)": {
    en: "National Highways Authority of India (NHAI)",
    hi: "भारतीय राष्ट्रीय राजमार्ग प्राधिकरण (NHAI)",
    te: "భారత జాతీయ రహదారుల సంస్థ (NHAI)"
  },
  "State Public Works Department (PWD)": {
    en: "State Public Works Department (PWD)",
    hi: "राज्य लोक निर्माण विभाग (PWD)",
    te: "రాష్ట్ర పబ్లిక్ వర్క్స్ డిపార్ట్‌మెంట్ (PWD)"
  },
  "Municipal Corporation (City Zone)": {
    en: "Municipal Corporation (City Zone)",
    hi: "नगर निगम (सिटी ज़ोन)",
    te: "మున్సిపల్ కార్పొరేషన్ (సిటీ జోన్)"
  },
  "Municipal Corporation (Urban Drainage)": {
    en: "Municipal Corporation (Urban Drainage)",
    hi: "नगर निगम (शहरी ड्रेनेज)",
    te: "మున్సిపల్ కార్పొరేషన్ (పట్టణ పారుదల)"
  },
  "Search segments or enter city (e.g. Vijayawada) to relocate...": {
    en: "Search segments or enter city (e.g. Vijayawada) to relocate...",
    hi: "स्थान बदलने के लिए खंड खोजें या शहर दर्ज करें (जैसे, विजयवाड़ा)...",
    te: "వేరే చోటికి వెళ్లడానికి విభాగాలను శోధించండి లేదా నగరాన్ని (ఉదా. విజయవాడ) నమోదు చేయండి..."
  },
  "All Segments": {
    en: "All Segments",
    hi: "सभी खंड",
    te: "అన్ని విభాగాలు"
  },
  "Active Grid Index": {
    en: "Active Grid Index",
    hi: "सक्रिय ग्रिड इंडेक्स",
    te: "క్రియాశీల గ్రిడ్ ఇండెక్స్"
  },
  "Showing": {
    en: "Showing",
    hi: "दिखा रहा है",
    te: "చూపిస్తున్నవి"
  },
  "Geospatial Compass": {
    en: "Geospatial Compass",
    hi: "जियोस्पेशियल कम्पास",
    te: "జియోస్పేషియల్ దిక్సూచి"
  },
  "Clicking any road segment highlighting opens coordinates. You may trigger audits directly into our portal indexing.": {
    en: "Clicking any road segment highlighting opens coordinates. You may trigger audits directly into our portal indexing.",
    hi: "किसी भी सड़क खंड पर क्लिक करने से निर्देशांक खुलते हैं। आप सीधे हमारे पोर्टल इंडेक्सिंग में ऑडिट शुरू कर सकते हैं।",
    te: "ఏదైనా రహదారి విభాగంపై క్లిక్ చేయడం ద్వారా కోఆర్డినేట్‌లు తెరవబడతాయి. మీరు మా పోర్టల్ ఇండెక్సింగ్‌లోకి నేరుగా ఆడిట్‌లను ప్రారంభించవచ్చు."
  },
  "Active Center:": {
    en: "Active Center:",
    hi: "सक्रिय केंद्र:",
    te: "క్రియాశీల కేంద్రం:"
  },
  "City Zone": {
    en: "City Zone",
    hi: "सिटी ज़ोन",
    te: "సిటీ జోన్"
  },
  "Active Citizen Defect Hazards Loaded": {
    en: "Active Citizen Defect Hazards Loaded",
    hi: "सक्रिय नागरिक दोष खतरे लोड किए गए",
    te: "క్రియాశీల పౌరుల లోపభూయిష్ట ప్రమాదాలు లోడ్ చేయబడ్డాయి"
  },
  "My Location": {
    en: "My Location",
    hi: "मेरा स्थान",
    te: "నా స్థానం"
  },
  "Audit Ledger & Details": {
    en: "Audit Ledger & Details",
    hi: "ऑडिट बहीखाता और विवरण",
    te: "ఆడిట్ లెడ్జర్ & వివరాలు"
  },
  "Key Network Markers": {
    en: "Key Network Markers",
    hi: "मुख्य नेटवर्क संकेतक",
    te: "కీలక నెట్‌వర్క్ మార్కర్లు"
  },
  "NH Network": {
    en: "NH Network",
    hi: "राष्ट्रीय राजमार्ग नेटवर्क",
    te: "జాతీయ రహదారి నెట్‌వర్క్"
  },
  "SH Network": {
    en: "SH Network",
    hi: "राज्य राजमार्ग नेटवर्क",
    te: "రాష్ట్ర రహదారి నెట్‌వర్క్"
  },
  "Local Streets": {
    en: "Local Streets",
    hi: "स्थानीय सड़कें",
    te: "స్థానిక వీధులు"
  },
  "Safety Hazard Reported Point": {
    en: "Safety Hazard Reported Point",
    hi: "सुरक्षा खतरा रिपोर्ट किया गया बिंदु",
    te: "భద్రతా ప్రమాద నివేదిక పాయింట్"
  },
  "Hazard Alert": {
    en: "Hazard Alert",
    hi: "खतरे की चेतावनी",
    te: "ప్రమాद హెచ్చరిక"
  },
  "Audit segment": {
    en: "Audit segment",
    hi: "खंड का ऑडिट करें",
    te: "విభాగాన్ని ఆడిట్ చేయండి"
  },
  "Track State": {
    en: "Track State",
    hi: "स्थिति ट्रैक करें",
    te: "స్థితిని ట్రాక్ చేయండి"
  },
  "Maintainer:": {
    en: "Maintainer:",
    hi: "रखरखावकर्ता:",
    te: "నిర్వహణ చేసేవారు:"
  },
  "Length:": {
    en: "Length:",
    hi: "लंबाई:",
    te: "పొడవు:"
  },
  "Lanes": {
    en: "Lanes",
    hi: "लेन",
    te: "లేన్లు"
  },
  "active grievances:": {
    en: "active grievances:",
    hi: "सक्रिय शिकायतें:",
    te: "సంతృప్తి చెందని పౌరుల సమస్యలు:"
  },
  "View Audits & Ledger": {
    en: "View Audits & Ledger",
    hi: "ऑडिट और बहीखाता देखें",
    te: "ఆడిట్ మరియు లెడ్జర్ చూడండి"
  },
  "Municipal Corporation (East Zone Division)": {
    en: "Municipal Corporation (East Zone Division)",
    hi: "नगर निगम (पूर्वी क्षेत्र प्रभाग)",
    te: "మున్సిపల్ కార్పొరేషన్ (తూర్పు జోన్ డివిజన్)"
  },

  // Incident Subjects & Descriptions
  "Large Potholes near Metro Station Exit B": {
    en: "Large Potholes near Metro Station Exit B",
    hi: "मेट्रो स्टेशन निकास बी के पास बड़े गड्ढे",
    te: "మెట్రో స్టేషన్ ఎగ్జిట్ బి సమీపంలో పెద్ద గుంతలు"
  },
  "There are three deep consecutive potholes near exit B. Two two-wheelers have nearly slipped in the dark. Requires urgent asphalt patching.": {
    en: "There are three deep consecutive potholes near exit B. Two two-wheelers have nearly slipped in the dark. Requires urgent asphalt patching.",
    hi: "निकास बी के पास लगातार तीन गहरे गड्ढे हैं। दो दुपहिया वाहन अंधेरे में लगभग फिसल गए हैं। तत्काल डामर पैचिंग की आवश्यकता है।",
    te: "ఎగ్జిట్ బి సమీపంలో మూడు లోతైన వరుస గుంతలు ఉన్నాయి. చీకటిలో రెండు ద్విచక్ర వాహనాలు జారిపోయే ప్రమాదం తప్పింది. తక్షణ తారు మరమ్మత్తు అవసరం."
  },
  "Flooding and Waterlogging during Evening Showers": {
    en: "Flooding and Waterlogging during Evening Showers",
    hi: "शाम की बौछारों के दौरान बाढ़ और जलभराव",
    te: "సాయంత్రం వానలకు నీరు నిలవడం"
  },
  "Drains along the pedestrian stretch are completely clogged with construction debris, causing water to pool up to 6 inches, making pedestrian crossing impossible.": {
    en: "Drains along the pedestrian stretch are completely clogged with construction debris, causing water to pool up to 6 inches, making pedestrian crossing impossible.",
    hi: "पैदल चलने वाले मार्ग के किनारे की नालियां निर्माण मलबे से पूरी तरह भरी हुई हैं, जिससे 6 इंच तक पानी जमा हो जाता है, जिससे पैदल यात्रियों का पार करना असंभव हो जाता है।",
    te: "పాదచారుల మార్గంలో ఉన్న కాలువలు నిర్మాణ వ్యర్థాలతో పూర్తిగా నిండిపోయాయి, దీనివల్ల 6 అంగుళాల వరకు నీరు పేరుకుపోతుంది, దీంతో పాదచారులు దాటడం అసాధ్యం అవుతోంది."
  },
  "Damaged Guard Rails at Curve Landmark Km 14": {
    en: "Damaged Guard Rails at Curve Landmark Km 14",
    hi: "मोड़ लैंडमार्क किमी 14 पर क्षतिग्रस्त गार्ड रेल",
    te: "మలుపు మైలురాయి కిమీ 14 వద్ద దెబ్బతిన్న గార్డు పట్టాలు"
  },
  "The metal guard rail on the left shoulder is completely crushed from a minor transport truck collision last week. High risk of off-road vehicle falls.": {
    en: "The metal guard rail on the left shoulder is completely crushed from a minor transport truck collision last week. High risk of off-road vehicle falls.",
    hi: "पिछले हफ्ते एक मामूली मालवाहक ट्रक की टक्कर से बाएं कंधे की धातु की गार्ड रेल पूरी तरह से क्षतिग्रस्त हो गई है। वाहन के सड़क से नीचे गिरने का उच्च जोखिम है।",
    te: "గత వారం లైట్ ట్రాన్స్‌పోర్ట్ ట్రక్ ఢీకొనడంతో ఎడమ వైపు రహదారి మెటల్ గార్డ్ రైలు పూర్తిగా నుజ్జునుజ్జయింది. వాహనాలు రోడ్డు పక్కన పడిపోయే ప్రమాదం ఉంది."
  },
  "Five consecutive street lights non-functioning": {
    en: "Five consecutive street lights non-functioning",
    hi: "लगातार पांच स्ट्रीट लाइटें काम नहीं कर रही हैं",
    te: "వరుసగా ఐదు వీధి దీపాలు పనిచేయడం లేదు"
  },
  "The stretch between the tech park entry and the main flyover is pitch black after 7 PM. Very unsafe for women walking home from evening shifts.": {
    en: "The stretch between the tech park entry and the main flyover is pitch black after 7 PM. Very unsafe for women walking home from evening shifts.",
    hi: "टेक पार्क प्रवेश और मुख्य फ्लाईओवर के बीच का हिस्सा शाम 7 बजे के बाद बिल्कुल अंधेरा रहता है। शाम की शिफ्ट से घर लौटने वाली महिलाओं के लिए बहुत असुरक्षित है।",
    te: "టెక్ పార్క్ ప్రవేశ మార్గం మరియు ప్రధాన ఫ్లైఓవర్ మధ్య ప్రాంతం రాత్రి 7 గంటల తర్వాత చీకటిగా ఉంటుంది. సాయంత్రం షిఫ్ట్ నుండి ఇంటికి వెళ్లే మహిళలకు చాలా అసురక్షితం."
  },
  "Complete road surface deterioration & stone loose particles": {
    en: "Complete road surface deterioration & stone loose particles",
    hi: "सड़क की सतह पूरी तरह से खराब और ढीले पत्थर के कण",
    te: "రోడ్డు ఉపరితలం పూర్తిగా దెబ్బతినడం & రాళ్లు వదులుగా మారడం"
  },
  "Top layer of asphalt has fully eroded, leaving gravel scattered everywhere. Motorists are slipping, and dust pollution is causing breathing issues for local shops.": {
    en: "Top layer of asphalt has fully eroded, leaving gravel scattered everywhere. Motorists are slipping, and dust pollution is causing breathing issues for local shops.",
    hi: "डामर की ऊपरी परत पूरी तरह से नष्ट हो गई है, जिससे हर जगह बजरी बिखरी पड़ी है। वाहन चालक फिसल रहे हैं, और धूल के प्रदूषण से स्थानीय दुकानों के लिए सांस लेने की समस्या हो रही है।",
    te: "తారు రస్తా పై పొర పూర్తిగా అరిగిపోయింది, గ్రావెల్ అంతటా చెల్లాచెదురుగా పడి ఉంది. వాహనదారులు జారిపడుతున్నారు, దుమ్ము కాలుෂ్యం స్థానిక దుకాణదారులకు శ్వాస సమస్యలను కలిగిస్తోంది."
  },

  // Roadway dynamic ticket templates (roadGenerator.ts)
  "Dangerous Potholes on Intersection Curve": {
    en: "Dangerous Potholes on Intersection Curve",
    hi: "चौराहे के मोड़ पर खतरनाक गड्ढे",
    te: "కూడలి వంపు వద్ద ప్రమాదకరమైన గుంతలు"
  },
  "There are multiple deep and sharp-edged potholes that are extremely perilous for two-wheelers, especially during sunset hours due to poor visibility.": {
    en: "There are multiple deep and sharp-edged potholes that are extremely perilous for two-wheelers, especially during sunset hours due to poor visibility.",
    hi: "यहां कई गहरे और नुकीले किनारों वाले गड्ढे हैं जो दुपहिया वाहनों के लिए बेहद खतरनाक हैं, खासकर कम दृश्यता के कारण सूर्यास्त के समय।",
    te: "ఇక్కడ అనేక లోతైన మరియు పదునైన అంచులు గల గుంతలు ఉన్నాయి, ఇవి ద్విచక్ర వాహనదారులకు, ముఖ్యంగా సూర్యాస్తమయ సమయాల్లో తక్కువ దృశ్యమానత కారణంగా చాలా ప్రమాదకరమైనవి."
  },
  "Pedestrian Crossing Gutter Flood After Shorter Rainfall": {
    en: "Pedestrian Crossing Gutter Flood After Shorter Rainfall",
    hi: "कम बारिश के बाद भी जेब्रा क्रॉसिंग/गटर पर पानी का भराव",
    te: "స్వల్ప వర్షపాతం తరువాత పాదచారులు దాటే మార్గం వద్ద మురుగునీరు నిలవడం"
  },
  "The pedestrian storm drains are fully blocked by sand and civil bags. Water pools up to several inches, forcing people to walk dangerously on active vehicular lanes.": {
    en: "The pedestrian storm drains are fully blocked by sand and civil bags. Water pools up to several inches, forcing people to walk dangerously on active vehicular lanes.",
    hi: "पैदल चलने वालों के लिए बने बरसाती नाले रेत और कंक्रीट की थैलियों से पूरी तरह से अवरुद्ध हैं। पानी कई इंच तक जमा हो जाता है, जिससे लोग सक्रिय वाहन लेन पर खतरनाक तरीके से चलने के लिए मजबूर होते हैं।",
    te: "పాదచారుల తుఫాను కాలువలు ఇసుక మరియు సిమెంట్ సంచులతో పూర్తిగా మూసుకుపోయాయి. నీరు అనేక అంగుళాల వరకు నిలిచిపోతుంది, ప్రజలు చురుకైన వాహనాల లేన్లలో ప్రమాదకరంగా నడవవలసి వస్తుంది."
  },
  "Severely Damaged Crash Rails on the Bypass Bend": {
    en: "Severely Damaged Crash Rails on the Bypass Bend",
    hi: "बाईपास मोड़ पर गंभीर रूप से क्षतिग्रस्त क्रैश रेल",
    te: "బైపాస్ వంపు వద్ద తీవ్రంగా దెబ్బతిన్న క్రాష్ రైళ్లు"
  },
  "A recent heavy transport truck scrap collision left a 15-meter length of structural steel crash barrier shredded and hanging. High risk of off-highway roll-overs.": {
    en: "A recent heavy transport truck scrap collision left a 15-meter length of structural steel crash barrier shredded and hanging. High risk of off-highway roll-overs.",
    hi: "हाल ही में एक भारी मालवाहक ट्रक की टक्कर से स्टील की संरचनात्मक क्रैश बेरियर का 15 मीटर का हिस्सा टूट कर लटक गया है। वाहनों के राजमार्ग से नीचे गिरने का उच्च जोखिम है।",
    te: "ఇటీవల జరిగిన భారీ రవాణా లారీ ప్రమాదం కారణంగా 15 మీటర్ల పొడవు గల ఉక్కు క్రాష్ అడ్డంకులు దెబ్బతిన్నాయి. హైవే పై నుండి వాహనాలు కింద పడిపోయే ప్రమాదం ఉంది."
  },
  "Continuous Stretch of Broken/Non-Functional Streetlights": {
    en: "Continuous Stretch of Broken/Non-Functional Streetlights",
    hi: "टूटी/खराब स्ट्रीट लाइटों का लगातार फैला हुआ अंधेरा",
    te: "పనిచేయని వీధి దీపాల నిరంతర శ్రేణి"
  },
  "Over 6 consecutive street poles are entirely dark between evening commute hours. Highly unsafe zone for pedestrians and cyclists returning late.": {
    en: "Over 6 consecutive street poles are entirely dark between evening commute hours. Highly unsafe zone for pedestrians and cyclists returning late.",
    hi: "शाम के आवागमन के समय लगातार 6 से अधिक स्ट्रीट पोल पूरी तरह अंधेरे रहते हैं। देर से लौटने वाले पैदल यात्रियों और साइकिल चालक के लिए अत्यधिक असुरक्षित क्षेत्र।",
    te: "సాయంత్రం通勤 వేళల్లో వరుసగా 6 కంటే ఎక్కువ వీధి దీపాల స్తంభాలు పూర్తిగా చీకటిగా ఉంటున్నాయి. ఆలస్యంగా తిరిగి వచ్చే పాదచారులకు మరియు సైక్లిస్టులకు ఇది చాలా అసురక్షితమైన జోన్."
  },
  "Complete Absence of Intersection and Curve Warning Signage": {
    en: "Complete Absence of Intersection and Curve Warning Signage",
    hi: "चौराहे और मोड़ के चेतावनी संकेतक बोर्डों का पूर्ण अभाव",
    te: "కూడలి మరియు వంపు హెచ్చరిక బోర్డుల పూర్తి లేమి"
  },
  "There are no signs indicating the sudden sharp left-turn ahead or speed limits. Vehicles regularly misjudge the turn, screeching their brakes.": {
    en: "There are no signs indicating the sudden sharp left-turn ahead or speed limits. Vehicles regularly misjudge the turn, screeching their brakes.",
    hi: "आगे अचानक तेज बाएं मोड़ या गति सीमा का संकेत देने वाला कोई बोर्ड नहीं है। वाहन अक्सर मोड़ का गलत अनुमान लगाते हैं, और तेजी से ब्रेक लगाते हैं।",
    te: "ముందు వచ్చే అకస్మాత్తు ఎడమ మలుపు లేదా వేగ పరిమితులను సూచించే సంకేతాలు ఏవీ లేవు. వాహనాలు క్రమం తప్పకుండా మలుపును తప్పుగా అంచనా వేస్తాయి, హఠాత్తుగా బ్రేకులు వేస్తాయి."
  },

  // Expense Categories / Items details
  "Sub-grade & Earthwork Preparation": {
    en: "Sub-grade & Earthwork Preparation",
    hi: "उप-ग्रेड और मिट्टी की तैयारी",
    te: "సబ్-గ్రేడ్ & ఎర్త్‌వర్క్ సన్నాహాలు"
  },
  "Excavation, grading, and compacting soils for standard expressway foundational support.": {
    en: "Excavation, grading, and compacting soils for standard expressway foundational support.",
    hi: "मानक एक्सप्रेसवे की नीव के लिए मिट्टी की खुदाई, ग्रेडिंग और कॉम्पैक्टिंग।",
    te: "ఎక్స్‌ప్రెస్‌వే పునాది మద్దతు కోసం మట్టి తవ్వకం, క్రమబద్ధీకరణ మరియు కుదింపు పనులు."
  },
  "Asphalt Layering & Bituminous Concrete": {
    en: "Asphalt Layering & Bituminous Concrete",
    hi: "डामर बिछाना और बिटुमिनस कंक्रीट",
    te: "తారు లేయరింగ్ & బిటుమినస్ కాంక్రీటు"
  },
  "Multi-layer concrete application of Hot Mix Asphalt conforming to IRC:111 guidelines.": {
    en: "Multi-layer concrete application of Hot Mix Asphalt conforming to IRC:111 guidelines.",
    hi: "आईआरसी:111 दिशानिर्देशों के अनुरूप हॉट मिक्स डामर का बहु-स्तरीय कंक्रीट अनुप्रयोग।",
    te: "IRC:111 మార్గదర్శకాలకు అనుగుణంగా హాట్ మిక్స్ తారు యొక్క బహుళ-పొర కాంక్రీట్ అప్లికేషన్."
  },
  "Highway Drainage Systems": {
    en: "Highway Drainage Systems",
    hi: "राजमार्ग जल निकासी प्रणाली",
    te: "హైవే డ్రైనేజీ వ్యవస్థలు"
  },
  "Construction of concrete storm drains alongside expressway shoulders to prevent ponding.": {
    en: "Construction of concrete storm drains alongside expressway shoulders to prevent ponding.",
    hi: "जलभराव को रोकने के लिए एक्सप्रेसवे के किनारे कंक्रीट के नालों का निर्माण।",
    te: "రహదారిపై నీరు నిలవకుండా కాంక్రీట్ డ్రైనేజీ కాలువల నిర్మాణం."
  },
  "Safety Signage & Crash Barriers": {
    en: "Safety Signage & Crash Barriers",
    hi: "सुरक्षा संकेत और क्रैश बैरियर",
    te: "భద్రతా సంకేతాలు & క్రాష్ అడ్డంకులు"
  },
  "Installation of retro-reflective signboards and heavy W-beam metal crash guards.": {
    en: "Installation of retro-reflective signboards and heavy W-beam metal crash guards.",
    hi: "रेट्रो-रिफ्लेक्टिव साइनबोर्ड और भारी डब्लू-बीम मेटल क्रैश गार्ड की स्थापना।",
    te: "వెనుకకు ప్రతిబింబించే సంకేత బోర్డుల ఏర్పాటు మరియు భారీ డబ్ల్యు-బీమ్ మెటల్ క్రాష్ గార్డులు."
  },
  "Thermoplastic Lane Markings": {
    en: "Thermoplastic Lane Markings",
    hi: "थर्मोप्लास्टिक लेन चिन्हांकन",
    te: "థర్మోప్లాస్టిక్ లేన్ గుర్తులు"
  },
  "High durability retro-reflective thermoplastic yellow and white stripings.": {
    en: "High durability retro-reflective thermoplastic yellow and white stripings.",
    hi: "उच्च स्थायित्व रेट्रो-रिफ्लेक्टिव थर्मोप्लास्टिक पीली और सफेद धारियां।",
    te: "అధిక మన్నిక గల థర్మోప్లాస్టిక్ పసుపు మరియు తెలుపు చారల గుర్తులు."
  },
  "Base Stabilization & Leveling": {
    en: "Base Stabilization & Leveling",
    hi: "आधार सुदृढ़ीकरण और समतलीकरण",
    te: "బేస్ స్థిరీకరణ & చదును పనులు"
  },
  "Treatment of base materials with cement mixes to restore uniform load capability.": {
    en: "Treatment of base materials with cement mixes to restore uniform load capability.",
    hi: "समान लोड क्षमता बहाल करने के लिए सीमेंट मिक्स के साथ आधार सामग्रियों का उपचार।",
    te: "సమతుల్య బరువు మోసే సామర్థ్యాన్ని పునరుద్ధరించడానికి సిమెంట్ మిశ్రమాలతో మూల పదార్థాల సంస్కరణ."
  },
  "Bituminous Carpet Relaying": {
    en: "Bituminous Carpet Relaying",
    hi: "बिटुमिनस कालीन बिछाना",
    te: "బిటుమినస్ కార్పెట్ రీలేయింగ్"
  },
  "Application of dense open-graded friction course asphalt for main traffic lanes.": {
    en: "Application of dense open-graded friction course asphalt for main traffic lanes.",
    hi: "मुख्य यातायात लेन के लिए घने ओपेन-ग्रेडेड घर्षण पाठ्यक्रम डामर का अनुप्रयोग।",
    te: "ప్రధాన రవాణా మార్గాల కోసం దట్టమైన తారు ఉపరితలం వేసే పనులు."
  },
  "Culverts and Road Crossing Pipes": {
    en: "Culverts and Road Crossing Pipes",
    hi: "पुलिया और सड़क पार करने वाली पाइपें",
    te: "కల్వర్టులు మరియు రోడ్డు క్రాసింగ్ పైపులు"
  },
  "Concrete pipe culvert replacement to ease cross-flow irrigation and rainfall discharge.": {
    en: "Concrete pipe culvert replacement to ease cross-flow irrigation and rainfall discharge.",
    hi: "पार-प्रवाह सिंचाई और वर्षा जल निकासी को आसान बनाने के लिए कंक्रीट पाइप पुलिया प्रतिस्थापन।",
    te: "సాఫీగా నీటి పారుదల మరియు వాన నీటి విసర్జన కోసం కాంక్రీట్ పైపు కల్వర్టు ఏర్పాటు."
  },
  "Road Studs & Reflectors (Cats Eyes)": {
    en: "Road Studs & Reflectors (Cats Eyes)",
    hi: "रोड स्टड और रिफ्लेक्टर (बिल्ली की आँखें)",
    te: "రోడ్ స్టడ్స్ & రిఫ్లెక్టర్లు (పిల్లి కళ్ళు)"
  },
  "Installing plastic embedded solar-powered LEDs and glass bead retroreflective lane markers.": {
    en: "Installing plastic embedded solar-powered LEDs and glass bead retroreflective lane markers.",
    hi: "प्लास्टिक एम्बेडेड सौर-संचालित एलईडी और ग्लास बीड रेट्रोरेफ्लेक्टिव लेन मार्कर स्थापित करना।",
    te: "సౌరశక్తితో నడిచే ఎల్‌ఈడీలు మరియు రిఫ్లెక్టివ్ లేన్ మార్కర్ల అమరిక."
  },
  "Milling & Surface Scraping": {
    en: "Milling & Surface Scraping",
    hi: "मिलिंग और सतह स्क्रैपिंग",
    te: "మిల్లింగ్ & ఉపరితల స్క్రాపింగ్"
  },
  "Scraping and recycling old cracked asphalt layers up to 40mm thickness.": {
    en: "Scraping and recycling old cracked asphalt layers up to 40mm thickness.",
    hi: "40 मिमी मोटाई तक पुरानी फटी डामर परतों को खुरचना और रीसायकल करना।",
    te: "40మిమీ మందం వరకు ఉన్న పాత పగులగొట్టిన తారు పొరలను తొలగించి రీసైకిల్ చేయడం."
  },
  "Micro-surfacing Overlays": {
    en: "Micro-surfacing Overlays",
    hi: "माइक्रो-सरफेसिंग ओवरले",
    te: "మైక్రో-సర్ఫేసింగ్ ఓవర్లేలు"
  },
  "Polymer modified asphalt emulsion overlay for high-tech micro-durability and noise mitigation.": {
    en: "Polymer modified asphalt emulsion overlay for high-tech micro-durability and noise mitigation.",
    hi: "उच्च तकनीक सूक्ष्म-स्थायित्व और शोर कम करने के लिए पॉलिमर संशोधित डामर पायस ओवरले।",
    te: "అధిక మన్నిక మరియు శబ్ద నియంత్రణ కోసం పాలిమర్ సవరించిన తారు మిశ్రమం పూత."
  },
  "Utility Sewer Lines Relocation": {
    en: "Utility Sewer Lines Relocation",
    hi: "उपयोगिता सीवर लाइनों का स्थानांतरण",
    te: "ఫ్లూయిడ్ సీవర్ లైన్ల పునఃస్థాపన"
  },
  "Report Public Hazards": {
    en: "Report Public Hazards",
    hi: "सार्वजनिक खतरों की रिपोर्ट करें",
    te: "పబ్లిక్ ప్రమాదాల నివేదిక"
  },
  "Submit photos, locations, and safety risks. Our automated system routes reports to local civil zones instantly.": {
    en: "Submit photos, locations, and safety risks. Our automated system routes reports to local civil zones instantly.",
    hi: "फ़ोटो, स्थान और सुरक्षा जोखिम सबमिट करें। हमारी स्वचालित प्रणाली स्थानीय नागरिक क्षेत्रों में तुरंत रिपोर्ट भेजती है।",
    te: "ఫోటోలు, స్థానాలు మరియు భద్రతా ప్రమాదాలను సమర్పించండి. మా ఆటోమేటెడ్ సిస్టమ్ నివేదికలను స్థానిక సివిల్ జోన్‌లకు తక్షణమే పంపుతుంది।"
  },
  "Lodge New Complaint": {
    en: "Lodge New Complaint",
    hi: "नई शिकायत दर्ज करें",
    te: "కొత్త ఫిర్యాదును నమోదు చేయండి"
  },
  "Step 1 of 1": {
    en: "Step 1 of 1",
    hi: "चरण 1 का 1",
    te: "నమోదు ప్రక్రియ 1/1"
  },
  "Issue Successfully Submitted!": {
    en: "Issue Successfully Submitted!",
    hi: "समस्या सफलतापूर्वक सबमिट की गई!",
    te: "సమస్య విజయవంతంగా సమర్పించబడింది!"
  },
  "Your complaint has been synchronized with the": {
    en: "Your complaint has been synchronized with the",
    hi: "आपकी शिकायत को इसके साथ सिंक्रनाइज़ किया गया है",
    te: "మీ ఫిర్యాదు దీనితో సమకాలీకరించబడింది"
  },
  "Roadwatch National Gateway": {
    en: "Roadwatch National Gateway",
    hi: "रोडवॉच नेशनल गेटवे",
    te: "రోడ్‌వాచ్ నేషనల్ గేట్‌వే"
  },
  "Tracking Code:": {
    en: "Tracking Code:",
    hi: "ट्रैकिंग कोड:",
    te: "ట్రాకింగ్ కోడ్:"
  },
  "Routed to:": {
    en: "Routed to:",
    hi: "को भेजा गया:",
    te: "దీనికి రూట్ చేయబడింది:"
  },
  "File another hazard report": {
    en: "File another hazard report",
    hi: "एक और खतरे की रिपोर्ट दर्ज करें",
    te: "మరో ప్రమాద నివేదికను సమర్పించండి"
  },
  "Short Summary of Hazard": {
    en: "Short Summary of Hazard",
    hi: "खतरे का संक्षिप्त सारांश",
    te: "ప్రమాదం యొక్క సంక్షిప్త సారాంశం"
  },
  "Select Hazard Category": {
    en: "Select Hazard Category",
    hi: "खतरे की श्रेणी चुनें",
    te: "ప్రమాదం యొక్క వర్గాన్ని ఎంచుకోండి"
  },
  "Affected Roadway": {
    en: "Affected Roadway",
    hi: "प्रभावित सड़क मार्ग",
    te: "ప్రభావిత రహదారి"
  },
  "-- Choose Roadway --": {
    en: "-- Choose Roadway --",
    hi: "-- सड़क मार्ग चुनें --",
    te: "-- రహదారిని ఎంచుకోండి --"
  },
  "Maintenance Agency": {
    en: "Maintenance Agency",
    hi: "रखरखाव एजेंसी",
    te: "निర్వహణ సంస్థ"
  },
  "-- Choose Maintenance Agency --": {
    en: "-- Choose Maintenance Agency --",
    hi: "-- रखरखाव एजेंसी चुनें --",
    te: "-- నిర్వహణ సంస్థను ఎంచుకోండి --"
  },
  "Selection Canceled": {
    en: "Selection Canceled",
    hi: "चयन रद्द कर दिया गया",
    te: "ఎంపిక రద్దు చేయబడింది"
  },
  "AI Agency Routing Engine": {
    en: "AI Agency Routing Engine",
    hi: "एआई एजेंसी रूटिंग इंजन",
    te: "AI ఏజెన్సీ రూటింగ్ ఇంజిన్"
  },
  "Auto-analyzes roadway characteristics, category tags, and typed description to route to correct jurisdictional desk.": {
    en: "Auto-analyzes roadway characteristics, category tags, and typed description to route to correct jurisdictional desk.",
    hi: "सही अधिकार क्षेत्र डेस्क पर भेजने के लिए सड़क मार्ग की विशेषताओं, श्रेणी टैग और टाइप किए गए विवरण का स्वचालित रूप से विश्लेषण करता है।",
    te: "సరైన అధికార పరిధి డెస్క్‌కు రూట్ చేయడానికి రోడ్డు లక్షణాలు, కేటగిరీ ట్యాగ్‌లు మరియు టైప్ చేసిన వివరణను స్వయంచాలకంగా విశ్లేషిస్తుంది।"
  },
  "Auto Dispatch": {
    en: "Auto Dispatch",
    hi: "ऑटो प्रेषण",
    te: "ఆటో డిస్పాచ్"
  },
  "Manual Select": {
    en: "Manual Select",
    hi: "मैन्युअल चयन",
    te: "మాన్యువల్ ఎంపిక"
  },
  "Choose an Affected Roadway above to activate automated routing.": {
    en: "Choose an Affected Roadway above to activate automated routing.",
    hi: "स्वचालित रूटिंग को सक्रिय करने के लिए ऊपर एक प्रभावित सड़क मार्ग चुनें।",
    te: "స్వయంచాలక రూటింగ్‌ని సక్రియం చేయడానికి పైన ప్రభావిత రహదారిని ఎంచుకోండి।"
  },
  "Analyzing typed hazard elements & checking public geofences...": {
    en: "Analyzing typed hazard elements & checking public geofences...",
    hi: "टाइप किए गए खतरे के तत्वों का विश्लेषण और सार्वजनिक जियोफेंस की जांच की जा रही है...",
    te: "టైప్ చేసిన ప్రమాద అంశాల విశ్లేషణ & పబ్లిక్ జియోఫెన్స్‌ల తనిఖీ జరుగుతోంది..."
  },
  "Respective Authority:": {
    en: "Respective Authority:",
    hi: "संबंधित प्राधिकरण:",
    te: "సంబంధిత అధికారం:"
  },
  "Confidence:": {
    en: "Confidence:",
    hi: "विश्वसनीयता:",
    te: "విశ్వసనీయత:"
  },
  "Match": {
    en: "Match",
    hi: "समानता",
    te: "సరిపోలింది"
  },
  "Detected Indicators:": {
    en: "Detected Indicators:",
    hi: "पता लगाए गए संकेतक:",
    te: "గుర్तించిన సూచికలు:"
  },
  "Taxpayer Jurisdiction Reasoning:": {
    en: "Taxpayer Jurisdiction Reasoning:",
    hi: "करदाता क्षेत्राधिकार तर्क:",
    te: "పన్ను చెల్లింపుదారుల అధికార పరిధి కారణం:"
  },
  "Direct auto-routing active. Report will be securely emailed and dispatched to this agency.": {
    en: "Direct auto-routing active. Report will be securely emailed and dispatched to this agency.",
    hi: "सीधे ऑटो-रूटिंग सक्रिय है। रिपोर्ट सुरक्षित रूप से ईमेल की जाएगी और इस एजेंसी को भेजी जाएगी।",
    te: "డైరెక్ట్ ఆటో-రూటింగ్ యాక్టివ్‌గా ఉంది. నివేదిక సురక్షితంగా ఇమెయిల్ చేయబడుతుంది మరియు ఈ సంస్థకు పంపబడుతుంది।"
  },
  "Routing analysis is awaiting inputs. Choose road segment to populate.": {
    en: "Routing analysis is awaiting inputs. Choose road segment to populate.",
    hi: "रूटिंग विश्लेषण इनपुट की प्रतीक्षा कर रहा है। विवरण भरने के लिए सड़क खंड चुनें।",
    te: "రూటింగ్ విశ్లేషణ ఇన్‌పుట్‌ల కోసం వేచి ఉంది. వివరాల కోసం రోడ్డు విభాగాన్ని ఎంచుకోండి।"
  },
  "Detailed Description": {
    en: "Detailed Description",
    hi: "विस्तृत विवरण",
    te: "వివరణాత్మక వివరణ"
  },
  "Listening (pulsing)...": {
    en: "Listening (pulsing)...",
    hi: "सुन रहा है (पल्सिंग)...",
    te: "వింటున్నాము (పల్సింగ్)..."
  },
  "Simulate Audio Type-in": {
    en: "Simulate Audio Type-in",
    hi: "ऑडियो टाइप-इन का अनुकरण करें",
    te: "ఆడియో టైప్-ఇన్ అనుకరించు"
  },
  "Speaking: \"Cracks propagating into shoulder potholes...\" transcribing soon...": {
    en: "Speaking: \"Cracks propagating into shoulder potholes...\" transcribing soon...",
    hi: "बोलना: \"क्रैक शोल्डर गड्ढों में फैल रहे हैं...\" जल्द ही ट्रांसक्राइब किया जाएगा...",
    te: "మాట్లాడటం: \"గుంతలలో పగుళ్లు వ్యాపిస్తున్నాయి...\" త్వరలో నివేదించబడుతుంది..."
  },
  "Give descriptive particulars (e.g., street location identifiers, depth estimate, hazard level for nighttime travel)...": {
    en: "Give descriptive particulars (e.g., street location identifiers, depth estimate, hazard level for nighttime travel)...",
    hi: "विवरण प्रदान करें (जैसे, सड़क स्थान पहचानकर्ता, गहराई अनुमान, रात की यात्रा के लिए खतरे का स्तर)...",
    te: "వివరణాత్మక వివరాలను ఇవ్వండి (ఉదా., వీధి లొకేషన్ గుర్తింపులు, లోతు అంచనా, రాత్రి ప్రయాణానికి ప్రమాద స్థాయి)..."
  },
  "Upload Hazard Photo Evidence": {
    en: "Upload Hazard Photo Evidence",
    hi: "खतरे की फोटो का साक्ष्य अपलोड करें",
    te: "ప్రమాద ఫోటో సాక్ష్యాన్ని అప్‌లోడ్ చేయండి"
  },
  "Drag or click to choose photo file": {
    en: "Drag or click to choose photo file",
    hi: "फोटो फ़ाइल चुनने के लिए खींचें या क्लिक करें",
    te: "ఫోటో ఫైల్‌ను ఎంచుకోవడానికి లాగండి లేదా క్లిక్ చేయండి"
  },
  "JPEG, PNG up to 10MB formats accepted": {
    en: "JPEG, PNG up to 10MB formats accepted",
    hi: "स्नेपशॉट प्रारूप JPEG, PNG अधिकतम 10MB स्वीकार्य",
    te: "JPEG, PNG గరిష్టంగా 10MB ఫార్మాట్‌లు మాత్రమే ఆమోదించబడతాయి"
  },
  "Ready for upload cache": {
    en: "Ready for upload cache",
    hi: "अपलोड कैश के लिए तैयार",
    te: "అప్‌లోడ్ కాష్ కోసం సిద్ధంగా ఉంది"
  },
  "Submit Sworn Hazard Incident Report": {
    en: "Submit Sworn Hazard Incident Report",
    hi: "शपथ पत्र के साथ खतरे की घटना की रिपोर्ट सबमिट करें",
    te: "భద్రతా ప్రమాద నివేదికను సమర్పించండి"
  },
  "Your Active Complaints": {
    en: "Your Active Complaints",
    hi: "आपकी सक्रिय शिकायतें",
    te: "మీ క్రియాశీల ఫిర్యాదులు"
  },
  "Milestones and logs of reports under your active session.": {
    en: "Milestones and logs of reports under your active session.",
    hi: "आपके सक्रिय सत्र के तहत रिपोर्ट के मील के पत्थर और लॉग।",
    te: "మీ క్రియాశీల సెషన్‌లో నివేదించిన సమస్యల పురోగతి మరియు లాగ్‌లు।"
  },
  "total": {
    en: "total",
    hi: "कुल",
    te: "మొత్తం"
  },
  "No complaints registered yet.": {
    en: "No complaints registered yet.",
    hi: "अभी तक कोई शिकायत दर्ज नहीं की गई है।",
    te: "ఇంకా ఎటువంటి ఫిర్యాదులు నమోదు కాలేదు."
  },
  "Use the lodge form above to submit your first hazard ticket.": {
    en: "Use the lodge form above to submit your first hazard ticket.",
    hi: "अपना पहला खतरा टिकट जमा करने के लिए ऊपर दिए गए फॉर्म का उपयोग करें।",
    te: "మీ మొదటి ప్రమాద నివేదికను సమర్పించడానికి పైన ఉన్న ఫారాన్ని ఉపయోగించండి।"
  },
  "Public Responsibility Notice": {
    en: "Public Responsibility Notice",
    hi: "सार्वजनिक जिम्मेदारी नोटिस",
    te: "సార్వజనిక బాధ్యత నోటీసు"
  },
  "Information filed on RoadLens is logged directly under public oversight. Submitting falsified information is subject to penalty under Section 177 of Indian Penal Code. Always upload clear geo-tagged snapshots when possible.": {
    en: "Information filed on RoadLens is logged directly under public oversight. Submitting falsified information is subject to penalty under Section 177 of Indian Penal Code. Always upload clear geo-tagged snapshots when possible.",
    hi: "रोडलेंस (RoadLens) पर दर्ज की गई जानकारी सीधे सार्वजनिक निगरानी में होती है। गलत जानकारी जमा करना भारतीय दंड संहिता की धारा 177 के तहत दंडनीय है। जब भी संभव हो हमेशा स्पष्ट जियो-टैग की गई तस्वीरें अपलोड करें।",
    te: "రోడ్‌లెన్స్ (RoadLens)లో నమోదు చేయబడిన సమాచారం నేరుగా ప్రజా పర్యవేక్షణలో ఉంటుంది. తప్పుడు సమాచారాన్ని సమర్పించడం భారతీయ శిక్షాస్మృతి సెక్షన్ 177 ప్రకారం శిక్షార్హం. వీలైనప్పుడల్లా స్పష్టమైన జియో-ట్యాగ్‌డ్ ఫోటోలను అప్‌లోడ్ చేయండి."
  }
};

// Main translator function
export function translateRoadOrLocationToHindi(trimmedText: string): string {
  let result = trimmedText;

  // Replace City/Place names (English words) with clean Hindi equivalents
  const cities = [
    ['Bengaluru Region', 'बेंगलुरु क्षेत्र'],
    ['Bengaluru', 'बेंगलुरु'],
    ['Vijayawada', 'विजयवाड़ा'],
    ['Hyderabad', 'हैदराबाद'],
    ['New Delhi', 'नई दिल्ली'],
    ['Delhi', 'दिल्ली'],
    ['Mumbai', 'मुंबई'],
    ['Chennai', 'चेन्नई'],
    ['Kolkata', 'कोलकाता'],
    ['Visakhapatnam', 'विशाखापत्तनम'],
    ['Pune', 'पुणे'],
    ['Ahmedabad', 'अहमदाबाद'],
    ['Guntur', 'गुंटूर'],
    ['Nellore', 'नेलोर'],
    ['Tirupati', 'तिरुपति']
  ];

  for (const [enCity, hiCity] of cities) {
    const cityRegex = new RegExp(`\\b${enCity}\\b`, 'gi');
    result = result.replace(cityRegex, hiCity);
  }

  // Replace road names & dynamic locations
  const phrases = [
    [/National Highway (\d+)/gi, 'राष्ट्रीय राजमार्ग $1'],
    [/State Highway (\d+)/gi, 'राज्य राजमार्ग $1'],
    [/Outer Ring Road \(ORR\) Service Lane/gi, 'आउटर रिंग रोड (ORR) सर्विस लेन'],
    [/Outer Ring Road \(ORR Segment\)/gi, 'आउटर रिंग रोड (ORR खंड)'],
    [/Outer Ring Road/gi, 'आउटर रिंग रोड'],
    [/M\.G\. Road/gi, 'एम.जी. रोड'],
    [/Kasturba Marg/gi, 'कस्तूरबा मार्ग'],
    [/Railway Station road/gi, 'रेलवे स्टेशन मार्ग'],
    [/Railway Station Road/gi, 'रेलवे स्टेशन मार्ग'],
    [/Sarjapur Main Link Road/gi, 'सरजापुर मुख्य लिंक मार्ग'],
    [/Whitefield Inner Ring Bypass/gi, 'व्हाइटफील्ड इनर रिंग बाईपास'],
    [/Central Market Road/gi, 'केंद्रीय बाजार मार्ग'],
    [/Central Market Segment/gi, 'केंद्रीय बाजार खंड'],
    [/Town Center/gi, 'टाउन सेंटर'],
    [/Junction/gi, 'जंक्शन'],
    [/Bypass Corridor/gi, 'बाईपास कॉरिडोर'],
    [/Bypass/gi, 'बाईपास'],
    [/Segment/gi, 'खंड'],
    [/Link/gi, 'लिंक'],
    [/Service Lane/gi, 'सर्विस लेन'],
    [/Main/gi, 'मुख्य'],
    [/Southern District Belt/gi, 'दक्षिणी जिला बेल्ट'],
    [/East Technology Hub/gi, 'पूर्वी प्रौद्योगिकी हब'],
    [/Central Market Zone/gi, 'केंद्रीय बाजार क्षेत्र'],
    [/Civil Line District/gi, 'सिविल लाइन जिला'],
    [/Transit Hub/gi, 'ट्रांजिट हब']
  ];

  for (const [regex, hiPhrase] of phrases) {
    result = result.replace(regex, hiPhrase as string);
  }

  return result;
}

export function t(text: string | null | undefined, lang: Language): string {
  if (!text) return '';
  const trimmed = text.trim();

  // 1. Check exact static dictionary match
  if (DICTIONARY[trimmed] && DICTIONARY[trimmed][lang]) {
    return DICTIONARY[trimmed][lang];
  }

  // 2. Check dynamic strings dictionary match
  if (DYNAMIC_STRINGS[trimmed] && DYNAMIC_STRINGS[trimmed][lang]) {
    return DYNAMIC_STRINGS[trimmed][lang];
  }

  // 2.5 Translate dynamic road names or locations to Hindi if requested
  if (lang === 'hi') {
    const isRoadOrLocation = 
      /Highway/i.test(trimmed) || 
      /Road/i.test(trimmed) || 
      /Marg/i.test(trimmed) || 
      /Bypass/i.test(trimmed) || 
      /ORR/i.test(trimmed) || 
      /Lane/i.test(trimmed) || 
      /Sarjapur/i.test(trimmed) || 
      /Kasturba/i.test(trimmed) || 
      /Railway/i.test(trimmed) ||
      /Whitefield/i.test(trimmed) ||
      /Corridor/i.test(trimmed) ||
      /District Belt/i.test(trimmed) ||
      /Technology Hub/i.test(trimmed) ||
      /Market Zone/i.test(trimmed) ||
      /Line District/i.test(trimmed) ||
      /Transit Hub/i.test(trimmed);

    if (isRoadOrLocation) {
      return translateRoadOrLocationToHindi(trimmed);
    }
  }

  // 3. Handle dynamic string interpolations (e.g. "Across 5 segments in this layer")
  const acrossRegex = /^Across\s+(\d+)\s+segments\s+in\s+this\s+layer$/;
  const matchAcross = trimmed.match(acrossRegex);
  if (matchAcross) {
    const count = matchAcross[1];
    const template = DICTIONARY["Across {count} segments in this layer"]?.[lang] || "Across {count} segments in this layer";
    return template.replace("{count}", count);
  }

  // Handle "Bengaluru Region Corridor", "Vijayawada Region Corridor" dynamically
  const regionRegex = /^(.*)\s+Region\s+Corridor$/i;
  const matchRegion = trimmed.match(regionRegex);
  if (matchRegion) {
    const rawPlace = matchRegion[1].trim();
    let translatedPlace = rawPlace;
    if (rawPlace === 'Bengaluru' || rawPlace === 'Bengaluru Region') {
      translatedPlace = lang === 'hi' ? 'बेंगलुरु' : 'Bengaluru';
    } else if (rawPlace === 'Vijayawada') {
      translatedPlace = lang === 'hi' ? 'विजयवाड़ा' : 'Vijayawada';
    }
    const template = lang === 'hi' ? '{place} क्षेत्रीय कॉरिडोर' : '{place} Region Corridor';
    return template.replace('{place}', translatedPlace);
  }

  // Check prefix matches for road names optionally
  for (const key of Object.keys(DYNAMIC_STRINGS)) {
    if (trimmed.startsWith(key)) {
      const remainder = trimmed.substring(key.length);
      return DYNAMIC_STRINGS[key][lang] + remainder;
    }
  }

  // 4. Translate fallback individual words to guarantee "every single word" language change
  // If the string contains spaces, we can split and translate key words, but limit this to small phrases to avoid messy outputs.
  const words = trimmed.split(' ');
  if (words.length <= 4) {
    const translatedWords = words.map(w => {
      const cleanW = w.replace(/[.,:()]/g, '');
      const punctuationLeft = w.match(/^([.,:()]*)/)?.[0] || '';
      const punctuationRight = w.match(/([.,:()]*)$/)?.[0] || '';
      
      if (DICTIONARY[cleanW] && DICTIONARY[cleanW][lang]) {
        return punctuationLeft + DICTIONARY[cleanW][lang] + punctuationRight;
      }
      if (DYNAMIC_STRINGS[cleanW] && DYNAMIC_STRINGS[cleanW][lang]) {
        return punctuationLeft + DYNAMIC_STRINGS[cleanW][lang] + punctuationRight;
      }
      return w;
    });
    return translatedWords.join(' ');
  }

  // Fallback to original text standard
  return text;
}
