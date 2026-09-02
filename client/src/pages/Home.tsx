/**
 * Reference-led reminder: use a compact blue-black developer profile with ember-orange portrait
 * halo, slim navigation, strong left-aligned type, and thin connected rules throughout.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import { submitContact } from "@/lib/formspree";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Braces,
  Download,
  BrainCircuit,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  RotateCcw,
  Send,
  ServerCog,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

const portraitImage = "/manus-storage/thenjiwe-mbi-portrait_855f98d3.jpg";
const cvFile = "/manus-storage/THENJIWEMBICV_9181d41e.pdf";
const govGuideImage = "/manus-storage/govguide-ai-visual_9b2bc022.jpg";
const mobilityImage = "/manus-storage/mobility-booking-visual_e8a487a0.jpg";
const signalMark = "/manus-storage/thenjiwe-signal-mark_1e1e740e.png";

const navigation = ["Home", "About", "Skills", "Projects", "Contact"];

const capabilities = [
  { title: "Web Application Development", description: "Responsive interfaces with clear user flows.", icon: Code2 },
  { title: "AI & Prompt Design", description: "Structured interactions for useful conversations.", icon: BrainCircuit },
  { title: "Data & Backend Logic", description: "Reliable services, APIs, and database foundations.", icon: Database },
];

const skillGroups = [
  { label: "Languages", values: ["TypeScript", "JavaScript", "Python", "Java"] },
  { label: "Frontend", values: ["React.js", "Vue.js", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend & databases", values: ["Node.js", "Django", "PostgreSQL", "MySQL", "Supabase", "REST APIs"] },
  { label: "AI & tools", values: ["Prompt Engineering", "Conversational AI", "Power BI", "Git", "GitHub"] },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: "circOut" as const },
};

function SectionTitle({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <motion.div {...reveal} className="section-title">
      <div className="section-index"><span>{index}</span><i /></div>
      <div>
        {kicker ? <p className="section-kicker">{kicker}</p> : null}
        <h2>{title}</h2>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [assistantError, setAssistantError] = useState(false);
  const assistantMutation = trpc.assistant.ask.useMutation({
    onSuccess: ({ answer }) => {
      setAssistantError(false);
      setAssistantMessages(current => [...current, { role: "assistant", content: answer }]);
    },
    onError: () => {
      setAssistantError(true);
      toast.error("The assistant is unavailable right now. Please try again or use the contact form.");
    },
  });
  const goTo = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const askAssistant = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = assistantQuestion.trim();
    if (!question || assistantMutation.isPending) return;
    setAssistantError(false);
    setAssistantMessages(current => [...current, { role: "user", content: question }]);
    setAssistantQuestion("");
    assistantMutation.mutate({ question });
  };

  const retryAssistant = () => {
    const lastUserMessage = [...assistantMessages].reverse().find(message => message.role === "user");
    if (!lastUserMessage || assistantMutation.isPending) return;
    setAssistantError(false);
    assistantMutation.mutate({ question: lastUserMessage.content });
  };

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message || contactStatus === "sending") {
      if (!form.name || !form.email || !form.message) toast.error("Please add your name, email, and message.");
      return;
    }
    setContactStatus("sending");
    try {
      await submitContact(form);
      setForm({ name: "", email: "", message: "" });
      setContactStatus("success");
      toast.success("Your message has been sent to Thenjiwe.");
    } catch {
      setContactStatus("error");
      toast.error("Your message could not be sent. Please try again or email Thenjiwe directly.");
    }
  };

  return (
    <div className="portfolio-shell min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="site-header">
        <div className="site-header__inner">
          <button type="button" onClick={() => goTo("top")} className="brand-lockup" aria-label="Back to top">
            <img src={signalMark} alt="Thenjiwe Mbi brand mark" />
            <span><b>MBI T...</b><small>END-USER PRODUCTS</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map(item => <button key={item} type="button" onClick={() => goTo(item === "Home" ? "top" : item.toLowerCase())}>{item}</button>)}
          </nav>

          <div className="header-actions">
            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="header-icon">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button type="button" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu" className="header-icon mobile-menu">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map(item => <button key={item} type="button" onClick={() => goTo(item === "Home" ? "top" : item.toLowerCase())}>{item}<ArrowDown size={15} /></button>)}
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.56, ease: "circOut" }}
              className="hero-copy"
            >
              <div className="hero-brandline"><img src={signalMark} alt="" /><div><strong>MBI T...</strong><small>END-USER SOFTWARE PRODUCTS · CAPE TOWN</small></div></div>
              <h1 className="hero-statement">I build <strong className="hero-products">end-user software products</strong> focused on real user outcomes.</h1>
              <p className="hero-summary">I build accessible web applications that make complex tasks easier to understand and use.</p>
              <div className="hero-ctas">
                <Button type="button" onClick={() => goTo("projects")} className="ember-button">See my projects <ArrowUpRight size={15} /></Button>
                <Button type="button" variant="outline" onClick={() => goTo("contact")} className="ghost-button">Message me <Send size={14} /></Button>
              </div>
              <div className="cv-actions">
                <a href={cvFile} target="_blank" rel="noreferrer" className="cv-link"><FileText size={13} /> Preview CV <ExternalLink size={11} /></a>
                <a href={cvFile} download="Thenjiwe-Mbi-CV.pdf" className="cv-link"><Download size={13} /> Download CV</a>
              </div>
              <div className="hero-meta"><span>REACT</span><span>WEB APPS</span><span>DATA</span></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.06, ease: "circOut" }}
              className="portrait-stage"
            >
              <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="portrait-halo" />
              <div className="portrait-frame">
                <img src={portraitImage} alt="Thenjiwe Mbi" />
              </div>
              <span className="portrait-marker marker-one" /><span className="portrait-marker marker-two" />
              <p className="portrait-caption">MBI T... <span>01</span></p>
            </motion.div>
          </div>
          <button type="button" onClick={() => goTo("about")} className="scroll-cue">Explore profile <ArrowDown size={14} /></button>
        </section>

        <section id="about" className="page-section about-section">
          <div className="content-wrap">
            <SectionTitle index="01" title="About me" kicker="A little context" />
            <div className="about-grid">
              <div className="capability-rail">
                {capabilities.map((item, index) => {
                  const Icon = item.icon;
                  return <motion.div {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} className="capability" key={item.title}>
                    <span className="capability__dot" /><span className="capability__icon"><Icon size={16} /></span>
                    <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  </motion.div>;
                })}
              </div>
              <motion.div {...reveal} className="about-copy">
                <p className="about-lead">I turn technical requirements into <em>clear, useful</em> experiences.</p>
                <p>My background in <strong>ICT Application Development at Cape Peninsula University of Technology</strong> shaped a practical approach to software design, data, and problem-solving. Professional development experience at <strong>Code7Solutions</strong>, together with my internship at <strong>CAPACITI as a Web Developer</strong>, continues to strengthen my focus on quality, usability, and dependable delivery.</p>
                <div className="stats-strip">
                  <span><b>CPUT</b><small>ICT Application Development</small></span>
                  <span><b>CAPACITI</b><small>Web Developer Intern</small></span>
                  <span><b>CODE7</b><small>Developer experience</small></span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="page-section skills-section">
          <div className="content-wrap">
            <SectionTitle index="02" title="My toolkit" kicker="Skills & technologies" />
            <motion.p {...reveal} className="section-description">Practical tools for designing responsive interfaces, connecting dependable services, and building useful data-driven products.</motion.p>
            <div className="skills-grid">
              {skillGroups.map((group, index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }} key={group.label} className="skill-card">
                <div className="skill-card__top"><span>0{index + 1}</span><h3>{group.label}</h3><Braces size={15} /></div>
                <div className="skill-list">{group.values.map(value => <span key={value}>{value}</span>)}</div>
              </motion.article>)}
            </div>
          </div>
        </section>

        <section id="projects" className="page-section projects-section">
          <div className="content-wrap">
            <SectionTitle index="03" title="Projects" kicker="Selected work" />
            <div className="project-stack">
              <motion.article {...reveal} className="project-card">
                <div className="project-card__media">
                  <img src={govGuideImage} alt="Abstract visual for GOVGUIDE AI" />
                  <span className="project-label">01 / Public service AI</span>
                  <span className="media-path">QUESTION <i /> GUIDANCE <i /> HISTORY</span>
                </div>
                <div className="project-card__copy">
                  <p className="project-number">01</p>
                  <h3>GOVGUIDE AI</h3>
                  <p>An AI-powered public-service assistant that helps citizens understand government procedures and requirements through conversational interaction.</p>
                  <p className="project-detail">Structured LLM prompts, token tracking, Supabase authentication, conversation archiving, and accessible UX.</p>
                  <div className="tag-row">{["React", "TypeScript", "Tailwind CSS", "Supabase", "LLM Integration"].map(tag => <span key={tag}>{tag}</span>)}</div>
                  <a href="https://govguideai.lovable.app" target="_blank" rel="noreferrer" className="project-link">View live demo <ArrowUpRight size={13} /></a>
                </div>
              </motion.article>

              <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="project-card project-card--reverse">
                <div className="project-card__media">
                  <img src={mobilityImage} alt="Abstract visual for hospitality and car rental booking" />
                  <span className="project-label">02 / Guest mobility</span>
                  <span className="media-path">SELECT <i /> TAILOR <i /> PAY</span>
                </div>
                <div className="project-card__copy">
                  <p className="project-number">02</p>
                  <h3>Hospitality &<br />Car Rental App</h3>
                  <p>An in-hotel booking platform that lets guests choose, customize, and pay for rental vehicles directly.</p>
                  <p className="project-detail">Vehicle type, duration, and colour selection are designed as a simple guest-first flow.</p>
                  <div className="tag-row">{["JavaScript", "React", "Node.js", "CSS3", "HTML5"].map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
              </motion.article>

              <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="project-card">
                <div className="project-card__media project-art project-art--muse">
                  <div className="art-window">
                    <div className="art-window__top"><span>AI CONTENT MUSE</span><i /><i /><i /></div>
                    <div className="art-window__body"><span className="art-kicker">CONTENT GENERATOR</span><strong>Write with<br /><em>intention.</em></strong><div className="art-lines"><i /><i /><i /></div><span className="art-chip">PROMPT / 02</span></div>
                  </div>
                  <span className="project-label">03 / AI productivity</span>
                  <span className="media-path">PROMPT <i /> REFINE <i /> CREATE</span>
                </div>
                <div className="project-card__copy">
                  <p className="project-number">03</p>
                  <h3>AI Content Muse</h3>
                  <p>A content-generation workflow for turning prompt ideas into structured drafts for blogs, emails, code, and other everyday content.</p>
                  <p className="project-detail">Built with Lovable as an individual project focused on prompt optimization, prompt libraries, content structuring, and AI productivity.</p>
                  <div className="tag-row">{["Lovable", "Prompt Engineering", "Generative AI", "Content Workflows"].map(tag => <span key={tag}>{tag}</span>)}</div>
                  <a href="https://prompt-craft-studio-456.lovable.app" target="_blank" rel="noreferrer" className="project-link">Open live app <ArrowUpRight size={13} /></a>
                </div>
              </motion.article>

              <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.22 }} className="project-card project-card--reverse">
                <div className="project-card__media project-art project-art--atlas">
                  <div className="atlas-screen"><div className="atlas-screen__head"><span>SENTIMENT ATLAS</span><b>LIVE ANALYSIS</b></div><div className="atlas-bars"><i /><i /><i /><i /><i /></div><div className="atlas-axis"><span>VADER</span><span>HUGGING FACE</span></div><div className="atlas-orb" /></div>
                  <span className="project-label">04 / Data intelligence</span>
                  <span className="media-path">TEXT <i /> CSV <i /> WEB</span>
                </div>
                <div className="project-card__copy">
                  <p className="project-number">04</p>
                  <h3>Sentiment<br />Atlas</h3>
                  <p>A secure, data-backed workspace for comparing VADER and Hugging Face sentiment results across text, CSV datasets, and public webpages.</p>
                  <p className="project-detail">Includes authenticated history, owner-scoped reports, bounded link extraction, downloadable HTML insights, and persisted dataset metrics.</p>
                  <div className="tag-row">{["React", "TypeScript", "tRPC", "Supabase", "Hugging Face", "VADER"].map(tag => <span key={tag}>{tag}</span>)}</div>
                  <a href="https://aisentiment-sp7zjfjg.manus.space" target="_blank" rel="noreferrer" className="project-link">View live demo <ArrowUpRight size={13} /></a>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="content-wrap">
            <SectionTitle index="04" title="Let’s work together." kicker="Open channel" />
            <div className="contact-grid">
              <motion.div {...reveal} className="contact-details">
                <p>Have a product, system, or question in mind? Send a message and let’s start the right conversation.</p>
                <a href="mailto:thenjiwembi67@gmail.com"><Mail size={16} /><span><small>Email</small>thenjiwembi67@gmail.com</span><ArrowUpRight size={14} /></a>
                <a href="tel:+27721613975"><Sparkles size={16} /><span><small>Phone</small>+27 72 161 3975</span><ArrowUpRight size={14} /></a>
                <a href="https://www.google.com/maps/search/?api=1&query=Cape+Town%2C+South+Africa" target="_blank" rel="noreferrer"><MapPin size={16} /><span><small>Based in</small>Cape Town, South Africa</span><ArrowUpRight size={14} /></a>
                <div className="social-links"><span>Elsewhere</span><a href="https://github.com/thenjiwembi" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><Github size={17} /></a><a href="https://za.linkedin.com/in/thenjiwe-mbi" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><Linkedin size={17} /></a></div>
              </motion.div>

              <motion.form {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} onSubmit={sendEmail} className="contact-form contact-form--light">
                <div className="form-header"><span>NEW MESSAGE</span><ServerCog size={16} /></div>
                <div className="form-row">
                  <label>Name<Input required value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} placeholder="Your name" /></label>
                  <label>Email<Input required type="email" value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} placeholder="you@email.com" /></label>
                </div>
                <label>Message<Textarea required value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} placeholder="Tell me a little about your idea..." /></label>
                <div className="form-footer"><small>{contactStatus === "error" ? "Delivery failed. Please try again or use the email link." : "Messages are delivered directly to Thenjiwe’s email."}</small><Button type="submit" disabled={contactStatus === "sending"} className="ember-button">{contactStatus === "sending" ? "Sending..." : "Send message"} <Send size={14} /></Button></div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <div className="assistant-widget-root">
        {assistantOpen ? <div className="assistant-widget-popover" role="dialog" aria-label="MBI T software development assistant">
          <div className="assistant-panel__header"><span><i /> MBI T / DEV ASSIST</span><button type="button" onClick={() => setAssistantOpen(false)} aria-label="Close assistant"><X size={15} /></button></div>
          <div className="assistant-widget__intro"><Bot size={19} /><div><strong>Ask me anything about my work.</strong><small>Skills, projects, tools, and software development.</small></div></div>
          <div className="assistant-messages" aria-live="polite">
            {assistantMessages.length === 0 ? <div className="assistant-empty"><p>What would you like to know?</p><small>Your question will be answered using the information on this portfolio.</small></div> : null}
            {assistantMessages.map((message, index) => <div key={`${message.role}-${index}`} className={`assistant-message assistant-message--${message.role}`}><span>{message.role === "user" ? "YOU" : "MBI T"}</span><div>{message.role === "assistant" ? <Streamdown>{message.content}</Streamdown> : message.content}</div></div>)}
            {assistantMutation.isPending ? <div className="assistant-message assistant-message--assistant"><span>MBI T</span><div className="assistant-thinking"><Loader2 size={14} className="animate-spin" /> Thinking through it...</div></div> : null}
            {assistantError ? <div className="assistant-error" role="alert"><div><strong>Couldn’t reach the assistant.</strong><small>Try again or use the contact form below.</small></div><button type="button" onClick={retryAssistant}>Retry <RotateCcw size={11} /></button></div> : null}
          </div>
          {assistantMessages.length === 0 ? <div className="assistant-widget__suggestions">{["What can you build?", "Tell me about GOVGUIDE AI"].map(prompt => <button key={prompt} type="button" onClick={() => setAssistantQuestion(prompt)}>{prompt}</button>)}</div> : null}
          <form onSubmit={askAssistant} className="assistant-input-row">
            <Input autoFocus={assistantOpen} value={assistantQuestion} onChange={event => setAssistantQuestion(event.target.value)} placeholder="Type your question..." aria-label="Ask the software development assistant" maxLength={800} />
            <Button type="submit" disabled={assistantMutation.isPending || !assistantQuestion.trim()} className="ember-button">Ask <Send size={13} /></Button>
          </form>
          {assistantMessages.length > 0 ? <button type="button" onClick={() => { setAssistantMessages([]); setAssistantError(false); }} className="assistant-reset"><RotateCcw size={11} /> Clear conversation</button> : null}
        </div> : null}
        <button type="button" onClick={() => setAssistantOpen(open => !open)} className={`assistant-fab${assistantOpen ? " is-open" : ""}`} aria-label={assistantOpen ? "Close software development assistant" : "Open software development assistant"} aria-expanded={assistantOpen}>
          {assistantOpen ? <X size={21} /> : <Bot size={21} />}
          <span className="assistant-fab__ping" />
        </button>
      </div>

      <footer><span>© {new Date().getFullYear()} MBI T...</span><span>End-user software products / Cape Town</span><button type="button" onClick={() => goTo("top")}>Back to top <ArrowUpRight size={13} /></button></footer>
    </div>
  );
}
