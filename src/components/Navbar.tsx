import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ProfileTab = 'timeline' | 'about' | 'experience' | 'education' | 'skills' | 'contact';

interface NavbarProps {
  onOpenCVModal: (initialTab?: 'pdf' | 'print') => void;
  onSelectNav: (tab: ProfileTab, targetId?: string) => void;
}

const navLinks: { label: string; tab: ProfileTab; targetId: string }[] = [
  { label: 'Profile', tab: 'timeline', targetId: 'profile-header' },
  { label: 'Experience', tab: 'experience', targetId: 'profile-tabs' },
  { label: 'Education', tab: 'education', targetId: 'profile-tabs' },
  { label: 'Skills', tab: 'skills', targetId: 'profile-tabs' },
  { label: 'Contact', tab: 'contact', targetId: 'profile-tabs' },
];

export default function Navbar({ onOpenCVModal, onSelectNav }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-800/80 bg-[#070B14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
        <a
          href="#profile-header"
          onClick={(e) => {
            e.preventDefault();
            onSelectNav('timeline', 'profile-header');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          Rafi Rahman
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectNav(link.tab, link.targetId);
              }}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenCVModal('print')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition-colors duration-150 hover:bg-slate-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 cursor-pointer"
          >
            View &amp; Print CV
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/80 text-slate-200 transition-colors hover:bg-white/5 md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-800/80 bg-[#0B111E] px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.targetId}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  onSelectNav(link.tab, link.targetId);
                }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-300"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenCVModal('print');
              }}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200 cursor-pointer"
            >
              View &amp; Print CV
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
