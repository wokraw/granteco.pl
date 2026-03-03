// ============================================================
// LegalModal.jsx — Modal dokumentów prawnych GRANTECO
// ============================================================
// Użycie:
//   import LegalModal from './LegalModal';
//   import { REGULAMIN, POLITYKA_PRYWATNOSCI } from './LegalContent';
//
//   const [legalModal, setLegalModal] = useState(null); // 'regulamin' | 'polityka' | null
//
//   <LegalModal
//     isOpen={legalModal !== null}
//     onClose={() => setLegalModal(null)}
//     title={legalModal === 'regulamin' ? 'Regulamin' : 'Polityka Prywatności'}
//     content={legalModal === 'regulamin' ? REGULAMIN : POLITYKA_PRYWATNOSCI}
//   />
// ============================================================

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Prosta renderujaca Markdown → HTML (bez zewnętrznych bibliotek)
function renderMarkdown(text) {
  if (!text) return '';

  const lines = text.split('\n');
  const result = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Nagłówki
    if (line.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h1 class="text-xl font-bold text-slate-800 mt-6 mb-3">${line.slice(2)}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2 class="text-base font-bold text-slate-800 mt-6 mb-2 pb-1 border-b border-slate-200">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3 class="text-sm font-semibold text-slate-700 mt-4 mb-1">${line.slice(4)}</h3>`);
      continue;
    }

    // Separator
    if (line.trim() === '---') {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push('<hr class="border-slate-200 my-4" />');
      continue;
    }

    // Elementy listy
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) { result.push('<ul class="list-disc list-outside ml-5 space-y-1">'); inList = true; }
      const content = inlineFormat(line.slice(2));
      result.push(`<li class="text-sm text-slate-600 leading-relaxed">${content}</li>`);
      continue;
    }

    // Koniec listy
    if (inList && line.trim() === '') {
      result.push('</ul>');
      inList = false;
    }

    // Pusta linia
    if (line.trim() === '') {
      result.push('<div class="mb-2"></div>');
      continue;
    }

    // Numerowane punkty (1. 2. etc.)
    const numberedMatch = line.match(/^(\d+)\. (.*)/);
    if (numberedMatch) {
      result.push(`<p class="text-sm text-slate-600 leading-relaxed mb-2"><span class="font-medium text-slate-700">${numberedMatch[1]}.</span> ${inlineFormat(numberedMatch[2])}</p>`);
      continue;
    }

    // Zwykły paragraf
    const formatted = inlineFormat(line);
    result.push(`<p class="text-sm text-slate-600 leading-relaxed mb-2">${formatted}</p>`);
  }

  if (inList) result.push('</ul>');
  return result.join('\n');
}

// Formatowanie inline: **bold**, *italic*, `code`
function inlineFormat(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded text-xs font-mono">$1</code>');
}

export default function LegalModal({ isOpen, onClose, title, content }) {
  const scrollRef = useRef(null);

  // Zamknięcie przez ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Blokada scrolla body gdy modal otwarty
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset scroll przy otwarciu
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen, content]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nagłówek */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Granteco" className="h-10 w-auto" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Dokument prawny</p>
              <h2 className="text-base font-bold text-slate-800 leading-tight">{title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors text-slate-500 hover:text-slate-800 flex-shrink-0"
            aria-label="Zamknij"
          >
            <X size={18} />
          </button>
        </div>

        {/* Treść — przewijalna */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-5 overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>

        {/* Stopka z przyciskiem */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <p className="text-[11px] text-slate-400 text-center mb-3">
            GRANTECO Piotr Krawiec · ul. Poznańska 28, 62-090 Mrowino · NIP: 7771313433
          </p>
          <button
            onClick={onClose}
            className="w-full min-h-[48px] bg-blue-900 hover:bg-blue-800 active:bg-blue-950 active:scale-[0.99] text-white font-bold rounded-xl transition-all duration-200 text-sm tracking-wide"
          >
            Rozumiem i zamykam
          </button>
        </div>
      </div>
    </div>
  );
}