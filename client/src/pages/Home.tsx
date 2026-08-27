/**
 * Circuit Editorial reminder: present expertise like an engineering journal—parchment and ink,
 * an asymmetric ledger layout, mineral-glass cards, technical rules, and Signal Cobalt emphasis.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  FileText,
  Github,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const heroImage = "/manus-storage/thenjiwe-hero-orbit_f30209bc.jpg";
const govGuideImage = "/manus-storage/govguide-ai-visual_9b2bc022.jpg";
const mobilityImage = "/manus-storage/mobility-booking-visual_e8a487a0.jpg";
const signalMark = "/manus-storage/thenjiwe-signal-mark_1e1e740e.png";

const skillGroups = [
  {
    label: "01 / Languages",
    icon: Code2,
    skills: ["TypeScript", "JavaScript", "Python", "Java"],
  },
  {
    label: "02 / Frontend",
    icon: Laptop,
    skills: ["React.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "03 / Backend & Data",
    icon: Database,
    skills: ["Node.js", "Django", "PostgreSQL", "MySQL", "Supabase", "REST APIs"],
  },
  {
    label: "04 / AI & Tools",
    icon: BrainCircuit,
    skills: ["Prompt Engineering", "Conversational AI Design", "Power BI", "Git", "GitHub"],
  },
];

const navItems = ["About", "Skills", "Projects", "Contact"];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.48, ease: "circOut" as const },
};

function SectionHeading({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <motion.div {...fadeUp} className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[10rem_1fr] md:gap-10">
      <div className="flex items-center gap-3 self-start pt-2">
        <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#315CF4]">{number}</span>
        <span className="h-px w-10 bg-[#315CF4]/45" />
      </div>
      <div>
        <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {intro ? <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{intro}</p> : null}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete your name, email, and message.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:thenjiwembi67@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Your email draft is ready to send.");
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-[#315CF4] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="mx-auto max-w-7xl border border-foreground/[0.09] bg-background/[0.82] shadow-[0_8px_32px_rgba(32,44,82,0.08)] backdrop-blur-xl dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex h-15 items-center justify-between px-4 sm:h-16 sm:px-5">
            <button
              type="button"
              onClick={() => scrollTo("top")}
              className="group flex items-center gap-3 text-left"
              aria-label="Back to top"
            >
              <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-[#315CF4]/10 ring-1 ring-[#315CF4]/25 transition-transform duration-200 group-hover:rotate-6">
                <img src={signalMark} alt="Thenjiwe Mbi mark" className="size-8 object-contain" />
              </span>
              <span className="leading-none">
                <span className="block text-[14px] font-extrabold tracking-[-0.045em]">THENJIWE <span className="text-[#315CF4]">MBI</span></span>
                <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Studio / Developer / AI</span>
              </span>
            </button>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
              {navItems.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-xs font-bold uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:text-[#315CF4] focus-visible:text-[#315CF4]"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                className="grid size-9 place-items-center border border-foreground/[0.1] bg-card/60 text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-[#315CF4]/45 hover:text-[#315CF4] active:scale-[0.97]"
              >
                {theme === "light" ? <Moon size={16} strokeWidth={1.9} /> : <Sun size={16} strokeWidth={1.9} />}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(value => !value)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                className="grid size-9 place-items-center border border-foreground/[0.1] bg-card/60 text-foreground transition-all duration-200 hover:border-[#315CF4]/45 hover:text-[#315CF4] active:scale-[0.97] lg:hidden"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <nav className="border-t border-foreground/[0.08] p-3 lg:hidden" aria-label="Mobile navigation">
              <div className="grid gap-1">
                {navItems.map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="flex items-center justify-between px-3 py-3 text-left text-sm font-bold transition-colors hover:bg-[#315CF4]/8 hover:text-[#315CF4]"
                  >
                    {item}
                    <ArrowDownRight size={16} />
                  </button>
                ))}
              </div>
            </nav>
          ) : null}
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[780px] overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44 lg:min-h-[850px] lg:px-12 lg:pt-50">
          <div className="pointer-events-none absolute inset-0 tech-noise opacity-55 dark:opacity-20" />
          <div className="pointer-events-none absolute left-[14%] top-24 h-[30rem] w-px bg-gradient-to-b from-[#315CF4]/0 via-[#315CF4]/40 to-[#315CF4]/0" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: "circOut" }}
              className="relative z-10 lg:pb-12"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="inline-flex size-2 rounded-full bg-[#315CF4] shadow-[0_0_0_5px_rgba(49,92,244,0.1)]" />
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
                  Cape Town, South Africa
                </p>
              </div>
              <p className="mb-4 max-w-xl font-display text-2xl italic tracking-[-0.025em] text-[#315CF4] sm:text-3xl">
                Building with intent.
              </p>
              <h1 className="max-w-3xl font-display text-[clamp(4rem,10vw,8.5rem)] leading-[0.78] tracking-[-0.078em] text-foreground">
                Thenjiwe<br />
                <span className="relative ml-[0.28em] inline-block">Mbi<span className="absolute -right-4 top-0 font-mono text-sm font-bold tracking-normal text-[#315CF4] sm:-right-6 sm:text-base">01</span></span>
              </h1>
              <div className="mt-10 max-w-xl border-l-2 border-[#315CF4] pl-5 sm:pl-6">
                <h2 className="text-xl font-extrabold tracking-[-0.035em] text-foreground sm:text-2xl">Software Developer & AI Specialist</h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Building intelligent, user-centric web applications with modern frameworks and robust data architectures.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => scrollTo("projects")}
                  className="h-12 rounded-none bg-[#315CF4] px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(49,92,244,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#234ae0] active:scale-[0.97]"
                >
                  View Work <ArrowDownRight size={17} />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => scrollTo("contact")}
                  className="h-12 rounded-none border-foreground/15 bg-card/35 px-5 text-sm font-bold text-foreground hover:border-[#315CF4]/55 hover:bg-[#315CF4]/8 hover:text-[#315CF4] active:scale-[0.97]"
                >
                  Contact Me <Send size={15} />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 22 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.72, delay: 0.1, ease: "circOut" }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div className="relative overflow-hidden border border-foreground/[0.09] bg-card p-2 shadow-[24px_24px_0_rgba(49,92,244,0.09)] dark:border-white/[0.11] dark:shadow-[24px_24px_0_rgba(49,92,244,0.14)] sm:p-3">
                <img src={heroImage} alt="Abstract cobalt orbital system" className="aspect-[4/3] w-full object-cover object-center" />
                <div className="absolute inset-2 border border-white/25 sm:inset-3" />
                <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-[#0c1732]/82 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur sm:bottom-6 sm:left-6">
                  <Sparkles size={12} className="text-[#7e9bff]" />
                  Intelligent systems
                </div>
                <div className="absolute right-5 top-5 font-mono text-[10px] font-bold tracking-[0.14em] text-[#315CF4] sm:right-6 sm:top-6">TM // 2026</div>
              </div>
              <div className="absolute -bottom-7 -left-5 hidden border border-foreground/[0.1] bg-background/85 px-4 py-3 backdrop-blur-xl sm:flex sm:items-center sm:gap-4">
                <span className="font-display text-3xl leading-none text-[#315CF4]">↗</span>
                <span className="text-[10px] font-bold uppercase leading-4 tracking-[0.16em] text-muted-foreground">Clarity through<br />technology</span>
              </div>
            </motion.div>
          </div>
          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-[#315CF4] lg:flex"
          >
            Scroll to explore <span className="h-8 w-px bg-[#315CF4]/55" />
          </button>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-foreground/[0.08] bg-card/35 px-5 py-22 sm:px-8 sm:py-28 lg:px-12">
          <div className="ledger-shell mx-auto max-w-7xl">
            <SectionHeading
              number="01"
              eyebrow="A little context"
              title="Technical craft, grounded in people."
            />
            <div className="grid gap-8 md:grid-cols-[10rem_1.1fr_0.9fr] md:gap-10">
              <div className="hidden md:block" />
              <motion.div {...fadeUp} className="max-w-2xl">
                <p className="font-display text-3xl leading-[1.08] tracking-[-0.04em] text-foreground sm:text-4xl">
                  I turn complex requirements into <em className="text-[#315CF4]">clear, useful</em> digital experiences.
                </p>
                <p className="mt-7 text-base leading-8 text-muted-foreground">
                  My foundation in <strong className="font-bold text-foreground">ICT Application Development at Cape Peninsula University of Technology</strong> gave me a practical lens for software design, data, and problem-solving. At <strong className="font-bold text-foreground">Code7Solutions</strong>, I developed that foundation in a professional environment—contributing to web work where quality, usability, and reliable delivery all matter.
                </p>
              </motion.div>
              <motion.aside {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="mineral-panel relative p-6 sm:p-7">
                <div className="absolute right-5 top-5 font-mono text-[10px] font-bold text-[#315CF4]">/ PROFILE</div>
                <FileText size={24} strokeWidth={1.55} className="mb-12 text-[#315CF4]" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Working principle</p>
                <p className="mt-3 text-lg font-bold leading-7 tracking-[-0.025em] text-foreground">Build the system. Keep the human at the center.</p>
                <div className="mt-7 h-px w-full bg-foreground/[0.1]" />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Curious · detail-aware · delivery-minded</p>
              </motion.aside>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 px-5 py-22 sm:px-8 sm:py-28 lg:px-12">
          <div className="ledger-shell mx-auto max-w-7xl">
            <SectionHeading
              number="02"
              eyebrow="Toolbox"
              title="A practical stack for thoughtful products."
              intro="From interaction design to data architecture, I use the tools that help a product become useful, maintainable, and ready to evolve."
            />
            <div className="grid gap-4 md:grid-cols-2 md:gap-x-10 md:gap-y-6">
              {skillGroups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <motion.article
                    key={group.label}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: index * 0.07 }}
                    className={`mineral-panel group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#315CF4]/40 hover:shadow-[12px_14px_0_rgba(49,92,244,0.12)] sm:p-7 ${index % 2 === 1 ? "md:translate-y-9" : ""}`}
                  >
                    <div className="absolute right-0 top-0 size-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.045] transition-transform duration-300 group-hover:scale-125" />
                    <span className="absolute bottom-3 right-4 font-mono text-[9px] font-bold tracking-[0.14em] text-muted-foreground/65">STACK / 0{index + 1}</span>
                    <span className="absolute bottom-0 left-0 h-px w-[42%] bg-[#315CF4]/50" />
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center border border-foreground/[0.1] bg-background/45 text-foreground"><Icon size={20} strokeWidth={1.7} /></span>
                        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-foreground">{group.label}</p>
                      </div>
                      <ArrowUpRight size={17} className="text-muted-foreground transition-colors group-hover:text-[#315CF4]" />
                    </div>
                    <div className="relative mt-7 flex flex-wrap gap-2 pr-8">
                      {group.skills.map(skill => (
                        <span key={skill} className="border border-foreground/[0.1] bg-background/60 px-3 py-1.5 text-[11px] font-bold text-muted-foreground transition-colors group-hover:border-[#315CF4]/20 group-hover:text-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-y border-foreground/[0.08] bg-[#e9edff]/45 px-5 py-22 dark:bg-[#111b3e]/45 sm:px-8 sm:py-28 lg:px-12">
          <div className="ledger-shell mx-auto max-w-7xl">
            <SectionHeading
              number="03"
              eyebrow="Selected work"
              title="Systems that make a difference."
              intro="Two project snapshots where product thinking, interface craft, and technical structure work together."
            />
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <motion.article {...fadeUp} className="mineral-panel group overflow-hidden">
                <div className="relative overflow-hidden p-3">
                  <img src={govGuideImage} alt="Abstract visual representing GOVGUIDE AI conversational civic support" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  <div className="absolute inset-3 border border-white/15" />
                  <span className="absolute left-6 top-6 bg-[#0c1732]/85 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">01 / AI service</span>
                  <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-[#0c1732]/82 px-3 py-2 font-mono text-[8px] font-bold tracking-[0.12em] text-white backdrop-blur">
                    <span>LLM</span><span className="h-px w-4 bg-[#7e9bff]" /><span>AUTH</span><span className="h-px w-4 bg-[#7e9bff]" /><span>ARCHIVE</span>
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-4xl leading-none tracking-[-0.045em] text-foreground">GOVGUIDE AI</h3>
                    <span className="grid size-9 shrink-0 place-items-center border border-[#315CF4]/25 text-[#315CF4] transition-all group-hover:bg-[#315CF4] group-hover:text-white"><ArrowUpRight size={17} /></span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">An AI-powered public-service assistant that helps citizens understand government procedures and requirements through conversational interaction.</p>
                  <div className="mt-6 border-l-2 border-[#315CF4] bg-[#315CF4]/[0.05] px-4 py-3">
                    <p className="text-[11px] font-bold leading-5 text-foreground">Structured LLM prompts, token tracking, Supabase auth, conversation archiving, and accessible UX.</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Supabase", "LLM Integration"].map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                  </div>
                </div>
              </motion.article>

              <motion.article {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="mineral-panel group mt-0 overflow-hidden lg:mt-12">
                <div className="relative overflow-hidden p-3">
                  <img src={mobilityImage} alt="Abstract visual representing hospitality vehicle booking" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  <div className="absolute inset-3 border border-white/25" />
                  <span className="absolute left-6 top-6 bg-[#315CF4]/92 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">02 / Commerce</span>
                  <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-[#0c1732]/82 px-3 py-2 font-mono text-[8px] font-bold tracking-[0.12em] text-white backdrop-blur">
                    <span>SELECT</span><span className="h-px w-4 bg-[#7e9bff]" /><span>CUSTOMIZE</span><span className="h-px w-4 bg-[#7e9bff]" /><span>PAY</span>
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-sm font-display text-4xl leading-[0.92] tracking-[-0.045em] text-foreground">Hospitality &<br />Car Rental App</h3>
                    <span className="grid size-9 shrink-0 place-items-center border border-[#315CF4]/25 text-[#315CF4] transition-all group-hover:bg-[#315CF4] group-hover:text-white"><ArrowUpRight size={17} /></span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">An in-hotel booking platform allowing hotel guests to choose, customize vehicle type, duration, and color, then pay for rental vehicles directly.</p>
                  <div className="mt-6 border-l-2 border-[#315CF4] bg-[#315CF4]/[0.05] px-4 py-3">
                    <p className="text-[11px] font-bold leading-5 text-foreground">A guest-focused booking flow designed to make mobility choices simple, tailored, and ready to transact.</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["JavaScript", "React", "Node.js", "CSS3", "HTML5"].map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 py-22 sm:px-8 sm:py-28 lg:px-12">
          <div className="ledger-shell mx-auto max-w-7xl">
            <SectionHeading
              number="04"
              eyebrow="Open channel"
              title="Let’s make something useful."
              intro="Have a product, a system, or a question in mind? Send a note and let’s start the right conversation."
            />
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <motion.div {...fadeUp} className="space-y-3">
                <a href="mailto:thenjiwembi67@gmail.com" className="contact-link group">
                  <span className="contact-icon"><Mail size={18} /></span>
                  <span><span className="contact-label">Email</span><span className="contact-value">thenjiwembi67@gmail.com</span></span>
                  <ArrowUpRight size={16} className="ml-auto text-muted-foreground transition-colors group-hover:text-[#315CF4]" />
                </a>
                <a href="tel:+27721613975" className="contact-link group">
                  <span className="contact-icon"><Phone size={18} /></span>
                  <span><span className="contact-label">Phone</span><span className="contact-value">+27 72 161 3975</span></span>
                  <ArrowUpRight size={16} className="ml-auto text-muted-foreground transition-colors group-hover:text-[#315CF4]" />
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Cape+Town%2C+South+Africa" target="_blank" rel="noreferrer" className="contact-link group">
                  <span className="contact-icon"><MapPin size={18} /></span>
                  <span><span className="contact-label">Location</span><span className="contact-value">Cape Town, South Africa</span></span>
                  <ArrowUpRight size={16} className="ml-auto text-muted-foreground transition-colors group-hover:text-[#315CF4]" />
                </a>
                <a href="https://github.com/thenjiwembi" target="_blank" rel="noreferrer" className="contact-link group">
                  <span className="contact-icon"><Github size={18} /></span>
                  <span><span className="contact-label">GitHub</span><span className="contact-value">github.com/thenjiwembi</span></span>
                  <ArrowUpRight size={16} className="ml-auto text-muted-foreground transition-colors group-hover:text-[#315CF4]" />
                </a>
                <a href="https://za.linkedin.com/in/thenjiwe-mbi" target="_blank" rel="noreferrer" className="contact-link group">
                  <span className="contact-icon"><Linkedin size={18} /></span>
                  <span><span className="contact-label">LinkedIn</span><span className="contact-value">Thenjiwe Mbi</span></span>
                  <ArrowUpRight size={16} className="ml-auto text-muted-foreground transition-colors group-hover:text-[#315CF4]" />
                </a>
              </motion.div>

              <motion.form {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} onSubmit={handleContact} className="mineral-panel relative p-6 backdrop-blur-sm sm:p-8">
                <span className="absolute right-6 top-6 font-mono text-[10px] font-bold tracking-[0.14em] text-[#315CF4]">MAIL // 01</span>
                <p className="mb-8 max-w-md pr-15 font-display text-3xl leading-none tracking-[-0.04em] text-foreground">Your note starts here.</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                    Name
                    <Input value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} placeholder="Your name" className="mt-2 h-12 rounded-none border-foreground/12 bg-background/65 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:border-[#315CF4] focus-visible:ring-[#315CF4]/20" />
                  </label>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                    Email
                    <Input type="email" value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} placeholder="you@example.com" className="mt-2 h-12 rounded-none border-foreground/12 bg-background/65 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:border-[#315CF4] focus-visible:ring-[#315CF4]/20" />
                  </label>
                </div>
                <label className="mt-5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                  Message
                  <Textarea value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} placeholder="What are you looking to build?" className="mt-2 min-h-35 resize-y rounded-none border-foreground/12 bg-background/65 p-3 text-sm leading-6 shadow-none placeholder:text-muted-foreground/70 focus-visible:border-[#315CF4] focus-visible:ring-[#315CF4]/20" />
                </label>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs leading-5 text-muted-foreground">Submitting opens your preferred email app.</p>
                  <Button type="submit" className="h-11 rounded-none bg-[#315CF4] px-5 text-sm font-bold text-white hover:bg-[#234ae0] active:scale-[0.97]">Send enquiry <Send size={15} /></Button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/[0.08] px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Thenjiwe Mbi</p>
          <p>Software developer & AI specialist</p>
          <button type="button" onClick={() => scrollTo("top")} className="inline-flex items-center gap-2 transition-colors hover:text-[#315CF4]">Back to top <ArrowUpRight size={13} /></button>
        </div>
      </footer>
    </div>
  );
}
