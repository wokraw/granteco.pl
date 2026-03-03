import React, { useState, useRef, useEffect } from 'react';
import LegalModal from './LegalModal.jsx';
import { REGULAMIN, POLITYKA_PRYWATNOSCI } from './LegalContent.js';
import {
  Phone,
  Calculator,
  Truck,
  Wrench,
  Flame,
  Mountain,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Check,
  Circle,
  ArrowLeft,
  Mail,
  MapPin,
  Clock,
  Flame as Fire,
  Navigation,
  AlertCircle,
  Search,
  Package,
  // NOWE IKONY dla dedykowanych stron usług
  Construction,
  Container,
  ShieldCheck,
  Users,
  Map,
  Settings,
  Gauge,
  Droplets,
  Repeat,
  Award,
  Box,
  Hammer,
  Factory,
  FlaskConical,
  Gem,
  Trees,
  Ruler,
  ThermometerSun,
  ShieldAlert,
  FileCheck,
  Weight,
  ArrowRightCircle,
  Cloud,
} from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

// IMPORTUJ LOGO BEZPOŚREDNIO
import logoImage from '/public/logo.svg?url';

// --- KONFIGURACJA LOGO ---
const LOGO_CONFIG = {
  url: logoImage,
  alt: 'GRANTECO Logo',
};

// --- KONFIGURACJA DANYCH ---
const DATA_CONFIG = {
  materials: [
    { id: 1, name: 'Otoczak "Miodowy" 8/16', density: 1.5, price: 300 },
    { id: 2, name: 'Otoczak "Ice" 16/32', density: 1.5, price: 500 },
    { id: 3, name: 'Grys Granitowy 8/16', density: 1.6, price: 350 },
    { id: 4, name: 'Grys Granitowy 16/22', density: 1.6, price: 350 },
    { id: 5, name: 'Grys Bazaltowy 16/22', density: 1.6, price: 300 },
    { id: 6, name: 'Kruszywo Cappuccino 16/35', density: 1.4, price: 400 },
    { id: 7, name: 'Grys Biała Marianna 8/16', density: 1.5, price: 700 },
    { id: 8, name: 'Kora Kamienna 11/32', density: 1.4, price: 500 },
    { id: 9, name: 'Kora Kamienna 16/32', density: 1.4, price: 500 },
    { id: 10, name: 'Piasek 0/2', density: 1.7, price: 100 },
  ],
  transport: {
    base: 150,
    perKm: 7,
    zones: [
      {
        min: 0,
        max: 10,
        name: 'ZIELONA',
        price: 0,
        color: 'green',
        label: 'GRATIS',
      },
      {
        min: 11,
        max: 20,
        name: 'ŻÓŁTA',
        price: 50,
        color: 'yellow',
        label: '50 zł',
      },
      {
        min: 21,
        max: 30,
        name: 'POMARAŃCZOWA',
        price: 100,
        color: 'orange',
        label: '100 zł',
      },
      {
        min: 31,
        max: 50,
        name: 'CZERWONA',
        price: 200,
        color: 'red',
        label: '200 zł',
      },
    ],
  },
  services: {
    transport: {
      title: 'Transport',
      icon: Truck,
      color: 'blue',
    },
    hydraulics: {
      title: 'Przewody hydrauliczne',
      icon: Wrench,
      color: 'emerald',
    },
    stone: {
      title: 'Kamień ogrodowy',
      icon: Mountain,
      color: 'slate',
    },
    coal: {
      title: 'Węgiel kamienny',
      icon: Fire,
      color: 'orange',
    },
  },
};

// Współrzędne bazy GRANTECO w Mrowino
const COMPANY_LOCATION = {
  lat: 52.527,
  lon: 16.697,
  name: 'GRANTECO Mrowino',
};

// Hook do wykrywania widoczności elementu
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return [ref, isInView];
}

// Funkcja Haversine do obliczania odległości
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 1.3);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'regulamin' | 'polityka' | null

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-blue-100">
      {/* --- GLOBALNE TLO PREMIUM (Abstrakcyjna Aurora - Wersja Widoczna) --- */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-blue-900/30 to-blue-800/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-blue-500/20 to-transparent blur-[120px]"></div>
        <div className="absolute top-[20%] left-[35%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[150px]"></div>
      </div>
      {/* --- NAWIGACJA --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => navigateTo('start')}
          >
            <img
              src={LOGO_CONFIG.url}
              alt={LOGO_CONFIG.alt}
              className="h-12 w-auto object-contain transform transition-transform group-hover:scale-110 duration-300"
            />
          </div>

          <div className="hidden lg:flex gap-8 text-sm font-medium text-slate-600">
            {[
              { name: 'Start', page: 'start' },
              { name: 'Transport', page: 'transport' },
              { name: 'Przewody', page: 'hydraulics' },
              { name: 'Kamień', page: 'stone' },
              { name: 'Węgiel', page: 'coal' },
              { name: 'Kalkulator', page: 'kalkulator' },
              { name: 'Kontakt', page: 'kontakt' },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`hover:text-blue-900 transition-all duration-300 hover:scale-110 relative group ${
                  currentPage === item.page ? 'text-blue-900 font-bold' : ''
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-900 transition-all duration-300 ${
                    currentPage === item.page
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>
            ))}
          </div>

          <button
            className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`}
              />
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-4 flex flex-col gap-4 shadow-xl animate-slideDown">
            {[
              { name: 'Start', page: 'start' },
              { name: 'Transport', page: 'transport' },
              { name: 'Przewody', page: 'hydraulics' },
              { name: 'Kamień', page: 'stone' },
              { name: 'Węgiel', page: 'coal' },
              { name: 'Kalkulator', page: 'kalkulator' },
              { name: 'Kontakt', page: 'kontakt' },
            ].map((item, idx) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`block py-2 text-left font-medium hover:translate-x-2 transition-all duration-300 ${
                  currentPage === item.page
                    ? 'text-blue-900 font-bold'
                    : 'text-slate-600 hover:text-blue-900'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- ROUTING CONTENT --- */}
      <div className="min-h-screen">
        {currentPage === 'start' && <StartPage navigateTo={navigateTo} />}
        {currentPage === 'transport' && (
          <TransportPage navigateTo={navigateTo} />
        )}
        {currentPage === 'hydraulics' && (
          <HydraulicsPage navigateTo={navigateTo} />
        )}
        {currentPage === 'welding' && <WeldingPage navigateTo={navigateTo} />}
        {currentPage === 'stone' && <StonePage navigateTo={navigateTo} />}
        {currentPage === 'coal' && <CoalPage navigateTo={navigateTo} />}
        {currentPage === 'kalkulator' && (
          <CalculatorPage navigateTo={navigateTo} setLegalModal={setLegalModal} />
        )}
        {currentPage === 'kontakt' && <ContactPage navigateTo={navigateTo} />}
      </div>

      {/* --- STOPKA (PREMIUM MINIMAL) --- */}
      <footer className="bg-slate-950 border-t border-slate-800/50 pt-16 mt-20" style={{ paddingBottom: 'max(40px, calc(24px + env(safe-area-inset-bottom, 0px)))' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* Górna siatka: mobile = pionowy stos wyśrodkowany, desktop = 3 kolumny */}
          <div className="flex flex-col items-center text-center space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-12 md:items-stretch mb-14 md:mb-12">

            {/* Kolumna 1: Logo + "Śledź nas" + ikony */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <img src={LOGO_CONFIG.url} alt={LOGO_CONFIG.alt} className="h-10 w-auto brightness-0 invert opacity-90" />
              </div>

              {/* Śledź nas — na desktop zepchnięty na dół przez mt-auto */}
              <div className="flex flex-col items-center md:items-start mt-6 md:mt-auto">
                <p className="text-slate-300 text-[11px] font-semibold uppercase tracking-[0.2em] text-center md:text-left">
                  Śledź nas w mediach społecznościowych
                </p>
                <div className="flex justify-center md:justify-start gap-1 mt-4">
                  <a href="https://www.facebook.com/granteco" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl group active:opacity-60 transition-opacity duration-200">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      className="text-slate-400 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] transition-all duration-300 stroke-current">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 8h-2a2 2 0 0 0-2 2v2h4l-.5 3H12v7" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/pawel_granteco/" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl group active:opacity-60 transition-opacity duration-200">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      className="text-slate-400 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.7)] transition-all duration-300 stroke-current">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@pawekrawiec4" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl group active:opacity-60 transition-opacity duration-200">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      className="text-slate-400 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.7)] transition-all duration-300 stroke-current">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Kolumna 2: Kontakt */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Kontakt</h3>
              <ul className="flex flex-col gap-4 w-fit mx-auto md:mx-0 text-slate-400 text-sm">
                <li>
                  <a href="tel:662333188" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 group-hover:border-blue-900 transition-colors">
                      <Phone size={16} className="text-blue-400" />
                    </div>
                    +48 662 333 188
                  </a>
                </li>
                <li>
                  <a href="mailto:biuro@granteco.pl" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 group-hover:border-blue-900 transition-colors">
                      <Mail size={16} className="text-blue-400" />
                    </div>
                    biuro@granteco.pl
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <MapPin size={16} className="text-blue-400" />
                  </div>
                  ul. Poznańska 28, Mrowino
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Godziny otwarcia</h3>
              <div className="flex justify-center md:justify-start">
              <ul className="space-y-4 text-slate-400 text-sm">
                <div className="flex flex-col gap-4 w-fit mx-auto md:mx-0">
                <li className="flex items-center gap-3">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <Clock size={16} className="text-blue-400" />
                  </div>
                  Pn - Pt: 8:30 - 16:30
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <Clock size={16} className="text-blue-400" />
                  </div>
                  Sobota: 9:00 - 12:00
                </li>
                </div>
                <li className="flex items-center gap-3 mt-6 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-lg border border-amber-400/20">
                  <AlertCircle size={16} />
                  <span>Przed przyjazdem prosimy o kontakt</span>
                </li>
              </ul>
              </div>
            </div>

          </div>

          {/* Dolny pasek */}
          <div className="border-t border-slate-800/50 pt-8 pb-2">

            {/* Linki prawne — widoczne na obu platformach */}
            <div className="flex justify-center gap-6 mb-5">
              <button
                type="button"
                onClick={() => setLegalModal('regulamin')}
                className="text-slate-500 text-xs hover:text-slate-300 active:opacity-60 transition-colors underline underline-offset-2"
              >
                Regulamin
              </button>
              <span className="text-slate-700 text-xs">·</span>
              <button
                type="button"
                onClick={() => setLegalModal('polityka')}
                className="text-slate-500 text-xs hover:text-slate-300 active:opacity-60 transition-colors underline underline-offset-2"
              >
                Polityka Prywatności
              </button>
            </div>

            {/* MOBILE: wyśrodkowana kolumna */}
            <div className="flex flex-col items-center justify-center gap-3 md:hidden">
              <p className="text-sm text-slate-400 text-center">Projekt i wykonanie: <a href="https://wopro3d.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white transition-colors">Wopro3Design</a></p>
              <p className="text-slate-500 text-xs text-center">
                &copy; {new Date().getFullYear()} Granteco. Wszelkie prawa zastrzeżone.
              </p>
            </div>

            {/* DESKTOP: copyright po lewej | podpis po prawej */}
            <div className="hidden md:flex items-center justify-between">
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Granteco. Wszelkie prawa zastrzeżone.
              </p>
              <p className="text-sm text-slate-400">Projekt i wykonanie: <a href="https://wopro3d.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white transition-colors">Wopro3Design</a></p>
            </div>

          </div>
        </div>
      </footer>
      {/* --- KONIEC STOPKI --- */}

      {/* Pływający przycisk telefonu — Contextual 3D Sphere */}
      {(() => {
        const ctaThemes = {
          start:      { base: 'rgba(15,23,62,0.97)',  mid: 'rgba(30,45,100,0.7)',  glow: 'rgba(59,130,246,0.4)',   ring: 'rgba(99,150,255,0.3)',  hover: 'rgba(59,130,246,0.5)'  },
          transport:  { base: 'rgba(15,23,62,0.97)',  mid: 'rgba(30,45,100,0.7)',  glow: 'rgba(59,130,246,0.4)',   ring: 'rgba(99,150,255,0.3)',  hover: 'rgba(59,130,246,0.5)'  },
          hydraulics: { base: 'rgba(45,30,5,0.97)',   mid: 'rgba(100,65,10,0.7)', glow: 'rgba(245,158,11,0.45)',  ring: 'rgba(255,190,60,0.3)',  hover: 'rgba(245,158,11,0.6)'  },
          stone:      { base: 'rgba(10,35,30,0.97)',  mid: 'rgba(15,80,65,0.65)', glow: 'rgba(20,184,166,0.45)',  ring: 'rgba(50,210,180,0.3)',  hover: 'rgba(20,184,166,0.6)'  },
          coal:       { base: 'rgba(20,10,5,0.98)',   mid: 'rgba(60,30,10,0.7)',  glow: 'rgba(234,88,12,0.45)',   ring: 'rgba(255,120,30,0.3)',  hover: 'rgba(234,88,12,0.6)'   },
          kalkulator: { base: 'rgba(10,25,50,0.97)',  mid: 'rgba(20,55,100,0.65)',glow: 'rgba(59,130,246,0.4)',   ring: 'rgba(99,150,255,0.3)',  hover: 'rgba(59,130,246,0.5)'  },
          kontakt:    { base: 'rgba(15,23,62,0.97)',  mid: 'rgba(30,45,100,0.7)', glow: 'rgba(59,130,246,0.4)',   ring: 'rgba(99,150,255,0.3)',  hover: 'rgba(59,130,246,0.5)'  },
          welding:    { base: 'rgba(40,20,5,0.97)',   mid: 'rgba(90,50,10,0.65)', glow: 'rgba(245,158,11,0.4)',   ring: 'rgba(255,190,60,0.3)',  hover: 'rgba(245,158,11,0.55)' },
        };
        const t = ctaThemes[currentPage] || ctaThemes.start;
        return (
          <a
            href="tel:662333188"
            className="fixed bottom-6 right-4 md:right-6 z-50 group rounded-full transition-all duration-700 ease-in-out md:hover:scale-110 active:scale-95 active:brightness-110 flex items-center justify-center min-w-[56px] min-h-[56px] p-4 md:p-5"
            style={{
              background: `radial-gradient(circle at 35% 28%, ${t.mid} 0%, ${t.base} 60%, rgba(5,5,8,1) 100%)`,
              boxShadow: `0 0 0 1px ${t.ring}, 0 10px 40px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 0 35px ${t.glow}`,
              transition: 'transform 0.4s ease-out, box-shadow 0.7s ease-in-out, background 0.7s ease-in-out',
              willChange: 'transform',
              transform: 'translateZ(0)',
              paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
            }}
          >
            {/* Hover — wzmocnienie wewnętrznego światła */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 65%, ${t.hover} 0%, transparent 70%)`,
                boxShadow: `inset 0 0 50px ${t.hover}`,
              }}
            ></div>
            {/* Hover — zewnętrzna aureola */}
            <div
              className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `0 0 25px ${t.glow}, 0 0 50px ${t.glow}` }}
            ></div>
            {/* Spekularne odbicie 3D */}
            <div className="absolute top-2 left-3 w-8 h-3 rounded-full bg-white/25 blur-sm rotate-[-20deg] pointer-events-none"></div>
            <div className="absolute top-3 left-4 w-4 h-1.5 rounded-full bg-white/40 blur-[2px] rotate-[-20deg] pointer-events-none"></div>
            {/* Ikona */}
            <Phone size={26} className="relative z-10 text-white/90 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
          </a>
        );
      })()}

      {/* --- MODAL DOKUMENTÓW PRAWNYCH --- */}
      <LegalModal
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
        title={legalModal === 'regulamin' ? 'Regulamin Sklepu Internetowego' : 'Polityka Prywatności'}
        content={legalModal === 'regulamin' ? REGULAMIN : POLITYKA_PRYWATNOSCI}
      />

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%) skewX(-12deg); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(250%) skewX(-12deg); opacity: 0; }
        }
        .shimmer-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          transform: translateX(-100%) skewX(-12deg);
          transition: none;
          pointer-events: none;
          border-radius: inherit;
        }
        .shimmer-card.in-focus::after {
          animation: shimmer-slide 0.8s ease-out forwards;
        }
        .mobile-focus-card {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease-out;
        }
        .mobile-focus-card.in-focus {
          transform: scale(1.03);
          box-shadow: 0 25px 60px rgba(0,0,0,0.18), 0 8px 25px rgba(0,0,0,0.10);
        }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

// ============================================================
// === STRONA STARTOWA Z FRAMER-MOTION                      ===
// ============================================================
function StartPage({ navigateTo }) {
  const [servicesRef, servicesInView] = useScrollAnimation();
  const [hoveredService, setHoveredService] = useState(null);

  const orbConfig = {
    transport:  { label: 'Transport ciężarowy',  light1: 'bg-blue-600',   light2: 'bg-blue-500',   light3: 'bg-blue-700',   light4: 'bg-sky-500'    },
    hydraulics: { label: 'Hydraulika siłowa',    light1: 'bg-amber-500',  light2: 'bg-orange-400', light3: 'bg-amber-600',  light4: 'bg-yellow-400' },
    stone:      { label: 'Kamień ogrodowy',      light1: 'bg-teal-500',   light2: 'bg-emerald-500',light3: 'bg-teal-600',   light4: 'bg-cyan-500'   },
    coal:       { label: 'Węgiel kamienny',      light1: 'bg-orange-600', light2: 'bg-red-500',    light3: 'bg-orange-700', light4: 'bg-red-600'    },
  };
  const orb = orbConfig[hoveredService] || { label: 'Zapraszamy do zapoznania się z ofertą', light1: 'bg-blue-500', light2: 'bg-amber-500', light3: 'bg-teal-500', light4: 'bg-orange-500' };
  const orbActive = hoveredService !== null;

  return (
    <>
      <header className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto relative">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-10 flex justify-center"
          >
            <div className="relative group cursor-default inline-block mb-12 mt-8 z-10">
              <div className="absolute -inset-8 bg-blue-900/0 group-hover:bg-blue-900/5 rounded-[3rem] blur-xl transition-all duration-1000 ease-out pointer-events-none"></div>
              <img
                src={LOGO_CONFIG.url}
                alt={LOGO_CONFIG.alt}
                className="relative h-24 md:h-32 w-auto object-contain transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 drop-shadow-sm group-hover:drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* --- SZKLANY RDZEN (Reactive Glass Core) --- */}
          <div className="flex justify-center mb-10 mt-2">
            <div className="relative cursor-default">

              {/* Zewnętrzna aureola — rozległa poświata za kulą */}
              <div className="absolute inset-[-30%] rounded-full pointer-events-none"
                style={{
                  background: orbActive
                    ? 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
                  transition: 'background 0.6s',
                  filter: 'blur(20px)',
                }}
              ></div>

              {/* Rotujące plamy światła — warstwa 1 (szybsza) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-52 h-52 md:w-64 md:h-64 rounded-full animate-spin"
                  style={{ opacity: orbActive ? 1 : 0.65, animationDuration: '14s', animationTimingFunction: 'linear', transition: 'opacity 0.5s' }}
                >
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full blur-2xl transition-all duration-500 ${orb.light1}`}></div>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl transition-all duration-500 ${orb.light2}`}></div>
                </div>
                {/* Warstwa 2 — wolniejsza, przeciwny obrót */}
                <div
                  className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full animate-spin"
                  style={{ opacity: orbActive ? 0.9 : 0.55, animationDuration: '22s', animationTimingFunction: 'linear', animationDirection: 'reverse', transition: 'opacity 0.5s' }}
                >
                  <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl transition-all duration-500 ${orb.light3}`}></div>
                  <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl transition-all duration-500 ${orb.light4}`}></div>
                </div>
              </div>

              {/* Szklana kula */}
              <div
                className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center text-center animate-[float_4s_ease-in-out_infinite]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.12) 100%)',
                  backdropFilter: 'blur(32px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  boxShadow: orbActive
                    ? '0 0 0 1px rgba(255,255,255,0.15), 0 25px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 60px rgba(255,255,255,0.08)'
                    : '0 0 0 1px rgba(255,255,255,0.1), 0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.08), inset 0 0 40px rgba(255,255,255,0.05)',
                  transform: orbActive ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.7s ease-out, box-shadow 0.5s ease-out',
                }}
              >
                {/* Górne lustrzane odbicie */}
                <div className="absolute top-3 left-8 w-20 h-6 rounded-full bg-white/40 blur-md rotate-[-25deg]"></div>
                <div className="absolute top-5 left-10 w-10 h-3 rounded-full bg-white/60 blur-sm rotate-[-25deg]"></div>
                {/* Dolne subtelne odbicie */}
                <div className="absolute bottom-6 right-8 w-12 h-4 rounded-full bg-white/15 blur-md rotate-[15deg]"></div>

                {/* Reaktywny tekst */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hoveredService || 'default'}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative z-10 text-xs md:text-sm font-semibold text-slate-800 uppercase tracking-[0.22em] drop-shadow-sm px-8 leading-relaxed text-center"
                  >
                    {hoveredService ? orb.label : (
                      <>
                        <span className="hidden md:block">Zapraszamy do zapoznania się z ofertą</span>
                        <span className="block md:hidden">Aby zapoznać się z ofertą przytrzymaj ikonę</span>
                      </>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- FLOATING GLASS DOCK --- */}
          <div className="flex justify-center mb-12">
            <div
              className="inline-flex items-center gap-1 px-4 py-3 rounded-full relative overflow-hidden"
              style={{
                background: 'radial-gradient(ellipse at 40% 25%, rgba(255,255,255,0.55) 0%, rgba(230,235,245,0.35) 50%, rgba(200,210,230,0.25) 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.7), 0 8px 32px rgba(100,120,180,0.18), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 30px rgba(255,255,255,0.3)',
                backdropFilter: 'blur(20px) saturate(160%)',
                WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              }}
            >
              {/* Spekularne odbicie — górny połysk 3D */}
              <span className="absolute top-1 left-8 right-8 h-2 rounded-full bg-white/70 blur-sm pointer-events-none"></span>
              <span className="absolute top-1.5 left-12 right-12 h-0.5 rounded-full bg-white/90 pointer-events-none"></span>

              {/* ── 1. TRANSPORT — minimalna ciężarówka, kręcące się koła ── */}
              <button
                onClick={() => navigateTo('transport')}
                onMouseEnter={() => setHoveredService('transport')}
                onMouseLeave={() => setHoveredService(null)}
                onTouchStart={(e) => { e.preventDefault(); setHoveredService('transport'); }}
                onTouchEnd={() => setHoveredService(null)}
                onTouchCancel={() => setHoveredService(null)}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
                style={{ userSelect: 'none', WebkitTouchCallout: 'none' }}
              >
                {/* Premium Glow — niebieski */}
                <span className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></span>
                <svg viewBox="0 0 36 24" width="34" height="23" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6"
                  className="transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  {/* podwozie */}
                  <line x1="2" y1="19" x2="34" y2="19" className="stroke-slate-400 group-hover:stroke-blue-900 transition-colors duration-300" />
                  {/* kabina */}
                  <path d="M2 19 L2 11 L7 6 L12 6 L12 19" className="stroke-slate-400 group-hover:stroke-blue-900 transition-colors duration-300" />
                  {/* paka */}
                  <rect x="12" y="8" width="22" height="11" rx="1" className="stroke-slate-400 group-hover:stroke-blue-900 transition-colors duration-300" />
                  {/* koło przednie — obraca się wokół własnej osi */}
                  <circle cx="6.5" cy="21" r="2.2"
                    className="stroke-slate-400 group-hover:stroke-blue-900 transition-colors duration-300 group-hover:animate-spin origin-center"
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  {/* koło tylne */}
                  <circle cx="27" cy="21" r="2.2"
                    className="stroke-slate-400 group-hover:stroke-blue-900 transition-colors duration-300 group-hover:animate-spin origin-center"
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                </svg>
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/40 transition-all duration-300 -z-10"></span>
              </button>

              {/* separator */}
              <span className="w-px h-6 bg-slate-200/60 mx-1"></span>

              {/* ── 2. HYDRAULIKA — Settings z obrotem + indigo glow ── */}
              <button
                onClick={() => navigateTo('hydraulics')}
                onMouseEnter={() => setHoveredService('hydraulics')}
                onMouseLeave={() => setHoveredService(null)}
                onTouchStart={(e) => { e.preventDefault(); setHoveredService('hydraulics'); }}
                onTouchEnd={() => setHoveredService(null)}
                onTouchCancel={() => setHoveredService(null)}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
                style={{ userSelect: 'none', WebkitTouchCallout: 'none' }}
              >
                {/* Premium Glow — amber/złoty */}
                <span className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></span>
                <Settings
                  size={24}
                  className="text-slate-400 group-hover:text-amber-500 transition-colors duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-1 group-hover:animate-[spin_4s_linear_infinite]"
                  style={{ transformOrigin: 'center' }}
                />
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/40 transition-all duration-300 -z-10"></span>
              </button>

              {/* separator */}
              <span className="w-px h-6 bg-slate-200/60 mx-1"></span>

              {/* ── 3. KAMIEŃ — Mountain + Cloud + teal glow ── */}
              <button
                onClick={() => navigateTo('stone')}
                onMouseEnter={() => setHoveredService('stone')}
                onMouseLeave={() => setHoveredService(null)}
                onTouchStart={(e) => { e.preventDefault(); setHoveredService('stone'); }}
                onTouchEnd={() => setHoveredService(null)}
                onTouchCancel={() => setHoveredService(null)}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
                style={{ userSelect: 'none', WebkitTouchCallout: 'none' }}
              >
                {/* Premium Glow — teal */}
                <span className="absolute inset-0 rounded-full bg-teal-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></span>
                <div className="relative">
                  <Mountain size={26} className="text-slate-400 group-hover:text-emerald-600 transition-colors duration-300" />
                  <Cloud
                    size={13}
                    className="absolute -top-2.5 -right-1.5 text-slate-300 opacity-60 group-hover:opacity-100 group-hover:text-blue-400 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-400 ease-out"
                  />
                </div>
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-emerald-50/40 transition-all duration-300 -z-10"></span>
              </button>

              {/* separator */}
              <span className="w-px h-6 bg-slate-200/60 mx-1"></span>

              {/* ── 4. WĘGIEL — bryła z żarem wewnętrznym ── */}
              <button
                onClick={() => navigateTo('coal')}
                onMouseEnter={() => setHoveredService('coal')}
                onMouseLeave={() => setHoveredService(null)}
                onTouchStart={(e) => { e.preventDefault(); setHoveredService('coal'); }}
                onTouchEnd={() => setHoveredService(null)}
                onTouchCancel={() => setHoveredService(null)}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
                style={{ userSelect: 'none', WebkitTouchCallout: 'none' }}
              >
                {/* Premium Glow — pomarańczowy żar */}
                <span className="absolute inset-0 rounded-full bg-orange-500/0 group-hover:bg-orange-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></span>
                <svg
                  viewBox="0 0 28 26" width="28" height="26" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-all duration-400 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.7)]"
                >
                  {/* Bryła węgla — idle: liniowy kontur, hover: wypełnienie */}
                  <path
                    d="M6 18 L3 13 L5 7 L9 4 L15 3 L21 6 L25 10 L24 16 L20 21 L13 23 L7 22 Z"
                    className="fill-transparent group-hover:fill-slate-900 stroke-slate-400 group-hover:stroke-slate-400 transition-all duration-400"
                    strokeWidth="1.8"
                  />
                  {/* Fasetki bryły */}
                  <path d="M9 4 L7 10 L13 8 L15 3" className="stroke-slate-400 group-hover:stroke-slate-500 transition-colors duration-400" strokeWidth="1" />
                  <path d="M7 10 L3 13 L6 18 L13 15 L7 10" className="stroke-slate-400 group-hover:stroke-slate-500 transition-colors duration-400" strokeWidth="1" />
                  <path d="M21 6 L19 12 L24 16" className="stroke-slate-400 group-hover:stroke-slate-500 transition-colors duration-400" strokeWidth="1" />

                  {/* Pęknięcia / żyłki — domyślnie niewidoczne, żarzą się na hover */}
                  <path
                    d="M10 10 L12 13 L10 16"
                    className="stroke-slate-700 group-hover:stroke-orange-400 transition-colors duration-500 group-hover:animate-pulse"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M14 8 L16 12 L15 16 L17 19"
                    className="stroke-slate-700 group-hover:stroke-orange-500 transition-colors duration-500 group-hover:animate-pulse"
                    strokeWidth="1"
                  />
                  <path
                    d="M11 17 L14 15 L17 17"
                    className="stroke-slate-700 group-hover:stroke-yellow-400 transition-colors duration-600 group-hover:animate-pulse"
                    strokeWidth="0.9"
                  />
                </svg>
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-orange-50/50 transition-all duration-300 -z-10"></span>
              </button>

            </div>
          </div>

          <div className="flex justify-center w-full px-4 md:px-0 md:block">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            onClick={() => navigateTo('kalkulator')}
            className="relative inline-flex items-center justify-center gap-3 w-[90%] sm:w-auto px-9 min-h-[56px] rounded-full font-bold text-white/95 overflow-hidden group transition-all duration-500 ease-in-out md:hover:scale-105 active:scale-95 active:brightness-110"
            style={{
              background: 'radial-gradient(ellipse at 40% 30%, rgba(40,60,140,0.8) 0%, rgba(15,23,62,0.97) 55%, rgba(5,8,25,1) 100%)',
              boxShadow: '0 0 0 1px rgba(99,130,255,0.3), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(150,180,255,0.25), inset 0 0 40px rgba(59,100,246,0.2)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            {/* Wewnętrzna niebieska poświata wzmacniająca się na hover */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 70%, rgba(59,130,246,0.45) 0%, transparent 65%)',
                boxShadow: 'inset 0 0 50px rgba(59,130,246,0.25)',
              }}
            ></span>
            {/* Hover — zewnętrzna aureola */}
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: '0 0 20px rgba(59,130,246,0.4), 0 0 45px rgba(59,130,246,0.18)' }}
            ></span>
            {/* Spekularne odbicie 3D — górny połysk */}
            <span className="absolute top-1.5 left-8 right-8 h-2.5 rounded-full bg-white/25 blur-sm pointer-events-none"></span>
            <span className="absolute top-2 left-10 right-10 h-1 rounded-full bg-white/40 blur-[2px] pointer-events-none"></span>
            {/* Treść */}
            <Calculator size={20} className="relative z-10 text-blue-300 group-hover:text-white transition-colors duration-300" />
            <span className="relative z-10 tracking-wide">Otwórz kalkulator zamówienia</span>
          </motion.button>
          </div>
        </div>
      </header>
    </>
  );
}

// ============================================================
// === NOWE DEDYKOWANE STRONY USŁUG (INDUSTRIAL POWER GRID) ===
// ============================================================

// --- STRONA TRANSPORT ---
function TransportPage({ navigateTo }) {
  const capabilities = [
    {
      id: 'fleet',
      title: 'Wszechstronna Flota Wywrotek',
      specs: 'Ładowność: 0,5t – 26t',
      description:
        'Elastyczność operacyjna od małych dostaw po obsługę kluczowych inwestycji budowlanych.',
      icon: Truck,
      highlight: false,
    },
    {
      id: 'hds',
      title: 'Precyzyjny Rozładunek HDS',
      specs: 'Wysięg: 7 metrów',
      description:
        'Posiadamy dźwig umożliwiający szybki rozładunek towaru u klienta.',
      icon: Construction,
      highlight: false,
    },
    {
      id: 'special',
      title: 'Transport Specjalistyczny',
      specs: 'Sypkie / Bitumiczne / Kontenery',
      description:
        'Bezpieczny przewóz wymagających materiałów i kontenerów zgodnie z najwyższymi normami.',
      icon: Container,
      highlight: false,
    },
    {
      id: 'quality',
      title: 'Certyfikowana Jakość GMP+',
      specs: 'Standardy Europejskie',
      description:
        'Gwarancja bezpieczeństwa i najwyższych standardów w transporcie pasz i materiałów wrażliwych.',
      icon: ShieldCheck,
      highlight: true,
    },
    {
      id: 'team',
      title: 'Nowoczesna Flota i Ludzie z Pasją',
      specs: 'Technologia + Pasja',
      description:
        'Niezawodny sprzęt obsługiwany przez doświadczonych kierowców zaangażowanych w Twoje zlecenie.',
      icon: Users,
      highlight: true,
    },
    {
      id: 'coverage',
      title: 'Zasięg Operacyjny',
      specs: 'Lokalnie i Krajowo',
      description:
        'Szybka reakcja na terenie Wielkopolski oraz kompleksowa obsługa logistyczna w całej Polsce.',
      icon: Map,
      highlight: false,
    },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fadeIn">
      <button
        onClick={() => navigateTo('start')}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 transition-all duration-300 hover:translate-x-1 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Powrót do strony głównej
      </button>

      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800 mb-12 animate-scaleIn">
        {/* Efekt "technologicznej" poświaty w tle (niebiesko-cyjanowy) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Mała odznaka nad tytułem */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium mb-6 border border-blue-500/20">
            <Navigation size={18} className="animate-pulse" />
            <span className="text-sm tracking-wide uppercase">Własna Flota Pojazdów</span>
          </div>

          {/* Główne hasło z błękitnym gradientem */}
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Twój towar. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Zawsze na czas.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
            Dysponujemy nowoczesną flotą pojazdów ciężarowych. Gwarantujemy sprawną i bezpieczną dostawę kruszyw oraz węgla, dopasowując się do Twoich potrzeb.
          </p>

          {/* Efektowne kafelki z szybkimi statystykami */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {/* Kafelek 1 */}
            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-blue-500/50 transition-colors duration-300">
              <Weight className="text-blue-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Dowolny Tonaż</p>
              <p className="text-slate-400 text-sm mt-1">Dopasowujemy auto do wielkości Twojego zamówienia</p>
            </div>

            {/* Kafelek 2 */}
            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-blue-500/50 transition-colors duration-300">
              <Map className="text-cyan-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Lokalnie i Krajowo</p>
              <p className="text-slate-400 text-sm mt-1">Obsługujemy inwestycje w regionie oraz trasy dalekobieżne</p>
            </div>

            {/* Kafelek 3 */}
            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-blue-500/50 transition-colors duration-300">
              <Clock className="text-indigo-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Gwarancja Terminu</p>
              <p className="text-slate-400 text-sm mt-1">Koniec z przestojami na budowie. Jesteśmy punktualni</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* === KROK 1: NOWY NAGŁÓWEK SEKCJI "KOMPETENCJE"            === */}
      {/* ============================================================ */}
      <div className="mb-16 relative">
        {/* Delikatne, bardzo jasne granatowo-szare tło całej sekcji */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 to-blue-50/50 opacity-80 rounded-3xl"></div>

        <div className="relative z-10 text-center mb-12 pt-8">
          {/* Granatowy przycisk nawiązujący do logo Granteco */}
          <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-full mb-4 font-bold shadow-lg border border-blue-800 hover:bg-blue-800 transition-colors">
            <Sparkles className="text-blue-200" size={20} />
            Kompetencje Transportowe
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
            Profesjonalizm w Każdym Detalu
          </h2>

          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Sześć filarów doskonałości operacyjnej naprzeciw Twoim oczekiwaniom
          </p>
        </div>

        {/* ============================================================ */}
        {/* === KROK 2: SIATKA KAFELKÓW — AKCENTY blue-900           === */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 p-8">
          {capabilities.map((capability, idx) => {
            const Icon = capability.icon;
            if (capability.highlight) {
              return (
                <div
                  key={capability.id}
                  className="bg-gradient-to-br from-blue-800 to-blue-950 text-white rounded-xl shadow-2xl p-6 hover:-translate-y-2 hover:shadow-blue-900/50 transition-all duration-300 group border-none animate-fadeInUp"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-lg mb-4 inline-block shadow-lg">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                  <div className="text-sm font-mono font-bold text-white/90 bg-white/20 py-1 px-3 rounded-md inline-block mb-3">
                    {capability.specs}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={capability.id}
                className="bg-white rounded-xl shadow-md border-b-4 border-blue-900 p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* KROK 2: ikona — bg-blue-900, shadow-blue-900 */}
                <div className="bg-blue-900 text-white p-3 rounded-lg mb-4 inline-block shadow-lg shadow-blue-900/30 group-hover:shadow-blue-900/50 transition-all">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {capability.title}
                </h3>
                {/* KROK 2: tekst specyfikacji — text-blue-900 */}
                <div className="text-sm font-mono font-bold text-blue-900 bg-blue-50 py-1 px-2 rounded-md inline-block mb-3">
                  {capability.specs}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-900 rounded-2xl p-8 mt-12 text-white flex flex-col md:flex-row items-center justify-between relative z-10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/50 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-700/30 to-transparent"></div>
        <div className="relative z-10 flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-800 p-3 rounded-lg border border-blue-700">
              <Phone size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Potrzebujesz wyceny transportu?
            </h3>
          </div>
          <p className="text-lg text-blue-100 mb-4">
            Skontaktuj się z nami już dziś i otrzymaj spersonalizowaną ofertę
            dostosowaną do Twoich potrzeb
          </p>
          <div className="flex items-center gap-2 text-blue-200 text-sm">
            <Check size={18} />
            <span>Szybka odpowiedź gwarantowana</span>
          </div>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateTo('kontakt')}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl group"
          >
            <Mail size={20} />
            Wyślij zapytanie
            <ArrowRightCircle
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="tel:662333188"
            className="bg-blue-800 hover:bg-blue-700 border border-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
          >
            <Phone size={20} />
            662-333-188
          </a>
        </div>
      </div>
    </div>
  );
}

// --- STRONA PRZEWODY HYDRAULICZNE ---
function HydraulicsPage({ navigateTo }) {
  const capabilities = [
    {
      id: 'onsite',
      title: 'Profesjonalny sprzęt',
      specs: 'Marka Finn Power',
      description:
        'Wykonujemy usługi na maszynie spełniającej normy jakościowe.',
      icon: Settings,
      highlight: false,
    },
    {
      id: 'pressure',
      title: 'Przewody Wysokociśnieniowe',
      specs: 'Do 400 bar',
      description:
        'Wytrzymałe przewody dla najbardziej wymagających zastosowań przemysłowych.',
      icon: Gauge,
      highlight: false,
    },
    {
      id: 'repair',
      title: 'Naprawa Ekspresowa',
      specs: '< 30 min',
      description:
        'Minimalizujemy przestoje. Profesjonalna diagnostyka i natychmiastowa naprawa.',
      icon: Repeat,
      highlight: true,
    },
    {
      id: 'quality',
      title: 'Certyfikaty ISO',
      specs: 'Jakość Gwarantowana',
      description:
        'Posiadamy certyfikaty jakości. Stosujemy tylko sprawdzone komponenty renomowanych producentów.',
      icon: Award,
      highlight: true,
    },
    {
      id: 'stock',
      title: 'Magazyn',
      specs: 'Dostępność od ręki oraz na zamówienie',
      description: 'Szeroki asortyment złączek, końcówek i węży.',
      icon: Box,
      highlight: false,
    },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fadeIn">
      <button
        onClick={() => navigateTo('start')}
        className="flex items-center gap-2 text-slate-600 hover:text-emerald-700 mb-8 transition-all duration-300 hover:translate-x-1 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Powrót do strony głównej
      </button>

      {/* ============================================================ */}
      {/* === KROK 2: NOWY CIEMNY BANER — INDUSTRIAL POWER         === */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800 mb-12 animate-scaleIn">

        {/* Efekt "przemysłowej" poświaty w tle (miodowo-żółty) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 bg-amber-600/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Mała odznaka nad tytułem */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 font-medium mb-6 border border-amber-500/20">
            <Settings size={18} className="animate-spin-slow" />
            <span className="text-sm tracking-wide uppercase">Serwis Hydrauliki Siłowej</span>
          </div>

          {/* Główne hasło z industrialnym gradientem */}
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Ciśnienie pod <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
              pełną kontrolą
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
            Zakuwamy przewody hydrauliczne dla rolnictwa, przemysłu i budownictwa. Pracujemy na topowych maszynach Finn Power, gwarantując niezawodność w każdych warunkach.
          </p>

          {/* Kafelki statystyk */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-amber-500/50 transition-colors duration-300">
              <Gauge className="text-amber-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Do 400 bar</p>
              <p className="text-slate-400 text-sm mt-1">Wytrzymałość na ekstremalne ciśnienie</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-amber-500/50 transition-colors duration-300">
              <Settings className="text-yellow-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Maszyny Finn Power</p>
              <p className="text-slate-400 text-sm mt-1">Sprzęt spełniający najwyższe normy jakościowe</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-amber-500/50 transition-colors duration-300">
              <Wrench className="text-amber-500 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Szybka Realizacja</p>
              <p className="text-slate-400 text-sm mt-1">Zakuwanie na poczekaniu, minimalizujemy przestoje</p>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* === KROK 3: SEKCJA KOMPETENCJI — AMBER/SLATE THEME        === */}
      {/* ============================================================ */}
      <div className="mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 to-amber-50/30 opacity-80 rounded-3xl"></div>
        <div className="relative z-10 text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full mb-4 font-bold shadow-lg border border-slate-700 hover:border-amber-500/50 transition-colors">
            <Sparkles className="text-amber-400" size={20} />
            Kompetencje Hydrauliczne
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
            Precyzja w Każdym Połączeniu
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Kompleksowe usługi hydrauliczne z gwarancją jakości i błyskawiczną reakcją
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 p-8">
          {capabilities.map((capability, idx) => {
            const Icon = capability.icon;
            if (capability.highlight) {
              return (
                <div
                  key={capability.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-2xl p-6 hover:-translate-y-2 hover:shadow-amber-900/30 transition-all duration-300 group border border-slate-700 hover:border-amber-500/50 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-amber-500/20 text-amber-400 p-4 rounded-lg mb-4 inline-block shadow-lg">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                  <div className="text-sm font-mono font-bold text-amber-400/90 bg-amber-500/10 py-1 px-3 rounded-md inline-block mb-3 border border-amber-500/20">
                    {capability.specs}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={capability.id}
                className="bg-white rounded-xl shadow-md border-b-4 border-amber-500 p-6 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-400 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-amber-500 text-white p-3 rounded-lg mb-4 inline-block shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {capability.title}
                </h3>
                <div className="text-sm font-mono font-bold text-amber-600 bg-amber-50 py-1 px-2 rounded-md inline-block mb-3">
                  {capability.specs}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA — grafit z miodowym akcentem */}
      <div className="bg-slate-900 rounded-2xl p-8 mt-12 text-white flex flex-col md:flex-row items-center justify-between relative z-10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-transparent"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-amber-600/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-500/20 border border-amber-500/30 p-3 rounded-lg">
              <Phone size={28} className="text-amber-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Potrzebujesz szybkiej naprawy?
            </h3>
          </div>
          <p className="text-lg text-slate-300 mb-4">
            Zadzwoń i umów się na serwis w naszym warsztacie.
          </p>
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <Check size={18} />
            <span>Dołożymy wszelkich starań, aby szybko naprawić usterkę.</span>
          </div>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateTo('kontakt')}
            className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl group"
          >
            <Mail size={20} />
            Wyślij zapytanie
            <ArrowRightCircle
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="tel:662333188"
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-black px-8 py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
          >
            <Phone size={20} />
            662-333-188
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// === NOWA STRONA KAMIEŃ — KATALOG PRODUKTÓW               ===
// ============================================================

function StonePage({ navigateTo }) {
  const products = [
    {
      id: 'marianna',
      title: 'Grys Biała Marianna',
      fractions: ['8/16 mm'],
      description:
        'Jasny, niemal śnieżnobiały marmur z delikatnymi, brzoskwiniowo-kremowymi żyłkami. Bardzo szlachetny wygląd - ozświetla ogród. Często używany w ogrodach w stylu japońskim, w nowoczesnych aranżacjach wokół ciemnych roślin, a także w donicach na tarasach.',
      image: '/biala_marianna.jpg',
    },
    {
      id: 'kora',
      title: 'Kora Kamienna',
      fractions: ['11/32 mm', '16/32 mm'],
      description:
        'Kamień łupany - gnejs, który swoim wyglądem, układem warstw i rdzawo-brązowo-szarą kolorystyką do złudzenia przypomina korę drzew. Trwała alternatywa dla zwykłej kory sosnowej. Nie gnije, nie jest wywiewana przez wiatr i rewelacyjnie wygląda w ogrodach leśnych, naturalistycznych oraz na rabatach z iglakami.',
      image: '/kora_kamienna.jpg',
      video: '/kora_kamienna.mp4',
    },
    {
      id: 'bazalt',
      title: 'Grys Bazaltowy',
      fractions: ['16/22 mm'],
      description:
        'Głęboka, antracytowa czerń, która przepięknie lśni po deszczu. Stworzony do nowoczesnej architektury. Zapewnia najmocniejszy kontrast dla jasnych roślin, białych donic czy jasnej kostki brukowej.',
      image: '/bazalt.jpg',
      video: '/bazalt.mp4',
    },
    {
      id: 'granit',
      title: 'Grys Granitowy',
      fractions: ['8/16 mm', '16/22 mm'],
      description:
        'Klasyczny, surowy kamień w odcieniach "pieprz i sól" - jasnoszary z ciemnymi drobinkami. Bardzo twardy i odporny. Niezwykle uniwersalny. Drobniejsza frakcja (8/16) jest idealna na ścieżki i alejki, grubsza (16/22) doskonale utwardza podjazdy i sprawdza się jako opaska drenażowa wokół domu.',
      image: '/granit.jpg',
      video: '/granit.mp4',
    },
    {
      id: 'ice',
      title: 'Otoczak "Mleczny"',
      fractions: ['16/32 mm'],
      description:
        'Chłodna, elegancka kolorystyka. Mleczno-szaro-białe tony, które pięknie mienią się w słońcu i nabierają głębi po deszczu. Doskonały do nowoczesnych, minimalistycznych ogrodów. Świetnie kontrastuje z soczystą zielenią trawnika i ciemną elewacją budynków.',
      image: '/otoczak_mleczny.jpg',
      video: '/otoczak_mleczny.mp4',
    },
    {
      id: 'miodowy',
      title: 'Otoczak "Miodowy"',
      fractions: ['8/16 mm'],
      description:
        'Ciepła, słoneczna paleta barw – mieszanka odcieni beżu, bieli, jasnego brązu i delikatnej szarości. Gładka struktura. Wprowadza do ogrodu przytulny, śródziemnomorski klimat. Idealny na drobne rabaty, ścieżki, do donic oraz jako tło dla traw ozdobnych i sukulentów.',
      image: '/miodowy.jpg',
      video: '/miodowy.mp4',
    },
    {
      id: 'cappuccino',
      title: 'Kruszywo "Cappuccino"',
      fractions: ['16/35 mm'],
      description:
        'Nieregularny grys o bardzo ciepłej mieszance kolorystycznej - biel, krem, beż i wstawki brązu. Świetny kompromis między ostrym grysem a ciepłymi barwami. Rozjaśnia zacienione miejsca i doskonale komponuje się z drewnem na elewacji lub tarasie.',
      image: '/cappuccino.jpg',
      video: '/cappuccino.mp4',
    },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fadeIn">
      <button
        onClick={() => navigateTo('start')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-all duration-300 hover:translate-x-1 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Powrót do strony głównej
      </button>

      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800 mb-12 animate-scaleIn">

        {/* Efekt "naturalnej" poświaty w tle (szmaragdowo-zielony) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 bg-emerald-600/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Mała odznaka nad tytułem */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-medium mb-6 border border-emerald-500/20">
            <Mountain size={18} className="animate-pulse" />
            <span className="text-sm tracking-wide uppercase">Kruszywa Ozdobne i Drogowe</span>
          </div>

          {/* Główne hasło ze szmaragdowym gradientem */}
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Piękno natury <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              w Twoim ogrodzie
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
            Odkryj szeroki wybór naturalnych kruszyw. Od śnieżnobiałej Marianny po elegancki Bazalt – dostarczamy kamień, który całkowicie odmieni Twoją posesję. Oprócz asortymentu w katalogu posiadamy również piasek 0/2.
          </p>

          {/* Kafelki statystyk */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-emerald-500/50 transition-colors duration-300">
              <Gem className="text-emerald-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Szeroki Wybór</p>
              <p className="text-slate-400 text-sm mt-1">Bogata paleta barw i frakcji dopasowana do każdego projektu</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-emerald-500/50 transition-colors duration-300">
              <Weight className="text-teal-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Dowolna Ilość</p>
              <p className="text-slate-400 text-sm mt-1">Sprzedaż detaliczna i hurtowa z wygodną dostawą pod drzwi</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-emerald-500/50 transition-colors duration-300">
              <ShieldCheck className="text-green-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Najwyższa Jakość</p>
              <p className="text-slate-400 text-sm mt-1">Czyste, starannie wyselekcjonowane i płukane kruszywa</p>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-20">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-slate-100 animate-fadeInUp"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              {product.video ? (
                <video
                  src={product.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              ) : (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6 md:p-8 relative bg-white">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.fractions.map((fraction) => (
                  <span
                    key={fraction}
                    className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"
                  >
                    Frakcja: {fraction}
                  </span>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-200 mb-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="bg-slate-100 p-5 rounded-2xl inline-flex items-center justify-center mb-5">
              <Truck size={36} className="text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              Darmowa dostawa
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Bezpłatny transport przy zamówieniach powyżej 5 ton w strefie do
              10 km
            </p>
          </div>
          <div className="text-center">
            <div className="bg-slate-100 p-5 rounded-2xl inline-flex items-center justify-center mb-5">
              <ShieldCheck
                size={36}
                className="text-slate-500"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              Certyfikowane źródła
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Kamień pochodzi wyłącznie z certyfikowanych kamieniołomów
            </p>
          </div>
          <div className="text-center">
            <div className="bg-slate-100 p-5 rounded-2xl inline-flex items-center justify-center mb-5">
              <Calculator
                size={36}
                className="text-slate-500"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              Kalkulator online
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Oblicz ilość materiału i koszt dostawy w naszym kalkulatorze
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between relative shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-transparent z-0"></div>

        <div className="relative z-10 flex-1 mb-8 md:mb-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-slate-700 p-3 rounded-xl">
              <Phone size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Zainteresowany naszym kamieniem?
            </h3>
          </div>
          <p className="text-lg text-slate-300 mb-5 max-w-xl">
            Skontaktuj się z nami lub skorzystaj z kalkulatora, aby obliczyć
            koszt zamówienia
          </p>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <Check size={18} />
            <span>Bezpłatna wycena projektu</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => navigateTo('kalkulator')}
            className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl group"
          >
            <Calculator size={20} />
            Otwórz kalkulator
            <ArrowRightCircle
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="tel:662333188"
            className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-xl"
          >
            <Phone size={20} />
            662-333-188
          </a>
        </div>
      </div>
    </div>
  );
}

// --- STRONA WĘGIEL ---
function CoalPage({ navigateTo }) {
  const capabilities = [
    {
      id: 'nut',
      title: 'Węgiel Orzech I',
      specs: 'Frakcja 25-80mm',
      description:
        'Klasyczny węgiel orzech dla kotłów tradycyjnych. Wysoka wartość opałowa i długi czas spalania.',
      icon: Fire,
      highlight: false,
    },
    {
      id: 'ecogroszek',
      title: 'Groszek Premium',
      specs: 'Frakcja 5-25mm',
      description:
        'Węgiel kamienny Groszek do kotłów automatycznych. Niska emisja, wysoka efektywność.',
      icon: ThermometerSun,
      highlight: false,
    },
    {
      id: 'calorific',
      title: 'Wysoka Wartość Opałowa',
      specs: '> 25 MJ/kg',
      description:
        'Gwarantowana wartość opałowa powyżej 25 MJ/kg. Maksymalna wydajność grzewcza.',
      icon: Gauge,
      highlight: false,
    },
    {
      id: 'quality',
      title: 'Jakość Obsługi',
      specs: 'Legalizacja + Kalibracja wagi',
      description:
        'Węgiel ważony jest na naszej wadze najazdowej spełniającej wymagane normy, a klient otrzymuje wydruk dokumentu potwierdzający zgodność z zamówieniem.',
      icon: ShieldAlert,
      highlight: true,
    },
    {
      id: 'certificates',
      title: 'Atesty Jakościowe',
      specs: 'Każda Partia Certyfikowana',
      description:
        'Wszystkie dostawy posiadają aktualne atesty potwierdzające parametry jakościowe.',
      icon: FileCheck,
      highlight: true,
    },
    {
      id: 'delivery',
      title: 'Dostawa cały rok',
      specs: 'Luzem lub w Workach',
      description:
        'Terminowe dostawy przez cały sezon grzewczy i nie tylko. Dostępne opcje luzem lub w workach 25 kg.',
      icon: Weight,
      highlight: false,
    },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fadeIn">
      <button
        onClick={() => navigateTo('start')}
        className="flex items-center gap-2 text-slate-600 hover:text-orange-700 mb-8 transition-all duration-300 hover:translate-x-1 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Powrót do strony głównej
      </button>
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-800 mb-12 animate-scaleIn">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 bg-red-600/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 font-medium mb-6 border border-red-500/20">
            <Flame size={18} className="animate-pulse" />
            <span className="text-sm tracking-wide uppercase">
              Oferta Sezonowa
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Ciepło, na którym <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              możesz polegać
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
            Najwyższej jakości importowany węgiel kamienny. Gwarantujemy czyste
            spalanie i stałe dostawy przez całą zimę.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-orange-500/50 transition-colors duration-300">
              <ThermometerSun className="text-orange-400 mb-3" size={32} />
              <p className="text-white font-bold text-xl">&gt; 25 MJ/kg</p>
              <p className="text-slate-400 text-sm mt-1">
                Gwarantowana kaloryczność
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-orange-600/50 transition-colors duration-300">
              <ShieldCheck className="text-orange-500 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Niska Siarka</p>
              <p className="text-slate-400 text-sm mt-1">
                Bezpieczny dla Twojego pieca
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center md:items-start text-center md:text-left hover:border-red-600/50 transition-colors duration-300">
              <Truck className="text-red-500 mb-3" size={32} />
              <p className="text-white font-bold text-xl">Szybka Dostawa</p>
              <p className="text-slate-400 text-sm mt-1">
                Własny transport z rozładunkiem
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 to-orange-50/30 opacity-80 rounded-3xl"></div>

        <div className="relative z-10 text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full mb-4 font-bold shadow-lg border border-slate-700 hover:border-orange-500/50 transition-colors">
            <Sparkles className="text-orange-500" size={20} />
            Kompetencje Opałowe
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
            Ciepło Najwyższej Jakości
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Polski węgiel kamienny z gwarancją jakości i terminowych dostaw
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 p-8">
          {capabilities.map((capability, idx) => {
            const Icon = capability.icon;
            if (capability.highlight) {
              return (
                <div
                  key={capability.id}
                  className="bg-gradient-to-br from-slate-900 to-orange-800 text-white rounded-xl shadow-2xl p-6 hover:-translate-y-2 hover:shadow-slate-500/50 transition-all duration-300 group border-none animate-fadeInUp"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-lg mb-4 inline-block shadow-lg">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                  <div className="text-sm font-mono font-bold text-white/90 bg-white/20 py-1 px-3 rounded-md inline-block mb-3">
                    {capability.specs}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={capability.id}
                className="bg-white rounded-xl shadow-md border-b-4 border-orange-900 p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-orange-700 text-white p-3 rounded-lg mb-4 inline-block shadow-lg shadow-orange-600/30 group-hover:shadow-orange-600/50 transition-all">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {capability.title}
                </h3>
                <div className="text-sm font-mono font-bold text-orange-700 bg-slate-200 py-1 px-2 rounded-md inline-block mb-3">
                  {capability.specs}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-orange-900 rounded-2xl p-8 mt-12 text-white flex flex-col md:flex-row items-center justify-between relative z-10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-slate-800/30 to-transparent"></div>
        <div className="relative z-10 flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-700 p-3 rounded-lg">
              <Phone size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Potrzebujesz węgla na sezon?
            </h3>
          </div>
          <p className="text-lg text-orange-100 mb-4">
            Zamów wysokiej jakości węgiel z dostawą do domu. Atesty w cenie
          </p>
          <div className="flex items-center gap-2 text-orange-200 text-sm">
            <Check size={18} />
            <span>Terminowa dostawa gwarantowana</span>
          </div>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateTo('kontakt')}
            className="bg-white text-orange-900 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl group"
          >
            <Mail size={20} />
            Wyślij zapytanie
            <ArrowRightCircle
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="tel:662333188"
            className="bg-orange-700 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
          >
            <Phone size={20} />
            662-333-188
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// === STRONA KALKULATORA Z FRAMER-MOTION                   ===
// ============================================================
function CalculatorPage({ navigateTo, setLegalModal }) {
  const [calcRef, calcInView] = useScrollAnimation();

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto animate-fadeIn">
      <button
        onClick={() => navigateTo('start')}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 transition-all duration-300 hover:translate-x-1 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Powrót do strony głównej
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-bold">
          <Sparkles size={18} />
          Inteligentny Kalkulator
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
          Kalkulator Zamówienia
        </h1>
        <p className="text-lg md:text-xl text-slate-600">
          Oblicz koszt materiału i transportu w czasie rzeczywistym
        </p>
      </motion.div>

      <motion.div
        ref={calcRef}
        initial={{ opacity: 0, y: 50 }}
        animate={calcInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CalculatorComponent />
      </motion.div>
    </div>
  );
}

// ============================================================
// === STRONA KONTAKTU                                      ===
// ============================================================
function ContactPage({ navigateTo }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      formData.append('access_key', "bc9c7b48-47c4-45a9-a0e7-8321221ad9ad");
      formData.append('subject', 'Nowa wiadomość kontaktowa – Granteco');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Wiadomość wysłana! Odpiszemy najszybciej jak to możliwe.');
        e.target.reset();
      } else {
        alert('Coś poszło nie tak. Spróbuj ponownie lub zadzwoń do nas.');
      }
    } catch {
      alert('Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto animate-fadeIn">
      <button
        onClick={() => navigateTo('start')}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 transition-all duration-300 hover:translate-x-1 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Powrót do strony głównej
      </button>

      <div className="text-center mb-12 animate-fadeInDown">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
          Skontaktuj się z nami
        </h1>
        <p className="text-lg md:text-xl text-slate-600">
          Jesteśmy do Twojej dyspozycji
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* --- LEWA KOLUMNA: KAFELKI KONTAKTOWE --- */}
        <div className="space-y-4 animate-fadeInLeft">

          {/* Kafelek: Telefon */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-900 transition-all duration-300 flex items-start gap-4 group cursor-default">
            <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-blue-900 transition-colors duration-300 shrink-0">
              <Phone size={22} className="text-blue-900 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Telefon</h3>
              <a href="tel:662333188" className="text-slate-800 font-bold text-lg hover:text-blue-900 transition-colors">
                +48 662 333 188
              </a>
            </div>
          </div>

          {/* Kafelek: Email */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-900 transition-all duration-300 flex items-start gap-4 group cursor-default">
            <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-blue-900 transition-colors duration-300 shrink-0">
              <Mail size={22} className="text-blue-900 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Email</h3>
              <a href="mailto:biuro@granteco.pl" className="text-slate-800 font-bold text-lg hover:text-blue-900 transition-colors">
                biuro@granteco.pl
              </a>
            </div>
          </div>

          {/* Kafelek: Adres */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-900 transition-all duration-300 flex items-start gap-4 group cursor-default">
            <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-blue-900 transition-colors duration-300 shrink-0">
              <MapPin size={22} className="text-blue-900 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Adres</h3>
              <p className="text-slate-800 font-bold text-lg leading-snug">
                ul. Poznańska 28<br />62-090 Mrowino
              </p>
            </div>
          </div>

          {/* Kafelek: Godziny otwarcia — ciemny dla kontrastu */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-lg text-white border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                  <Clock size={20} className="text-blue-400" />
                </div>
                <h3 className="font-bold text-lg">Godziny otwarcia</h3>
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex justify-between">
                  <span>Poniedziałek – Piątek</span>
                  <span className="font-bold text-white">8:30 – 16:30</span>
                </li>
                <li className="flex justify-between">
                  <span>Sobota</span>
                  <span className="font-bold text-white">9:00 – 12:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Niedziela</span>
                  <span className="font-bold text-slate-500">Nieczynne</span>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-2 text-amber-400 bg-amber-400/10 px-4 py-2.5 rounded-lg border border-amber-400/20 text-sm">
                <AlertCircle size={16} />
                <span>Przed przyjazdem prosimy o kontakt</span>
              </div>
            </div>
          </div>

        </div>

        {/* ---- PRAWA KOLUMNA: FORMULARZ ---- */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm animate-fadeInRight">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Wyślij wiadomość
          </h2>
          <p className="text-slate-500 text-sm mb-6">Odpowiemy najszybciej jak to możliwe</p>
          <form className="space-y-4" onSubmit={handleContactSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Imię i nazwisko
              </label>
              <input
                type="text"
                name="Imie_i_nazwisko"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                placeholder="Jan Kowalski"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                placeholder="jan@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                name="Telefon"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                placeholder="+48 123 456 789"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Wiadomość
              </label>
              <textarea
                name="Wiadomosc"
                rows="5"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all resize-none"
                placeholder="Opisz czego potrzebujesz..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full inline-flex justify-center items-center gap-3 min-h-[56px] px-8 rounded-xl font-bold text-white/95 overflow-hidden group transition-all duration-500 ease-in-out md:hover:scale-[1.02] active:scale-95 active:brightness-110 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              style={{
                background: 'radial-gradient(ellipse at 40% 30%, rgba(40,60,140,0.8) 0%, rgba(15,23,62,0.97) 55%, rgba(5,8,25,1) 100%)',
                boxShadow: '0 0 0 1px rgba(99,130,255,0.3), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(150,180,255,0.25), inset 0 0 40px rgba(59,100,246,0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            >
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(59,130,246,0.45) 0%, transparent 65%)', boxShadow: 'inset 0 0 50px rgba(59,130,246,0.25)' }}></span>
              <span className="absolute inset-[-2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 20px rgba(59,130,246,0.4), 0 0 45px rgba(59,130,246,0.18)' }}></span>
              <span className="absolute top-1.5 left-8 right-8 h-2 rounded-full bg-white/20 blur-sm pointer-events-none"></span>
              {isSubmitting ? (
                <>
                  <div className="relative z-10 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="relative z-10">Wysyłanie...</span>
                </>
              ) : (
                <>
                  <Mail size={20} className="relative z-10 text-blue-300 group-hover:text-white transition-colors duration-300" />
                  <span className="relative z-10 tracking-wide">Wyślij wiadomość</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// === KOMPONENT KALKULATORA — PROFIT GUARD + PIASEK        ===
// ============================================================

const MATERIALS = [
  {
    id: 1,
    name: 'Otoczak "Miodowy" 8/16',
    density: 1.5,
    price: 300,
    margin: 'mid',
  },
  {
    id: 2,
    name: 'Otoczak "Ice" 16/32',
    density: 1.5,
    price: 500,
    margin: 'high',
  },
  {
    id: 3,
    name: 'Grys Granitowy 8/16',
    density: 1.6,
    price: 350,
    margin: 'mid',
  },
  {
    id: 4,
    name: 'Grys Granitowy 16/22',
    density: 1.6,
    price: 350,
    margin: 'mid',
  },
  {
    id: 5,
    name: 'Grys Bazaltowy 16/22',
    density: 1.6,
    price: 300,
    margin: 'mid',
  },
  {
    id: 6,
    name: 'Kruszywo Cappuccino 16/35',
    density: 1.4,
    price: 400,
    margin: 'mid',
  },
  {
    id: 7,
    name: 'Grys Biała Marianna 8/16',
    density: 1.5,
    price: 700,
    margin: 'high',
  },
  {
    id: 8,
    name: 'Kora Kamienna 11/32',
    density: 1.4,
    price: 500,
    margin: 'high',
  },
  {
    id: 9,
    name: 'Kora Kamienna 16/32',
    density: 1.4,
    price: 500,
    margin: 'high',
  },
  { id: 10, name: 'Piasek 0/2', density: 1.7, price: 100, margin: 'high' },
];

const getSandTransportCalculation = (distance, weightInKg) => {
  const weightInTons = weightInKg / 1000;
  if (distance > 20) {
    return {
      price: 0,
      label: 'Brak dowozu > 20 km',
      zoneName: 'POZA ZASIĘGIEM',
      color: 'text-red-600',
      bg: 'bg-red-500',
      bgLight: 'bg-red-100',
      border: 'border-red-500',
      gradientBg: 'from-red-500 to-red-600',
      sliderBg: 'from-red-200 to-red-300',
      sliderAccent: 'accent-red-600',
      emoji: '🔴',
      tooFar: true,
      discount: 0,
    };
  }
  if (distance <= 10) {
    let price = 130;
    let discount = 0;
    if (weightInTons >= 7) {
      price = 0;
      discount = 10;
    } else if (weightInTons >= 6) {
      price = 0;
      discount = 5;
    } else if (weightInTons >= 5) {
      price = 0;
    } else if (weightInTons >= 4) {
      price = 40;
    } else if (weightInTons >= 3) {
      price = 50;
    } else if (weightInTons >= 2) {
      price = 100;
    }
    return {
      price,
      label: price === 0 ? 'GRATIS' : `${price} zł`,
      zoneName: 'ZIELONA (Piasek)',
      color: 'text-green-600',
      bg: 'bg-green-500',
      bgLight: 'bg-green-100',
      border: 'border-green-500',
      gradientBg: 'from-green-500 to-green-600',
      sliderBg: 'from-green-200 to-green-300',
      sliderAccent: 'accent-green-600',
      emoji: '🟢',
      discount,
    };
  }
  if (distance <= 20) {
    let price = 150;
    let discount = 0;
    if (weightInTons >= 7 || weightInTons >= 6) {
      price = 0;
    } else if (weightInTons >= 5) {
      price = 20;
    } else if (weightInTons >= 4) {
      price = 60;
    } else if (weightInTons >= 3) {
      price = 70;
    } else if (weightInTons >= 2) {
      price = 120;
    }
    return {
      price,
      label: price === 0 ? 'GRATIS' : `${price} zł`,
      zoneName: 'ŻÓŁTA (Piasek)',
      color: 'text-yellow-600',
      bg: 'bg-yellow-500',
      bgLight: 'bg-yellow-100',
      border: 'border-yellow-500',
      gradientBg: 'from-yellow-500 to-yellow-600',
      sliderBg: 'from-yellow-200 to-yellow-300',
      sliderAccent: 'accent-yellow-600',
      emoji: '🟡',
      discount,
    };
  }
  return {
    price: 0,
    label: 'Błąd kalkulacji',
    zoneName: 'BŁĄD',
    color: 'text-slate-600',
    bg: 'bg-slate-500',
    bgLight: 'bg-slate-100',
    border: 'border-slate-500',
    gradientBg: 'from-slate-500 to-slate-600',
    sliderBg: 'from-slate-200 to-slate-300',
    sliderAccent: 'accent-slate-600',
    emoji: '⚫',
    discount: 0,
  };
};

const getTransportCalculation = (distance, weightInKg) => {
  const isFreeEligible = weightInKg >= 1000;
  if (distance <= 10) {
    if (isFreeEligible)
      return {
        price: 0,
        label: 'GRATIS (Promocja)',
        zoneName: 'ZIELONA',
        color: 'text-green-600',
        bg: 'bg-green-500',
        bgLight: 'bg-green-100',
        border: 'border-green-500',
        gradientBg: 'from-green-500 to-green-600',
        sliderBg: 'from-green-200 to-green-300',
        sliderAccent: 'accent-green-600',
        emoji: '🟢',
        discount: 0,
      };
    return {
      price: 50,
      label: '50 zł (Dopłata < 1t)',
      zoneName: 'ZIELONA*',
      color: 'text-green-600',
      bg: 'bg-green-500',
      bgLight: 'bg-green-100',
      border: 'border-green-500',
      gradientBg: 'from-green-500 to-green-600',
      sliderBg: 'from-green-200 to-green-300',
      sliderAccent: 'accent-green-600',
      emoji: '🟢',
      discount: 0,
    };
  }
  if (distance <= 20)
    return {
      price: 70,
      label: 'Strefa ŻÓŁTA (70 zł)',
      zoneName: 'ŻÓŁTA',
      color: 'text-yellow-600',
      bg: 'bg-yellow-500',
      bgLight: 'bg-yellow-100',
      border: 'border-yellow-500',
      gradientBg: 'from-yellow-500 to-yellow-600',
      sliderBg: 'from-yellow-200 to-yellow-300',
      sliderAccent: 'accent-yellow-600',
      emoji: '🟡',
      discount: 0,
    };
  if (distance <= 30)
    return {
      price: 120,
      label: 'Strefa POMARAŃCZOWA (120 zł)',
      zoneName: 'POMARAŃCZOWA',
      color: 'text-orange-600',
      bg: 'bg-orange-500',
      bgLight: 'bg-orange-100',
      border: 'border-orange-500',
      gradientBg: 'from-orange-500 to-orange-600',
      sliderBg: 'from-orange-200 to-orange-300',
      sliderAccent: 'accent-orange-600',
      emoji: '🟠',
      discount: 0,
    };
  const longDistancePrice = distance * 6;
  return {
    price: longDistancePrice,
    label: `Indywidualna (${longDistancePrice} zł)`,
    zoneName: 'CZERWONA',
    color: 'text-red-600',
    bg: 'bg-red-500',
    bgLight: 'bg-red-100',
    border: 'border-red-500',
    gradientBg: 'from-red-500 to-red-600',
    sliderBg: 'from-red-200 to-red-300',
    sliderAccent: 'accent-red-600',
    emoji: '🔴',
    discount: 0,
  };
};

// Hook — detects touch/mouse device
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isTouch;
}

function CalculatorComponent() {
  const isTouch = useIsTouchDevice();
  const cardRef = useRef(null);
  const [mobileInFocus, setMobileInFocus] = useState(false);
  const [shimmerKey, setShimmerKey] = useState(0);

  useEffect(() => {
    if (!isTouch || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const focused = entry.isIntersecting && entry.intersectionRatio > 0.5;
        setMobileInFocus(focused);
        if (focused) setShimmerKey(k => k + 1);
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isTouch]);

  const [selected, setSelected] = useState(MATERIALS[0]);
  const [area, setArea] = useState(10);
  const [depth, setDepth] = useState(5);
  const [km, setKm] = useState(5);
  const [isCalculating, setIsCalculating] = useState(false);
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [packaging, setPackaging] = useState('luzem');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      formData.append('access_key', "bc9c7b48-47c4-45a9-a0e7-8321221ad9ad");
      formData.append('subject', 'Nowe zamówienie GRANTECO – ' + selected.name);
      // Dane kalkulatora
      formData.append('Material', selected.name);
      formData.append('Waga_tony', weight + ' t');
      formData.append('Koszt_materialu', matCost + ' zł');
      formData.append('Koszt_transportu', transCost === 0 ? 'GRATIS' : transCost + ' zł');
      if (packaging === 'bigbag') {
        formData.append('Pakowanie_BIG_BAG', bigBagQuantity + ' worki = ' + bigBagCost + ' zł');
      }
      formData.append('RAZEM_BRUTTO', totalCost + ' zł');
      // Debug — usuń po weryfikacji
      console.log('📦 Dane zamówienia:', Object.fromEntries(formData));
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('✅ Zamówienie zostało przyjęte! Skontaktujemy się z Tobą wkrótce w celu potwierdzenia dostawy. Dziękujemy!');
        e.target.reset();
        setIsOrderModalOpen(false);
      } else {
        alert('❌ Wystąpił błąd: ' + (data.message || 'Nieznany błąd. Spróbuj ponownie lub zadzwoń: 662 333 188.'));
      }
    } catch (err) {
      alert('❌ Błąd połączenia. Sprawdź internet lub zadzwoń do nas: 662 333 188.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const debounceTimer = useRef(null);

  const weight = parseFloat(
    (area * (depth / 100) * selected.density).toFixed(2)
  );
  const weightInKg = weight * 1000;
  const isSand = selected.id === 10;
  const minimumWeight = isSand ? 1000 : 500;
  const isUnderMinimum = weightInKg < minimumWeight;
  const isOverWeight = weight > 7;

  const transport = isSand
    ? getSandTransportCalculation(Number(km), weightInKg)
    : getTransportCalculation(Number(km), weightInKg);

  const transCost = transport.price;
  const materialDiscount = transport.discount || 0;
  const matCostBeforeDiscount = parseInt(
    (weight * selected.price).toFixed(0),
    10
  );
  const discountAmount = Math.round(
    matCostBeforeDiscount * (materialDiscount / 100)
  );
  const matCost = matCostBeforeDiscount - discountAmount;
  const bigBagQuantity = Math.ceil(weight);
  const bigBagCost = packaging === 'bigbag' ? bigBagQuantity * 120 : 0;
  const totalCost = matCost + transCost + bigBagCost;

  const handleChange = (callback) => {
    setIsCalculating(true);
    callback();
    setTimeout(() => setIsCalculating(false), 300);
  };

  const fetchAddressSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          query
        )}&countrycodes=pl&limit=7&dedupe=1`,
        { headers: { 'User-Agent': 'GrantecoCalculator/1.0' } }
      );
      const data = await response.json();
      setAddressSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setAddressError('');
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(
      () => fetchAddressSuggestions(value),
      500
    );
  };

  const handleSelectAddress = (suggestion) => {
    setAddress(suggestion.display_name);
    setShowSuggestions(false);
    setAddressSuggestions([]);
    const userLat = parseFloat(suggestion.lat);
    const userLon = parseFloat(suggestion.lon);
    const distance = calculateDistance(
      COMPANY_LOCATION.lat,
      COMPANY_LOCATION.lon,
      userLat,
      userLon
    );
    if (distance > 100) {
      setAddressError(
        '📍 Bardzo duża odległość – skontaktuj się z nami w celu indywidualnej wyceny'
      );
      return;
    }
    handleChange(() => setKm(distance));
    setAddressError('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.address-autocomplete')) setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const zoneGuide = isSand
    ? [
        { emoji: '🟢', range: '0–10 km: 1t', price: '130 zł' },
        { emoji: '🟢', range: '0–10 km: 2t', price: '100 zł' },
        { emoji: '🟢', range: '0–10 km: 3t', price: '50 zł' },
        { emoji: '🟢', range: '0–10 km: 4t', price: '40 zł' },
        { emoji: '🟢', range: '0–10 km: 5t', price: 'GRATIS' },
        { emoji: '🟢', range: '0–10 km: 6t', price: 'GRATIS -5%' },
        { emoji: '🟢', range: '0–10 km: 7t', price: 'GRATIS -10%' },
        { emoji: '🟡', range: '11–20 km: 1t', price: '150 zł' },
        { emoji: '🟡', range: '11–20 km: 2t', price: '120 zł' },
        { emoji: '🟡', range: '11–20 km: 3t', price: '70 zł' },
        { emoji: '🟡', range: '11–20 km: 4t', price: '60 zł' },
        { emoji: '🟡', range: '11–20 km: 5t', price: '20 zł' },
        { emoji: '🟡', range: '11–20 km: 6-7t', price: 'GRATIS' },
        { emoji: '🔴', range: '> 20 km', price: 'BRAK DOWOZU' },
      ]
    : [
        { emoji: '🟢', range: '0–10 km (≥1000 kg)', price: 'GRATIS' },
        { emoji: '🟢', range: '0–10 km (< 1000 kg)', price: '50 zł' },
        { emoji: '🟡', range: '11–20 km', price: '70 zł' },
        { emoji: '🟠', range: '21–30 km', price: '120 zł' },
        { emoji: '🔴', range: '> 30 km', price: '6 zł/km' },
      ];

  return (
    <>
    <Tilt
      tiltEnable={!isTouch}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.02}
      transitionSpeed={2000}
      glareEnable={!isTouch}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="24px"
    >
      {/* ── GŁÓWNY KONTENER — ciemny grafit ── */}
      <div
        ref={cardRef}
        key={shimmerKey}
        className={`bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-700/60 shadow-2xl shadow-slate-950/50 transition-all duration-500 mobile-focus-card shimmer-card${mobileInFocus ? ' in-focus' : ''}`}
      >

        {/* ── NAGŁÓWEK ── */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-700/50">
          <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
            <Calculator size={22} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">GRANTECO</p>
            <h2 className="text-white font-black text-lg leading-tight">Kalkulator Zamówienia</h2>
          </div>
          <div className="ml-auto text-xs text-slate-600 font-mono bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            v2.0
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* ════════════════════════════════
              LEWA KOLUMNA — DANE WEJŚCIOWE
          ════════════════════════════════ */}
          <div className="space-y-5">

            {/* Wybór materiału */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-widest flex items-center gap-2">
                <Circle size={10} className="text-amber-400 fill-amber-400" />
                Wybierz materiał
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-800 border border-slate-700 text-white font-semibold p-3 md:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-700 transition-all appearance-none cursor-pointer hover:border-slate-600"
                  onChange={(e) =>
                    handleChange(() =>
                      setSelected(MATERIALS.find((m) => m.id == e.target.value))
                    )
                  }
                >
                  {MATERIALS.map((m) => (
                    <option key={m.id} value={m.id} className="bg-slate-800">
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Powierzchnia + Grubość */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-widest flex items-center gap-1">
                  <Zap size={12} className="text-amber-400" />
                  Powierzchnia
                </label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => handleChange(() => setArea(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 text-white font-bold p-3 md:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-700 text-center transition-all hover:border-slate-600"
                />
                <p className="text-xs text-slate-400 mt-1 text-center font-mono">m²</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-widest flex items-center gap-1">
                  <Zap size={12} className="text-amber-400" />
                  Grubość
                </label>
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => handleChange(() => setDepth(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 text-white font-bold p-3 md:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-700 text-center transition-all hover:border-slate-600"
                />
                <p className="text-xs text-slate-400 mt-1 text-center font-mono">cm</p>
              </div>
            </div>

            {/* Sposob pakowania */}
            <div className="mt-1">
              <label className="block text-sm font-medium text-slate-300 mb-2">Sposób pakowania i rozładunku</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPackaging('luzem')}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${packaging === 'luzem' ? 'bg-blue-900/40 border-blue-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                >
                  <span className="font-bold">Luzem (Wywrotka)</span>
                  <span className="text-xs opacity-70">Brak dopłat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPackaging('bigbag')}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${packaging === 'bigbag' ? 'bg-amber-900/40 border-amber-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                >
                  <span className="font-bold">Worki BIG-BAG (HDS)</span>
                  <span className="text-xs opacity-70">+120 zł / tonę</span>
                </button>
              </div>
              {packaging === 'bigbag' && (
                <div className="mt-3">
                  <p className="text-[11px] text-amber-400/80 leading-tight mb-2">
                    * Koszt 120 zł obejmuje: 70 zł usługa rozładunku HDS + 50 zł kaucja zwrotna za nienaruszony worek.
                  </p>
                  {weight > 2 && (
                    <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p>Przekroczono maksymalną ilość realizowaną w workach BIG-BAG w ramach jednego transportu (max 2 tony).</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Adres dostawy */}
            <div className="address-autocomplete bg-slate-800/60 border border-slate-700 p-4 rounded-2xl relative">
              <label className="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} className="text-amber-400" />
                Adres dostawy
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Wpisz dokładny adres (ulica, numer, miejscowość)"
                  className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-700 transition-all text-sm placeholder:text-slate-600"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">
                  {isLoadingSuggestions ? (
                    <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <MapPin size={16} />
                  )}
                </div>
              </div>
              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute left-4 right-4 mt-2 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 z-50 max-h-64 overflow-y-auto">
                  {addressSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAddress(s)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0 flex items-start gap-3"
                    >
                      <MapPin size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{s.display_name}</span>
                    </button>
                  ))}
                </div>
              )}
              {addressError && (
                <div className="mt-3 p-3 bg-orange-500/10 border-l-4 border-orange-500 rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-orange-300 text-xs font-medium">{addressError}</p>
                </div>
              )}
              <p className="text-xs text-slate-400 mt-2">
                💡 Zacznij pisać adres — odległość zostanie obliczona automatycznie od {COMPANY_LOCATION.name}
              </p>
            </div>

            {/* Suwak odległości */}
            <div className={`p-4 md:p-5 rounded-2xl bg-slate-800/60 border border-slate-700 transition-all duration-500`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Truck size={18} className={transport.color} />
                  <span className="font-bold text-xs uppercase tracking-widest text-slate-300">
                    Odległość dostawy
                  </span>
                </div>
                <span className={`${transport.color} font-black text-2xl`}>{km} km</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={km}
                disabled={address.length > 0}
                onChange={(e) => handleChange(() => setKm(e.target.value))}
                className={`w-full h-3 bg-gradient-to-r ${transport.sliderBg} rounded-full appearance-none cursor-pointer ${transport.sliderAccent} hover:h-4 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed`}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                <span>0</span><span>10</span><span>20</span><span>30</span><span>50</span><span>100</span>
              </div>
              {address.length > 0 && (
                <p className="text-xs text-amber-400 mt-2 flex items-center gap-1.5">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  Suwak zablokowany — odległość obliczona na podstawie adresu dostawy.
                </p>
              )}

              <div className="mt-4 text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border ${transport.border}`}>
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${transport.gradientBg}`}></div>
                  <span className={`font-black text-sm ${transport.color}`}>STREFA {transport.zoneName}</span>
                </div>
                <p className={`${transport.color} font-bold text-base mt-2`}>
                  {transport.price === 0 ? '🎉 TRANSPORT GRATIS!' : `Transport: ${transport.label}`}
                </p>
                {Number(km) <= 10 && !isSand && (
                  <p className="text-xs text-slate-500 mt-1">
                    {weightInKg >= 1000
                      ? '✅ Warunek GRATIS spełniony (≥1000 kg)'
                      : `⚠️ GRATIS od 1000 kg (teraz: ${Math.round(weightInKg)} kg)`}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  {isSand ? 'Cennik transportu Piasek 0/2:' : 'Strefy dowozu:'}
                </p>
                <div className="space-y-1 text-xs text-slate-400">
                  {zoneGuide.map((z, idx) => (
                    <div key={idx} className="flex justify-between gap-2">
                      <span>{z.emoji} {z.range}</span>
                      <span className="font-bold text-slate-300 flex-shrink-0">{z.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════
              PRAWA KOLUMNA — PODSUMOWANIE
          ════════════════════════════════ */}
          <div className="bg-slate-950 rounded-2xl p-5 md:p-7 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Subtelna poświata */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Mini nagłówek */}
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-slate-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Podsumowanie</p>
              </div>
              <h3 className="text-lg md:text-2xl font-black mb-5 text-white leading-tight">{selected.name}</h3>

              {isUnderMinimum ? (
                <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={24} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-black text-amber-400 mb-1">
                        Min. zamówienie: {minimumWeight} kg
                      </h4>
                      <p className="text-slate-400 text-sm">
                        Aktualna waga: <strong className="text-white">{Math.round(weightInKg)} kg</strong>
                      </p>
                      {isSand ? (
                        <p className="text-slate-400 text-xs mt-2">💡 Możliwy tylko odbiór z placu (100 zł/t)</p>
                      ) : (
                        <p className="text-slate-400 text-xs mt-2">Zwiększ powierzchnię lub grubość warstwy.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : isOverWeight || (isSand && transport.tooFar) ? (
                <div className="space-y-4">
                  <div className="bg-orange-500/10 border border-orange-500/30 p-5 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={24} className="text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        {isSand && transport.tooFar ? (
                          <>
                            <h4 className="text-base font-black text-orange-400 mb-1">Piasek 0/2 — dostawa do 20 km</h4>
                            <p className="text-slate-400 text-sm">Odległość: <strong className="text-white">{km} km</strong></p>
                            <p className="text-slate-400 text-xs mt-2">💡 Możliwy tylko odbiór z placu — 100 zł/t</p>
                          </>
                        ) : (
                          <>
                            <h4 className="text-base font-black text-orange-400 mb-1">Zamówienie powyżej 7 ton</h4>
                            <p className="text-slate-400 text-sm">Waga: <strong className="text-white">{weight} t</strong></p>
                            <p className="text-slate-400 text-xs mt-2">📞 Wycena indywidualna – zapraszamy do kontaktu</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:662333188"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Phone size={16} />
                    Zadzwoń: 662-333-188
                  </a>
                  <a
                    href="mailto:biuro@granteco.pl"
                    className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    biuro@granteco.pl
                  </a>
                </div>
              ) : (
                <>
                  {/* Tabela pozycji */}
                  <div className="mb-6 rounded-xl overflow-hidden border border-slate-700/60">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/60 bg-slate-800/40">
                      <span className="text-slate-300 text-sm">Waga materiału</span>
                      <span className="font-bold text-white">{weight} t</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/60">
                      <span className="text-slate-300 text-sm">Cena materiału</span>
                      <div className="text-right">
                        {materialDiscount > 0 && (
                          <div className="text-xs text-slate-500 line-through">{matCostBeforeDiscount} zł</div>
                        )}
                        <span className="font-bold text-white">
                          {matCost} zł
                          {materialDiscount > 0 && <span className="text-xs text-green-400 ml-1">(-{materialDiscount}%)</span>}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/60 bg-slate-800/40">
                      <span className="text-slate-300 text-sm">Koszt transportu</span>
                      <span className="font-bold">
                        {transCost === 0
                          ? <span className="text-green-400 text-sm">✨ GRATIS</span>
                          : <span className="text-white">{transCost} zł</span>}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-3">
                      <span className="text-slate-300 text-sm">Strefa</span>
                      <span className={`text-sm font-semibold ${transport.color}`}>
                        {transport.emoji} {transport.zoneName}
                      </span>
                    </div>
                    {packaging === 'bigbag' && (
                      <div className="flex justify-between items-center px-4 py-3 border-t border-slate-700/60 bg-amber-900/10">
                        <span className="text-amber-300 text-sm">BIG-BAG x{bigBagQuantity} worki</span>
                        <span className="font-bold text-amber-300">{bigBagCost} zł</span>
                      </div>
                    )}
                  </div>

                  {/* Razem — duże cyfry z bursztynową poświatą */}
                  <div className="relative bg-slate-800/80 border border-slate-700 rounded-2xl p-5 mb-5 overflow-hidden">
                    <div className="absolute inset-0 bg-amber-500/5 rounded-2xl"></div>
                    <div className="relative z-10 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Razem do zapłaty</p>
                        <p className="text-slate-400 text-xs mt-0.5">{area} m² · {depth} cm · {km} km</p>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                          {totalCost}
                        </span>
                        <span className="text-xl font-bold text-amber-400 ml-1">zł</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA — zamów */}
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    disabled={packaging === 'bigbag' && weight > 2}
                    className="relative w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl font-bold text-white/95 overflow-hidden group transition-all duration-500 ease-in-out hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: 'radial-gradient(ellipse at 40% 30%, rgba(100,75,15,0.8) 0%, rgba(35,25,5,0.97) 55%, rgba(12,8,2,1) 100%)',
                      boxShadow: '0 0 0 1px rgba(200,155,40,0.25), 0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,100,0.2), inset 0 0 35px rgba(180,120,20,0.18)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(245,158,11,0.4) 0%, transparent 65%)', boxShadow: 'inset 0 0 40px rgba(245,158,11,0.2)' }}></span>
                    <span className="absolute inset-[-2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 16px rgba(245,158,11,0.3), 0 0 35px rgba(245,158,11,0.12)' }}></span>
                    <span className="absolute top-1.5 left-6 right-6 h-2 rounded-full bg-white/20 blur-sm pointer-events-none"></span>
                    <Package size={18} className="relative z-10 text-amber-300 group-hover:text-white transition-colors duration-300" />
                    <span className="relative z-10 tracking-wide">Zamów teraz</span>
                    <ArrowRight size={18} className="relative z-10 animate-pulse" />
                  </button>

                  {/* Szczegóły — z cienkimi liniami */}
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/60">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700/60">
                      <Package size={13} className="text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Szczegóły zamówienia</span>
                    </div>
                    {[
                      { k: 'Materiał', v: selected.name },
                      { k: 'Powierzchnia', v: `${area} m²` },
                      { k: 'Grubość', v: `${depth} cm` },
                      { k: 'Waga', v: `${weight} t` },
                      { k: 'Pakowanie', v: packaging === 'bigbag' ? `BIG-BAG x${bigBagQuantity} (${bigBagCost} zł)` : 'Luzem (wywrotka)' },
                      { k: 'Odległość', v: `${km} km (${transport.zoneName})` },
                      { k: 'Transport', v: transCost === 0 ? '✨ GRATIS' : `${transCost} zł` },
                      { k: 'Łącznie', v: `${totalCost} zł` },
                    ].map((r, i, arr) => (
                      <div
                        key={r.k}
                        className={`flex justify-between items-center px-4 py-2.5 text-xs ${i % 2 === 0 ? 'bg-slate-800/40' : ''} ${i < arr.length - 1 ? 'border-b border-slate-700/50' : ''} ${i === arr.length - 1 ? 'border-t-2 border-slate-600' : ''}`}
                      >
                        <span className="text-slate-400">{r.k}:</span>
                        <span className={`font-semibold text-right ml-2 ${i === arr.length - 1 ? 'text-amber-400 font-black' : 'text-slate-200'}`}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

    {/* --- MODAL FORMULARZA ZAMOWIENIA --- */}
    {isOrderModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl relative my-8 overflow-hidden border border-slate-200">

          {/* Nagłówek */}
          <div className="bg-blue-900 p-6 md:p-8 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-1">Finalizacja zamówienia</h2>
              <p className="text-blue-200 text-sm">Uzupełnij dane, aby przekazać zamówienie do realizacji</p>
            </div>
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="relative z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleOrderSubmit}>
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">

            {/* Kolumna lewa: Formularz */}
            <div className="flex-1 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Imię i nazwisko / Firma *</label>
                  <input type="text" name="Imie_i_nazwisko" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" placeholder="np. Jan Kowalski" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">NIP (opcjonalnie dla FV)</label>
                  <input type="text" name="NIP" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" placeholder="np. 1234567890" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefon kontaktowy *</label>
                  <input type="tel" name="Telefon" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" placeholder="+48 000 000 000" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Adres e-mail *</label>
                  <input type="email" name="email" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" placeholder="adres@domena.pl" required />
                </div>
              </div>

              {/* Sekcja Adresu (JEDNO, PEŁNE POLE) */}
              <div className="relative mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-1">Dokładny adres dostawy *</label>
                <input
                  type="text"
                  name="Adres_dostawy"
                  defaultValue={address}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  placeholder="Miejscowość, ulica, nr budynku/lokalu"
                  required
                />
                <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                  <Check size={12} /> Uzupełniono automatycznie z kalkulatora (możesz edytować w razie potrzeby)
                </p>
              </div>

              {/* Sekcja Daty i Godziny Dostawy */}
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl space-y-3 mb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Data dostawy *</label>
                    <input
                      type="date"
                      name="Data_dostawy"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferowana godzina *</label>
                    <input
                      type="time"
                      name="Preferowana_godzina"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-amber-600 flex items-start gap-1.5 font-medium">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>Dostawy realizujemy: <strong className="text-slate-800">Pn-Pt (9:00 - 15:00)</strong> oraz w <strong className="text-slate-800">Soboty (9:00 - 12:00)</strong>. W przypadku innej godziny, skontaktujemy się w celu ustaleń.</span>
                </p>
              </div>

              {/* Uwagi */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Uwagi do zamówienia / Wskazówki dojazdu</label>
                <textarea
                  name="Uwagi"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all min-h-[80px]"
                  placeholder="np. Proszę dzwonić 30 min przed dostawą, wjazd od strony lasu..."
                ></textarea>
              </div>

              {/* Legenda */}
              <p className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-100 mb-4">
                * - pole obowiązkowe
              </p>
            </div>

            {/* Kolumna prawa: Podsumowanie i zgody */}
            <div className="w-full md:w-72 flex flex-col">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5">
                <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Twoje zamówienie</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Materiał:</span>
                    <span className="font-medium text-slate-800 text-right ml-2">{selected.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Waga:</span>
                    <span className="font-medium text-slate-800">{weight} t</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Wartość towaru:</span>
                    <span className="font-medium text-slate-800">{matCost} zł</span>
                  </div>
                  <div className="flex justify-between text-slate-600 pb-3 border-b border-slate-200">
                    <span>Koszty dostawy:</span>
                    <span className="font-medium text-slate-800">
                      {transCost === 0 ? <span className="text-emerald-600">GRATIS</span> : `${transCost} zł`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 italic mt-1 mb-1 leading-relaxed">
                    Szacunkowy koszt transportu. Ze względu na warunki dojazdu, ostateczna cena dostawy zostanie potwierdzona przez naszego pracownika.
                  </p>
                  {packaging === 'bigbag' && (
                    <div className="flex justify-between text-slate-600 pb-3 border-b border-slate-200">
                      <span>BIG-BAG x{bigBagQuantity} worki:</span>
                      <span className="font-medium text-amber-700">{bigBagCost} zł</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-slate-700">Razem brutto:</span>
                    <span className="text-xl font-black text-blue-900">{totalCost} zł</span>
                  </div>
                </div>
              </div>

              {/* Zgody prawne */}
              <div className="space-y-3 mb-5">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-900 bg-slate-100 border-slate-300 rounded focus:ring-blue-900" required />
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed">
                    Akceptuję{' '}
                    <button
                      type="button"
                      onClick={() => setLegalModal('regulamin')}
                      className="text-blue-700 underline hover:text-blue-900 transition-colors font-medium"
                    >Regulamin</button>
                    {' '}oraz potwierdzam zapoznanie się z{' '}
                    <button
                      type="button"
                      onClick={() => setLegalModal('polityka')}
                      className="text-blue-700 underline hover:text-blue-900 transition-colors font-medium"
                    >Polityką Prywatności</button>. *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-900 bg-slate-100 border-slate-300 rounded focus:ring-blue-900" required />
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji zamówienia. *
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || (packaging === 'bigbag' && weight > 2)}
                className="w-full inline-flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-4 rounded-xl font-black shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide text-sm mt-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Zamawiam z obowiązkiem zapłaty
                  </>
                )}
              </button>
              <input type="hidden" name="Sposob_pakowania" value={packaging === 'bigbag' ? `BIG-BAG (${bigBagQuantity} worki = ${bigBagCost} zl)` : 'Luzem (wywrotka)'} />

              <p className="text-[10px] text-slate-400 text-center mt-3 leading-relaxed">
                Płatność następuje u kierowcy (gotówka/karta) w momencie dostawy towaru.
              </p>
            </div>
          </div>
          </form>
        </div>
      </div>
    )}
    {/* --- KONIEC MODALA --- */}
      </div>
    </Tilt>
    </>
  );
}