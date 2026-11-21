export type ThemeId = 'itpro' | 'cobalt' | 'light' | 'emerald';

export interface PortfolioTheme {
  id: ThemeId;
  label: string;
  swatch: string;
  canvas: string;
  navbar: string;
  navLink: string;
  navCta: string;
  card: string;
  cardHover: string;
  inset: string;
  divider: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentText: string;
  accentLink: string;
  accentBar: string;
  progressGradient: string;
  primaryBtn: string;
  secondaryBtn: string;
  ghostBtn: string;
  iconBox: string;
  avatarRing: string;
  timelineDotBorder: string;
  timelineDotFill: string;
  timelineLine: string;
  activeTabText: string;
  activeSkillTab: string;
  inputField: string;
  endorseActive: string;
  coverScrim: string;
}

export const portfolioThemes: Record<ThemeId, PortfolioTheme> = {
  itpro: {
    id: 'itpro',
    label: 'IT Pro Cyan',
    swatch: '#06B6D4',
    canvas: 'bg-[#06090F] text-slate-100',
    navbar: 'border-slate-800/90 bg-[#090E17]/92',
    navLink: 'text-slate-300 hover:text-cyan-300',
    navCta: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
    card: 'border-slate-800/90 bg-[#0D131F]',
    cardHover: 'hover:border-cyan-500/40',
    inset: 'border-slate-800/90 bg-[#070B13]',
    divider: 'border-slate-800/80',
    border: 'border-slate-800/90',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    accentText: 'text-cyan-400',
    accentLink: 'text-slate-200 decoration-cyan-400/50 hover:text-cyan-300',
    accentBar: 'bg-cyan-400',
    progressGradient: 'from-cyan-500 via-sky-400 to-blue-500',
    primaryBtn: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
    secondaryBtn: 'border-slate-700/80 bg-[#131C2E] text-white hover:border-cyan-400/50 hover:bg-[#19253C]',
    ghostBtn: 'border-slate-700/80 bg-transparent text-slate-200 hover:bg-white/5 hover:text-white',
    iconBox: 'border-slate-700/70 bg-[#131C2E] text-cyan-400',
    avatarRing: 'border-[#0D131F] ring-cyan-400/60',
    timelineDotBorder: 'border-cyan-400/60 bg-[#131C2E]',
    timelineDotFill: 'bg-cyan-400',
    timelineLine: 'before:bg-slate-800',
    activeTabText: 'text-cyan-400',
    activeSkillTab: 'bg-cyan-500 text-slate-950 font-semibold',
    inputField: 'border-slate-700/80 bg-[#0D131F] text-white placeholder:text-slate-500 focus:border-cyan-400',
    endorseActive: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40',
    coverScrim: 'from-[#06090F]/95 via-[#0D131F]/35 to-transparent',
  },
  cobalt: {
    id: 'cobalt',
    label: 'Enterprise Cobalt',
    swatch: '#3B82F6',
    canvas: 'bg-[#050811] text-slate-100',
    navbar: 'border-slate-800/80 bg-[#080E1C]/92',
    navLink: 'text-slate-300 hover:text-blue-300',
    navCta: 'bg-blue-600 text-white hover:bg-blue-500',
    card: 'border-slate-800/90 bg-[#0B1222]',
    cardHover: 'hover:border-blue-500/40',
    inset: 'border-slate-800/90 bg-[#070B16]',
    divider: 'border-slate-800/80',
    border: 'border-slate-800/90',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    accentText: 'text-blue-400',
    accentLink: 'text-slate-200 decoration-blue-400/50 hover:text-blue-300',
    accentBar: 'bg-blue-500',
    progressGradient: 'from-blue-600 to-sky-400',
    primaryBtn: 'bg-blue-600 text-white hover:bg-blue-500',
    secondaryBtn: 'border-slate-700/80 bg-[#121D36] text-white hover:border-blue-400/50 hover:bg-[#182647]',
    ghostBtn: 'border-slate-700/80 bg-transparent text-slate-200 hover:bg-white/5 hover:text-white',
    iconBox: 'border-slate-700/70 bg-[#121D36] text-blue-400',
    avatarRing: 'border-[#0B1222] ring-blue-500/55',
    timelineDotBorder: 'border-blue-400/50 bg-[#121D36]',
    timelineDotFill: 'bg-blue-400',
    timelineLine: 'before:bg-slate-800',
    activeTabText: 'text-blue-400',
    activeSkillTab: 'bg-blue-600 text-white font-semibold',
    inputField: 'border-slate-700/80 bg-[#0B1222] text-white placeholder:text-slate-500 focus:border-blue-400',
    endorseActive: 'bg-blue-500/15 text-blue-300 border-blue-400/35',
    coverScrim: 'from-[#050811]/95 via-[#0B1222]/35 to-transparent',
  },
  light: {
    id: 'light',
    label: 'White & Navy',
    swatch: '#0F172A',
    canvas: 'bg-[#F0F2F5] text-slate-900',
    navbar: 'border-slate-200 bg-white/95',
    navLink: 'text-slate-600 hover:text-[#0A192F]',
    navCta: 'bg-[#0A192F] text-white hover:bg-[#13294B]',
    card: 'border-slate-200 bg-white shadow-sm',
    cardHover: 'hover:border-slate-300',
    inset: 'border-slate-200 bg-slate-50',
    divider: 'border-slate-200',
    border: 'border-slate-200',
    textPrimary: 'text-slate-950',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    accentText: 'text-blue-700',
    accentLink: 'text-slate-800 decoration-blue-700/40 hover:text-blue-700',
    accentBar: 'bg-[#0A192F]',
    progressGradient: 'from-[#0A192F] to-cyan-600',
    primaryBtn: 'bg-[#0A192F] text-white hover:bg-[#13294B]',
    secondaryBtn: 'border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200',
    ghostBtn: 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950',
    iconBox: 'border-slate-200 bg-slate-100 text-[#0A192F]',
    avatarRing: 'border-white ring-[#0A192F]/35',
    timelineDotBorder: 'border-blue-700/50 bg-blue-50',
    timelineDotFill: 'bg-blue-700',
    timelineLine: 'before:bg-slate-200',
    activeTabText: 'text-[#0A192F]',
    activeSkillTab: 'bg-[#0A192F] text-white font-semibold',
    inputField: 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0A192F]',
    endorseActive: 'bg-blue-50 text-blue-800 border-blue-300',
    coverScrim: 'from-slate-950/75 via-slate-900/20 to-transparent',
  },
  emerald: {
    id: 'emerald',
    label: 'Server Emerald',
    swatch: '#10B981',
    canvas: 'bg-[#050A09] text-slate-100',
    navbar: 'border-emerald-950/80 bg-[#080F0E]/92',
    navLink: 'text-slate-300 hover:text-emerald-300',
    navCta: 'bg-emerald-400 text-slate-950 hover:bg-emerald-300',
    card: 'border-emerald-950/80 bg-[#0C1614]',
    cardHover: 'hover:border-emerald-500/40',
    inset: 'border-emerald-950/80 bg-[#070D0C]',
    divider: 'border-emerald-950/70',
    border: 'border-emerald-950/80',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    accentText: 'text-emerald-400',
    accentLink: 'text-slate-200 decoration-emerald-400/50 hover:text-emerald-300',
    accentBar: 'bg-emerald-400',
    progressGradient: 'from-emerald-500 to-teal-300',
    primaryBtn: 'bg-emerald-400 text-slate-950 hover:bg-emerald-300',
    secondaryBtn: 'border-emerald-900/80 bg-[#12221F] text-white hover:border-emerald-400/50 hover:bg-[#182C28]',
    ghostBtn: 'border-emerald-900/80 bg-transparent text-slate-200 hover:bg-white/5 hover:text-white',
    iconBox: 'border-emerald-900/70 bg-[#12221F] text-emerald-400',
    avatarRing: 'border-[#0C1614] ring-emerald-400/55',
    timelineDotBorder: 'border-emerald-400/50 bg-[#12221F]',
    timelineDotFill: 'bg-emerald-400',
    timelineLine: 'before:bg-emerald-950',
    activeTabText: 'text-emerald-400',
    activeSkillTab: 'bg-emerald-400 text-slate-950 font-semibold',
    inputField: 'border-emerald-900/80 bg-[#0C1614] text-white placeholder:text-slate-500 focus:border-emerald-400',
    endorseActive: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/35',
    coverScrim: 'from-[#050A09]/95 via-[#0C1614]/35 to-transparent',
  },
};
