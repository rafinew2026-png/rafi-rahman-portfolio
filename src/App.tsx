import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import {
  Award,
  Bookmark,
  Briefcase,
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Heart,
  Languages,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  PenTool,
  Phone,
  Printer,
  Send,
  ThumbsUp,
  User,
  X,
} from 'lucide-react';
import Navbar, { type ProfileTab } from './components/Navbar';
import CVModal from './components/CVModal';
import PrintCVSheet from './components/PrintCVSheet';
import { initialCVData } from './data/cvData';

type SkillFilter = 'All' | 'Computer Skills' | 'Specialization' | 'Languages';

const COVER_BANNER_PATH = '/src/assets/images/cover_it_support_desk_1795255100200.jpg';

const profileTabs: { id: ProfileTab; label: string }[] = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const cv = initialCVData;
  const [activeTab, setActiveTab] = useState<ProfileTab>('timeline');
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvModalTab, setCvModalTab] = useState<'pdf' | 'print'>('print');
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('All');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  // Smooth top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(cv.contact.email)}`;
  const whatsappDigits = cv.contact.phone.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;
  const telHref = `tel:${cv.contact.phone.replace(/\s+/g, '')}`;

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField((prev) => (prev === field ? null : prev)), 2000);
    } catch {
      // Clipboard fallback ignored if blocked by permissions
    }
  };

  const openExternalLink = (url: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDownloadPdf = () => {
    if (!cv.originalPdfUrl) return;
    const link = document.createElement('a');
    link.href = cv.originalPdfUrl;
    link.download = cv.originalPdfFilename || 'Rafi_Rahman_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenModal = (tab: 'pdf' | 'print' = 'print') => {
    setCvModalTab(tab);
    setCvModalOpen(true);
  };

  const handlePrintCV = () => {
    window.print();
  };

  const handleSelectNav = (tab: ProfileTab, targetId?: string) => {
    setActiveTab(tab);
    if (targetId) {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) {
      setFormFeedback('Please fill in your name, email address, and message.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${messageText.trim()}`
    );
    openExternalLink(`${gmailComposeUrl}&su=${subject}&body=${body}`);
    setFormFeedback(`Opening Gmail compose box to ${cv.contact.email}.`);
    setSenderName('');
    setSenderEmail('');
    setMessageText('');
  };

  const handleSendWhatsApp = () => {
    if (!senderName.trim() || !messageText.trim()) {
      setFormFeedback('Please enter your name and message to send via WhatsApp.');
      return;
    }
    const text = encodeURIComponent(
      `Hello Rafi Rahman,\nName: ${senderName.trim()}${senderEmail.trim() ? `\nEmail: ${senderEmail.trim()}` : ''}\n\n${messageText.trim()}`
    );
    openExternalLink(`${whatsappUrl}?text=${text}`);
    setFormFeedback(`Opening WhatsApp chat with ${cv.contact.phone}.`);
  };

  const combinedSkills = [
    ...cv.computerSkills,
    ...cv.specialization,
    ...cv.languages,
  ];
  const visibleSkills =
    skillFilter === 'All'
      ? combinedSkills
      : combinedSkills.filter((item) => item.category === skillFilter);

  const showAbout = activeTab === 'timeline' || activeTab === 'about';
  const showExperience = activeTab === 'timeline' || activeTab === 'experience';
  const showEducation = activeTab === 'timeline' || activeTab === 'education';
  const showSkills = activeTab === 'timeline' || activeTab === 'skills';
  const showContact = activeTab === 'timeline' || activeTab === 'contact';

  const PostHeader = ({
    title,
    subtitle,
    icon,
  }: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }) => (
    <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
      <div className="flex items-center gap-3.5">
        <motion.button
          type="button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() =>
            cv.photoUrl &&
            setLightboxImage({
              src: cv.photoUrl,
              caption: `${cv.name} — IT Support Specialist`,
            })
          }
          className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-600/80 bg-white cursor-pointer ring-2 ring-sky-400/20"
          aria-label="View profile photograph"
        >
          {cv.photoUrl && (
            <img
              src={cv.photoUrl}
              alt={cv.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top"
            />
          )}
        </motion.button>
        <div>
          <h3 className="text-base font-bold text-white leading-snug">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700/70 bg-[#111A2E] text-sky-400">
        {icon}
      </div>
    </div>
  );

  const PostFooterActions = ({ postId }: { postId: string }) => {
    const liked = !!likedPosts[postId];
    const saved = !!savedPosts[postId];
    return (
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3.5 text-xs">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => toggleLike(postId)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors cursor-pointer ${
              liked
                ? 'bg-sky-500/15 text-sky-300 border border-sky-400/35'
                : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            {liked ? 'Endorsed' : 'Endorse'}
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => toggleSave(postId)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors cursor-pointer ${
              saved
                ? 'bg-sky-500/15 text-sky-300 border border-sky-400/35'
                : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            {saved ? 'Bookmarked' : 'Bookmark'}
          </motion.button>
        </div>

        <button
          type="button"
          onClick={() => handleOpenModal('pdf')}
          className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-sky-300 cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5" />
          Verify in Original CV
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="no-print min-h-screen bg-[#04070D] text-slate-100">
        {/* Scroll Progress Bar */}
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-sky-500 via-sky-300 to-white"
        />

        <Navbar onOpenCVModal={handleOpenModal} onSelectNav={handleSelectNav} />

        {/* Facebook-Style Executive Profile Header */}
        <section
          id="profile-header"
          className="border-b border-slate-800/80 bg-[#0B111E]"
        >
          <div className="mx-auto max-w-6xl">
            {/* Tailored IT Support & Network Lab Cover Photo with Subtle Motion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-56 sm:h-72 lg:h-[340px] w-full overflow-hidden rounded-b-2xl border-x border-b border-slate-800/90 bg-[#050811]"
            >
              <motion.img
                src={COVER_BANNER_PATH}
                alt="IT Support Specialist workstation, network patch rack, and hardware diagnostics desk"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070D]/95 via-[#0B111E]/35 to-transparent" />
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setLightboxImage({
                    src: COVER_BANNER_PATH,
                    caption: 'IT Support & Network Lab Workstation Cover',
                  })
                }
                className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#070B14]/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-[#0F172A] cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5 text-sky-300" />
                View Cover
              </motion.button>
            </motion.div>

            {/* Overlapping Circular Profile Picture + Name + Actions */}
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-5">
                  {/* Executive Circular Avatar overlapping cover photo */}
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative -mt-20 sm:-mt-24 shrink-0"
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        cv.photoUrl &&
                        setLightboxImage({
                          src: cv.photoUrl,
                          caption: `${cv.name} — Original CV Photograph`,
                        })
                      }
                      aria-label="Enlarge Rafi Rahman profile photograph"
                      className="group relative block h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full border-4 border-[#0B111E] bg-white shadow-2xl ring-2 ring-sky-400/50 cursor-pointer"
                    >
                      {cv.photoUrl && (
                        <img
                          src={cv.photoUrl}
                          alt={`${cv.name} profile photograph`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-slate-950/75 py-1.5 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        View Photo
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Name & Headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="pb-1"
                  >
                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {cv.name}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-sky-400 sm:text-base">
                      {cv.roleTitle}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-300">
                      <a
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-200 underline decoration-sky-400/50 underline-offset-4 transition-colors hover:text-sky-300"
                      >
                        <Mail className="h-3.5 w-3.5 text-sky-400" />
                        {cv.contact.email}
                      </a>
                      <span aria-hidden="true" className="text-slate-600">
                        &middot;
                      </span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-200 underline decoration-sky-400/50 underline-offset-4 transition-colors hover:text-sky-300 tabular-nums"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-sky-400" />
                        {cv.contact.phone}
                      </a>
                      <span aria-hidden="true" className="text-slate-600">
                        &middot;
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-sky-400" />
                        {cv.contact.address}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 shrink-0"
                >
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Download CV PDF
                  </motion.button>

                  <motion.a
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#111A2E] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:border-sky-400/50 hover:bg-[#17233D] whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="h-4 w-4 text-sky-400" />
                    WhatsApp
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#111A2E] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:border-sky-400/50 hover:bg-[#17233D] whitespace-nowrap shrink-0"
                  >
                    <Mail className="h-4 w-4 text-sky-400" />
                    Gmail
                  </motion.a>

                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOpenModal('pdf')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    View CV
                  </motion.button>
                </motion.div>
              </div>

              {/* Facebook-Style Animated Profile Tabs Bar */}
              <div
                id="profile-tabs"
                role="tablist"
                aria-label="Portfolio profile sections"
                className="mt-7 flex items-center gap-1 overflow-x-auto border-t border-slate-800/80 pt-2"
              >
                {profileTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer rounded-lg ${
                        isActive
                          ? 'text-sky-400'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.span
                          layoutId="fbProfileTabIndicator"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-sky-400"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Main Facebook-Style Two-Column Feed Workspace */}
        <main className="mx-auto max-w-6xl px-6 py-8 lg:py-10">
          <div className="grid items-start gap-6 lg:grid-cols-12">
            {/* Left Sticky Intro & Profile Sidebar */}
            <aside className="space-y-6 lg:col-span-5 lg:sticky lg:top-20">
              {/* Intro Card */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6"
              >
                <h2 className="text-lg font-bold text-white">Intro</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {cv.careerObjective}
                </p>

                <ul className="mt-5 space-y-3 border-t border-slate-800/80 pt-4 text-sm text-slate-200">
                  <li className="flex items-start gap-3">
                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>
                      IT Lab Assistant (Asset project &amp; SICIP project) at{' '}
                      <strong className="text-white">The Everest IT</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>NSDA Certified IT Support Service Level-3</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>
                      Bachelor of Arts (B.A) &middot;{' '}
                      <strong className="text-white">National University</strong> (CGPA: 2.63)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>Lives in {cv.contact.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>
                      Permanent Address: Vill: West Charbata, P.O: Char Bata (3813), P.S:
                      Subornochar
                    </span>
                  </li>
                </ul>

                <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-slate-800/80 pt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenModal('print')}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-[#111A2E] px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-sky-400/50 hover:bg-[#17233D] cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5 text-sky-400" />
                    Print-Friendly CV
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintCV}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-transparent px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/5 cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print Now
                  </button>
                </div>
              </motion.section>

              {/* Featured Profile Photo & Languages/Hobbies Card */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-bold text-white">Photos &amp; Workspace</h2>
                    <button
                      type="button"
                      onClick={() => handleOpenModal('pdf')}
                      className="text-xs font-medium text-sky-400 hover:text-sky-300 cursor-pointer"
                    >
                      Open PDF
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        cv.photoUrl &&
                        setLightboxImage({
                          src: cv.photoUrl,
                          caption: `${cv.name} — Original CV Photograph`,
                        })
                      }
                      className="group relative aspect-square overflow-hidden rounded-xl border border-slate-700/80 bg-white cursor-pointer"
                    >
                      {cv.photoUrl && (
                        <img
                          src={cv.photoUrl}
                          alt={`${cv.name} portrait`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: COVER_BANNER_PATH,
                          caption: 'IT Support Specialist & Network Lab Workstation',
                        })
                      }
                      className="group relative aspect-square overflow-hidden rounded-xl border border-slate-700/80 bg-[#070B14] cursor-pointer"
                    >
                      <img
                        src={COVER_BANNER_PATH}
                        alt="IT Support desk preview"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Languages className="h-4 w-4 text-sky-400" />
                    <h3>Languages</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    {cv.languages.map((l) => l.name).join(' · ')}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Heart className="h-4 w-4 text-sky-400" />
                    <h3>Hobbies</h3>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-300 list-disc pl-5">
                    {cv.hobbies.map((hobby, idx) => (
                      <li key={idx}>{hobby}</li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            </aside>

            {/* Right Main Timeline / Tab Content Column */}
            <div className="space-y-6 lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Pinned Career Objective Post */}
                  {showAbout && (
                    <motion.article
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 transition-colors hover:border-slate-700"
                    >
                      <PostHeader
                        title="Career Objective"
                        subtitle={`${cv.name} · Pinned Profile Summary`}
                        icon={<User className="h-4 w-4" />}
                      />
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200">
                        {cv.careerObjective}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-3">
                          <p className="text-[11px] text-slate-400">Certification</p>
                          <p className="mt-1 text-xs font-semibold text-white">
                            NSDA Level-3
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-3">
                          <p className="text-[11px] text-slate-400">Degree</p>
                          <p className="mt-1 text-xs font-semibold text-white">B.A (2.63)</p>
                        </div>
                        <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-3">
                          <p className="text-[11px] text-slate-400">HSC / SSC</p>
                          <p className="mt-1 text-xs font-semibold text-white tabular-nums">
                            3.67 / 2.83
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-3">
                          <p className="text-[11px] text-slate-400">Experience</p>
                          <p className="mt-1 text-xs font-semibold text-white tabular-nums">
                            4 Positions
                          </p>
                        </div>
                      </div>
                      <PostFooterActions postId="career-objective" />
                    </motion.article>
                  )}

                  {/* Professional Experience Timeline Posts */}
                  {showExperience &&
                    cv.experience.map((exp, index) => (
                      <motion.article
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 transition-colors hover:border-slate-700"
                      >
                        <PostHeader
                          title={`${exp.designation} — ${exp.company}`}
                          subtitle={`${
                            exp.id === 'axionet-it-systems'
                              ? '2 Months 2025 (Dec – Jan)'
                              : `${exp.startDate} – ${exp.endDate}`
                          } · ${exp.location}`}
                          icon={<Briefcase className="h-4 w-4" />}
                        />
                        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300 list-disc pl-5">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                        <PostFooterActions postId={exp.id} />
                      </motion.article>
                    ))}

                  {/* Education & Certifications Timeline Post */}
                  {showEducation && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 transition-colors hover:border-slate-700"
                    >
                      <PostHeader
                        title="Education & NSDA Certifications"
                        subtitle={`${cv.name} · Academic & Technical Qualifications`}
                        icon={<GraduationCap className="h-4 w-4" />}
                      />

                      <div className="mt-5 relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                        {cv.education.map((edu, idx) => (
                          <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.06 }}
                            className="relative pl-8"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border border-sky-400/50 bg-[#111A2E] flex items-center justify-center"
                            >
                              <span className="h-2 w-2 rounded-full bg-sky-400" />
                            </span>
                            <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-4">
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h4 className="text-sm font-bold text-white">{edu.title}</h4>
                                <span className="font-mono text-xs text-sky-300 tabular-nums">
                                  {edu.passingYear}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-slate-300">
                                {edu.boardOrAuthority} &middot; {edu.groupOrSubject}
                              </p>
                              <p className="mt-2 font-mono text-xs font-semibold text-white tabular-nums">
                                {edu.result}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <PostFooterActions postId="education" />
                    </motion.article>
                  )}

                  {/* Computer Skills, Specialization & Languages Post */}
                  {showSkills && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 transition-colors hover:border-slate-700"
                    >
                      <PostHeader
                        title="Computer Skills, Specialization & Languages"
                        subtitle={`${cv.name} · Verified Technical & Professional Capabilities`}
                        icon={<Award className="h-4 w-4" />}
                      />

                      <div className="mt-4 rounded-xl border border-slate-800/90 bg-[#070B14] p-4">
                        <p className="text-xs font-semibold text-sky-400">
                          Computer Skill (Verbatim)
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                          MS Office (Word, Excel, PowerPoint), Computer Fundamentals, Hardware &amp;
                          Software Troubleshooting, CCTV &amp; Surveillance Operations, Internet
                          Applications &amp; Network Basics.
                        </p>
                      </div>

                      <div
                        role="tablist"
                        aria-label="Filter skills by category"
                        className="mt-5 inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#070B14] p-1"
                      >
                        {(
                          ['All', 'Computer Skills', 'Specialization', 'Languages'] as SkillFilter[]
                        ).map((tab) => (
                          <button
                            key={tab}
                            role="tab"
                            aria-selected={skillFilter === tab}
                            type="button"
                            onClick={() => setSkillFilter(tab)}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              skillFilter === tab
                                ? 'bg-white text-slate-950 font-semibold'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {visibleSkills.map((skill, idx) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25, delay: idx * 0.025 }}
                            className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#070B14] p-4"
                          >
                            <div>
                              <p className="text-[11px] font-medium text-sky-400">
                                {skill.category}
                              </p>
                              <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-slate-100">
                                {skill.name}
                              </p>
                            </div>
                            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.05 + idx * 0.02 }}
                                style={{ transformOrigin: 'left' }}
                                className="h-full w-full bg-gradient-to-r from-sky-500 to-sky-300"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <PostFooterActions postId="skills" />
                    </motion.article>
                  )}

                  {/* Personal Profile, Declaration & Signature Post */}
                  {showAbout && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 transition-colors hover:border-slate-700"
                    >
                      <PostHeader
                        title="Personal Profile, Declaration & Signature"
                        subtitle={`${cv.name} · Official Bio-Data Verification`}
                        icon={<PenTool className="h-4 w-4" />}
                      />

                      <dl className="mt-4 divide-y divide-slate-800/80 text-sm">
                        {cv.personalProfile.map((field) => (
                          <div
                            key={field.label}
                            className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <dt className="font-medium text-slate-400">{field.label}</dt>
                            <dd className="font-medium text-white text-left sm:text-right">
                              {field.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-5 rounded-xl border border-slate-800/90 bg-[#070B14] p-5">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                          Declaration
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          {cv.declaration}
                        </p>

                        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-800/80 pt-4">
                          <span className="text-xs text-slate-400">Date:</span>
                          <div className="text-center">
                            {cv.signatureUrl && (
                              <img
                                src={cv.signatureUrl}
                                alt={`${cv.name} original signature`}
                                referrerPolicy="no-referrer"
                                className="mx-auto h-14 max-w-[190px] rounded bg-white p-1.5 object-contain"
                              />
                            )}
                            <p className="mt-2 text-xs font-semibold text-white">{cv.name}</p>
                          </div>
                        </div>
                      </div>

                      <PostFooterActions postId="personal-profile" />
                    </motion.article>
                  )}

                  {/* Contact Me Post */}
                  {showContact && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl border border-slate-800/90 bg-[#0B111E] p-6 transition-colors hover:border-slate-700"
                    >
                      <PostHeader
                        title="Contact Me"
                        subtitle="Direct Gmail Compose & WhatsApp Chat"
                        icon={<Mail className="h-4 w-4" />}
                      />

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-4">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-medium text-slate-400">Gmail</p>
                            <button
                              type="button"
                              onClick={() => handleCopy(cv.contact.email, 'email')}
                              className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                            >
                              {copiedField === 'email' ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-sky-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <a
                            href={gmailComposeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 block truncate text-sm font-semibold text-white underline decoration-sky-400/50 underline-offset-4 hover:text-sky-300"
                          >
                            {cv.contact.email}
                          </a>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={gmailComposeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-slate-200"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Gmail Compose
                            </a>
                            <a
                              href={`mailto:${cv.contact.email}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-[#111A2E] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-[#17233D]"
                            >
                              <Mail className="h-3.5 w-3.5 text-sky-400" />
                              Mail App
                            </a>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-800/90 bg-[#070B14] p-4">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-medium text-slate-400">
                              WhatsApp &amp; Mobile
                            </p>
                            <button
                              type="button"
                              onClick={() => handleCopy(cv.contact.phone, 'phone')}
                              className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                            >
                              {copiedField === 'phone' ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-sky-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 block text-sm font-semibold text-white underline decoration-sky-400/50 underline-offset-4 hover:text-sky-300 tabular-nums"
                          >
                            {cv.contact.phone}
                          </a>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-slate-200"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              Open WhatsApp
                            </a>
                            <a
                              href={telHref}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-[#111A2E] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-[#17233D]"
                            >
                              <Phone className="h-3.5 w-3.5 text-sky-400" />
                              Call
                            </a>
                          </div>
                        </div>
                      </div>

                      <form
                        onSubmit={handleContactSubmit}
                        className="mt-5 rounded-xl border border-slate-800/90 bg-[#070B14] p-5"
                      >
                        <h4 className="text-sm font-bold text-white">Send a Direct Message</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="block text-xs font-medium text-slate-300"
                            >
                              Your Name
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              value={senderName}
                              onChange={(e) => setSenderName(e.target.value)}
                              placeholder="Enter your full name"
                              className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#0B111E] px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="contact-email"
                              className="block text-xs font-medium text-slate-300"
                            >
                              Your Email
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              value={senderEmail}
                              onChange={(e) => setSenderEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#0B111E] px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor="contact-message"
                            className="block text-xs font-medium text-slate-300"
                          >
                            Message
                          </label>
                          <textarea
                            id="contact-message"
                            rows={3}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Write your message..."
                            className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#0B111E] px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                          />
                        </div>

                        {formFeedback && (
                          <p role="status" className="mt-3 text-xs font-medium text-sky-300">
                            {formFeedback}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200 cursor-pointer"
                          >
                            <Send className="h-4 w-4" />
                            Send via Gmail
                          </button>
                          <button
                            type="button"
                            onClick={handleSendWhatsApp}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#111A2E] px-4 py-2 text-xs sm:text-sm font-medium text-slate-100 transition-colors hover:bg-[#17233D] cursor-pointer"
                          >
                            <MessageCircle className="h-4 w-4 text-sky-400" />
                            Send via WhatsApp
                          </button>
                        </div>
                      </form>
                    </motion.article>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-800/80 bg-[#04070D] py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-400 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {cv.name}. All CV information preserved verbatim.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-300 transition-colors tabular-nums"
              >
                {cv.contact.phone}
              </a>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-sky-300 transition-colors"
              >
                {cv.contact.email}
              </a>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Download Original CV PDF
              </button>
              <button
                type="button"
                onClick={() => handleOpenModal('print')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Print-Friendly CV
              </button>
            </div>
          </div>
        </footer>

        <CVModal
          isOpen={cvModalOpen}
          initialTab={cvModalTab}
          cv={cv}
          onClose={() => setCvModalOpen(false)}
          onDownloadPdf={handleDownloadPdf}
        />

        {/* Animated Photo / Cover Lightbox Viewer */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={lightboxImage.caption}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0B111E]"
              >
                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
                  <p className="text-sm font-semibold text-white">{lightboxImage.caption}</p>
                  <button
                    type="button"
                    onClick={() => setLightboxImage(null)}
                    aria-label="Close photo preview"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/80 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex max-h-[75vh] items-center justify-center bg-[#04070D] p-4">
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.caption}
                    referrerPolicy="no-referrer"
                    className="max-h-[68vh] w-auto rounded-lg object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dedicated clean print-only A4 CV surface */}
      <div className="hidden print:block">
        <PrintCVSheet cv={cv} />
      </div>
    </>
  );
}
