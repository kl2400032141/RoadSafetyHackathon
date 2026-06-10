import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Building2, 
  Search, 
  HelpCircle, 
  BookOpen, 
  BadgeHelp,
  Clock,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../services/chatservice";

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  heading?: string;
}

interface BotViewProps {
  language?: 'en' | 'hi';
}

const botTranslations = {
  en: {
    welcome: "Hello! I am your RoadLens AI Civic Guide. I can help explain public street budgeting rules, which agency (NHAI, PWD, or BBMP) is responsible for a road, how the automated report routing works, and how to track progress of your safety tickets.",
    prompts: [
      { title: "Who maintains this road?", query: "Who is responsible for maintaining roads and how is authority divided?" },
      { title: "How do I report a pothole?", query: "Tell me the steps to submit a pothole report on this platform." },
      { title: "What is the budget?", query: "How is road budget allocation and spent audited?" },
      { title: "How to track complaint?", query: "What do the different ticket statuses like Under Review means?" }
    ],
    errorMsg: "Sorry, I couldn't connect to the AI service right now."
  },
  hi: {
    welcome: "नमस्ते! मैं आपका RoadLens AI नागरिक गाइड हूँ। मैं सार्वजनिक सड़क बजट नियमों को समझाने में मदद कर सकता हूँ, कौन सी एजेंसी (NHAI, PWD, या BBMP) सड़क के लिए ज़िम्मेदार है, स्वचालित रिपोर्ट रूटिंग कैसे काम करती है, और आपकी सुरक्षा टिकटों की प्रगति को ट्रैक कैसे करें।",
    prompts: [
      { title: "इस सड़क का रखरखाव कौन करता है?", query: "सड़कों के रखरखाव के लिए कौन जिम्मेदार है और प्राधिकरण कैसे विभाजित है?" },
      { title: "मैं गड्ढे की रिपोर्ट कैसे करूँ?", query: "इस प्लेटफॉर्म पर गड्ढे की रिपोर्ट दर्ज करने के चरण बताएं।" },
      { title: "बजट क्या है?", query: "सड़क बजट आवंटन और खर्च का ऑडिट कैसे किया जाता है?" },
      { title: "शिकायत कैसे ट्रैक करें?", query: "अंडर रिव्यू जैसी विभिन्न टिकट स्थितियों का क्या मतलब है?" }
    ],
    errorMsg: "क्षमा करें, मैं अभी एआई सेवा से नहीं जुड़ सका।"
  },
  te: {
    welcome: "నమస్తే! నేను మీ RoadLens AI సివిక్ గైడ్‌ని. పబ్లిక్ రోడ్ బడ్జెట్ నియమాలు, ఏ ఏజెన్సీ (NHAI, PWD, లేదా BBMP) రోడ్డుకు బాధ్యత వహిస్తుంది, ఆటోమేటిక్ రిపోర్ట్ రూటింగ్ ఎలా పని చేస్తుంది మరియు మీ భద్రతా టిక్కెట్ల పురోగతిని ఎలా ట్రాక్ చేయాలో వివరించడానికి నేను మీకు సహాయపడతాను.",
    prompts: [
      { title: "ఈ రహదారిని ఎవరు నిర్వహిస్తారు?", query: "రోడ్ల నిర్వహణకు ఎవరు బాధ్యత వహిస్తారు మరియు అధికారం ఎలా విభజించబడింది?" },
      { title: "నేను గుంత గురించి ఎలా నివేదించాలి?", query: "ఈ ప్లాట్‌ఫారమ్‌లో గుంత నివేదికను సమర్పించడానికి దశలను చెప్పండి." },
      { title: "బడ్జెట్ అంటే ఏమిటి?", query: "రోడ్ బడ్జెట్ కేటాయింపులు మరియు ఖర్చుల ఆడిట్ ఎలా జరుగుతుంది?" },
      { title: "ఫిర్యాదును ఎలా ట్రాక్ చేయాలి?", query: "అండర్ రివ్యూ వంటి విభిన్న టికెట్ స్టేటస్‌ల అర్థం ఏమిటి?" }
    ],
    errorMsg: "క్షమించండి, నేను ఇప్పుడు AI సేవకు కనెక్ట్ కాలేకపోయాను."
  }
};

export default function BotView({ language = 'en' }: BotViewProps) {
  const currentText = botTranslations[language] || botTranslations.en;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-0',
      sender: 'assistant',
      text: currentText.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Re-initialize welcome message if language changes
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${language}-${Date.now()}`,
        sender: 'assistant',
        text: currentText.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Auto scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Suggested prompt pills
  const SUGGESTED_PROMPTS = currentText.prompts;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponse = await sendMessage(textToSend, language);

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      sender: "assistant",
      text: aiResponse,
      heading: "RoadLens AI",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMsg]);
  } catch (error) {
    console.error(error);

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      sender: "assistant",
      text: currentText.errorMsg,
      heading: "System",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMsg]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs h-[calc(100vh-180px)] min-h-[500px] flex flex-col overflow-hidden">
      
      {/* Bot Chat Header Area */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-800">RoadLens Assistant Bot</span>
              <span className="text-[10px] bg-blue-100/75 text-blue-700 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-0.5 shadow-none">
                <Sparkles className="w-3 h-3 text-blue-600" /> CIVIC AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Automated assistant for safety protocols and municipal audit guidance.</p>
          </div>
        </div>

        {/* Live response state badge */}
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Node Connected
        </span>
      </div>

      {/* Main Messages scroll container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20" ref={scrollRef}>
        
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex items-start gap-3 max-w-4xl ${m.sender === 'user' ? 'flex-row-reverse ml-auto' : ''}`}
          >
            {/* Avatar block */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.sender === 'user' 
                ? 'bg-slate-200 text-slate-700' 
                : 'bg-blue-600 text-white'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble layout */}
            <div className={`space-y-1 block ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
              
              {/* If heading exists */}
              {m.heading && (
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-0.5">{m.heading}</span>
              )}

              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-slate-800 text-white rounded-tr-xs'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-xs shadow-xs'
              }`}>
<ReactMarkdown>
  {m.text}
</ReactMarkdown>              </div>

              {/* Timestamp label */}
              <span className="text-[10px] text-slate-400 block px-1">{m.timestamp}</span>
            </div>

          </div>
        ))}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-xs flex items-center gap-1 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

      </div>

      {/* Suggested Prompt pills input overlay */}
      <div className="px-6 py-3 bg-white border-t border-slate-100 space-y-3 shrink-0">
        
        {/* Suggested pill grid container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <BadgeHelp className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1.5">Common Queries:</span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt.query)}
              disabled={isTyping}
              className="px-3 py-1.5 self-center rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition cursor-pointer text-xs text-slate-650 shrink-0 flex items-center gap-1 font-semibold disabled:opacity-50"
            >
              {prompt.title} <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>

        {/* Input form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything (e.g. who maintains state highways? how to submit a photo?)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            className="w-full pl-4 pr-12 py-3 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs sm:text-sm rounded-xl transition placeholder:text-slate-400 disabled:opacity-70 bg-white"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-30 disabled:hover:bg-blue-600 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
