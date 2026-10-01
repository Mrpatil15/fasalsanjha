import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  ChevronDown, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  PlusCircle, 
  Globe, 
  Menu, 
  X,
  Presentation,
  CheckCircle2,
  TrendingUp,
  Store,
  Layers,
  Calculator,
  MessageSquare
} from 'lucide-react';
import { Logo } from './Logo';
import { useAppStore } from '../../store/useAppStore';
import { DEMO_PERSONAS } from '../../data/personas';
import { DICTIONARY } from '../../data/translations';
import { Role, Language } from '../../types';

export const Header: React.FC = () => {
  const location = useLocation();
  const { currentRole, setRole, language, setLanguage, notifications, markNotificationRead } = useAppStore();
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = DICTIONARY[language];
  const activePersona = DEMO_PERSONAS.find((p) => p.id === currentRole) || DEMO_PERSONAS[0];
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: t.invest, path: '/invest', icon: TrendingUp },
    { label: t.bazaar, path: '/bazaar', icon: Store },
    { label: t.track, path: '/track', icon: Layers },
    { label: 'Market Prices', path: '/prices', icon: TrendingUp },
    { label: t.calculator, path: '/calculator', icon: Calculator },
    { label: 'Trust & Legal', path: '/trust', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner with Trust Shield & Direct Pitch Mode Link */}
      <div className="bg-forest-900 text-white text-xs px-4 py-1.5 flex justify-between items-center tracking-wide font-medium">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center gap-1 text-limeaccent font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Land Title Protected
          </span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-slate-200 hidden md:inline">
            Regulated ICICI Nodal Escrow • PMFBY Aligned Dual Insurance
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link 
            to="/pitch" 
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-harvest-500 hover:bg-harvest-600 text-forest-950 font-bold text-[11px] transition-colors shadow-sm"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>🎤 Pitch Deck (Investor Mode)</span>
          </Link>

          <Link to="/admin" className="text-slate-300 hover:text-white transition-colors text-[11px] hidden lg:inline">
            Admin Desk
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-forest-50 text-forest-900 font-bold border border-forest-200/60' 
                    : 'text-slate-600 hover:text-forest-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster: Demo Switcher + Post Requirement + Language + Notifs */}
        <div className="flex items-center gap-2.5">
          {/* Hero CTA: "Post Your Requirement" */}
          <Link
            to="/requirement/new"
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-forest-800 to-forest-700 hover:from-forest-900 hover:to-forest-800 text-white text-xs md:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 border border-forest-600"
          >
            <Sparkles className="w-4 h-4 text-harvest-400" />
            <span>{t.postRequirement}</span>
          </Link>

          {/* Persona Switcher ("Demo as...") */}
          <div className="relative">
            <button
              onClick={() => setIsPersonaOpen(!isPersonaOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-harvest-400/80 bg-harvest-50 hover:bg-harvest-100 transition-colors text-left"
              title="Switch demo persona"
            >
              <img 
                src={activePersona.avatar} 
                alt={activePersona.name} 
                className="w-7 h-7 rounded-full object-cover ring-2 ring-harvest-500" 
              />
              <div className="hidden xl:flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase font-bold text-forest-800 tracking-wider">Demo As</span>
                <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                  {language === 'hi' ? activePersona.nameHi : activePersona.name}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-forest-800" />
            </button>

            {isPersonaOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Switch Persona</p>
                  <p className="text-[11px] text-slate-400">Instantly inspect customized screens</p>
                </div>

                <div className="space-y-1">
                  {DEMO_PERSONAS.map((p) => {
                    const isSelected = p.id === currentRole;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setRole(p.id);
                          setIsPersonaOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-colors ${
                          isSelected ? 'bg-forest-50 border border-forest-200' : 'hover:bg-slate-50'
                        }`}
                      >
                        <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {language === 'hi' ? p.nameHi : p.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">{p.roleTitle}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center px-2">
                  <Link 
                    to={`/${currentRole}/dashboard`}
                    onClick={() => setIsPersonaOpen(false)}
                    className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1"
                  >
                    Open Dashboard →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-forest-700" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-200 p-1 z-50">
                {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg ${
                      language === lang ? 'bg-forest-100 text-forest-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {lang === 'en' && 'English'}
                    {lang === 'hi' && 'हिन्दी (Hindi)'}
                    {lang === 'mr' && 'मराठी (Marathi)'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-harvest-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
                <div className="flex justify-between items-center mb-2 px-1">
                  <h4 className="font-bold text-sm text-slate-900">Notifications & Escrow Alerts</h4>
                  <span className="text-xs text-forest-700 font-medium">All live updates</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        n.read ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-forest-50/60 border-forest-100 text-slate-800 font-medium'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-forest-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{n.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages link */}
          <Link
            to="/messages"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors hidden sm:block"
            title="Messages"
          >
            <MessageSquare className="w-5 h-5 text-slate-700" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 lg:hidden hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <Link
            to="/requirement/new"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-forest-900 text-white rounded-xl text-sm font-bold shadow-md"
          >
            <Sparkles className="w-4 h-4 text-harvest-400" />
            {t.postRequirement}
          </Link>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-forest-50"
              >
                <link.icon className="w-4 h-4 text-forest-700" />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/pitch"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-bold text-harvest-600 flex items-center gap-1.5"
            >
              <Presentation className="w-4 h-4" />
              Pitch Deck (14 Slides)
            </Link>
            <Link
              to="/messages"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-bold text-forest-800 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              Live Chat
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
