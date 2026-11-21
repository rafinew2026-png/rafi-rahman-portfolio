import { useEffect, useState } from 'react';
import { Download, FileText, Printer, X } from 'lucide-react';
import type { CVData } from '../types/cv';
import PrintCVSheet from './PrintCVSheet';

interface CVModalProps {
  isOpen: boolean;
  initialTab: 'pdf' | 'print';
  cv: CVData;
  onClose: () => void;
  onDownloadPdf: () => void;
}

export default function CVModal({
  isOpen,
  initialTab,
  cv,
  onClose,
  onDownloadPdf,
}: CVModalProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'print'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CV Viewer and Print View"
      className="no-print fixed inset-0 z-50 flex flex-col bg-[#04070E]/95 backdrop-blur-md"
    >
      {/* Modal Toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#081022] px-6 py-3.5">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#04070E] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('print')}
            className={`inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'print'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Print-Friendly CV
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'pdf'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Original CV PDF
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-600/20 px-3.5 py-2 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-600/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Download Original PDF
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('print');
              setTimeout(() => window.print(), 80);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            Print CV
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close CV viewer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {activeTab === 'print' ? (
          <PrintCVSheet cv={cv} />
        ) : (
          <div className="mx-auto flex h-full min-h-[78vh] max-w-5xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0A1326]">
            {cv.originalPdfUrl && (
              <iframe
                src={cv.originalPdfUrl}
                title="Rafi Rahman Original CV PDF"
                className="h-full min-h-[78vh] w-full bg-white"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
