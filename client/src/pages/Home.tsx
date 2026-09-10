/**
 * Reference-led reminder: use a compact blue-black developer profile with ember-orange portrait
 * halo, slim navigation, strong left-aligned type, and thin connected rules throughout.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import { submitContact } from "@/lib/formspree";
import { motion } from "framer-motion";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Download,
  BrainCircuit,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  ServerCog,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const portraitImage = "/manus-storage/thenjiwe-mbi-portrait_855f98d3.jpg";
const cvFile = "/manus-storage/Thenjiwe_Mbi_CV_1c3e8cd7.pdf";
const govGuideImage = "/manus-storage/govguide-ai-visual_9b2bc022.jpg";
const mobilityImage = "/manus-storage/mobility-booking-visual_e8a487a0.jpg";
const signalMark = "/manus-storage/thenjiwe-signal-mark_1e1e740e.png";

const navigation = ["Home", "About", "Skills", "Projects", "Education", "Certificates", "Contact"];

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const goTo = (section: string) => {
    setMenuOpen(false);
    if (section === "education" || section === "certificates") {
      window.location.href = `/${section}`;
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
              <div className="portrait-frame">
                <img src={portraitImage} alt="Thenjiwe Mbi" />
              </div>
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
                  <p>As the <strong>Group Lead and Front-end Designer</strong>, I helped shape GOVGUIDE AI into an accessible public-service assistant that helps citizens understand government procedures and requirements through conversation.</p>
                  <p className="project-detail">I designed and developed the front-end experience with React, TypeScript, and Tailwind CSS, connecting structured LLM prompts, token tracking, Supabase authentication, conversation archiving, and accessible UX.</p>
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
                  <p>I focused on the <strong>backend development</strong> of this in-hotel booking platform, which lets guests choose, customize, and pay for rental vehicles directly.</p>
                  <p className="project-detail">Using JavaScript, Node.js, React, CSS3, and HTML5, I worked on the server-side logic and data flow supporting vehicle type, duration, colour selection, and the guest-first booking flow.</p>
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
                  <p>I created the <strong>entire AI Content Muse project independently</strong> as an individual build for turning prompt ideas into structured drafts for blogs, emails, code, and other everyday content.</p>
                  <p className="project-detail">Built with Lovable, I developed the full workflow around prompt optimization, prompt libraries, content structuring, generative AI, and practical AI productivity.</p>
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
                  <p>I focused on the <strong>backend and database development</strong> of this secure workspace for comparing VADER and Hugging Face sentiment results across text, CSV datasets, and public webpages.</p>
                  <p className="project-detail">Using React, TypeScript, tRPC, Supabase, Hugging Face, and VADER, I worked on authenticated history, owner-scoped reports, bounded link extraction, downloadable HTML insights, and persisted dataset metrics.</p>
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
                <p>Have an idea, a product challenge, or a system that needs a clearer path? Tell me what you’re working toward and let’s find a useful next step.</p>
                <a href="mailto:thenjiwembi67@gmail.com"><Mail size={16} /><span><small>Email</small>thenjiwembi67@gmail.com</span><ArrowUpRight size={14} /></a>
                <a href="tel:+27721613975"><Sparkles size={16} /><span><small>Phone</small>+27 72 161 3975</span><ArrowUpRight size={14} /></a>
                <a href="https://www.google.com/maps/search/?api=1&query=Cape+Town%2C+South+Africa" target="_blank" rel="noreferrer"><MapPin size={16} /><span><small>Based in</small>Cape Town, South Africa</span><ArrowUpRight size={14} /></a>
                <div className="social-links"><span>Elsewhere</span><a href="https://github.com/thenjiwembi" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><Github size={17} /></a><a href="https://za.linkedin.com/in/thenjiwe-mbi" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><Linkedin size={17} /></a></div>
              </motion.div>

              <motion.form {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} onSubmit={sendEmail} className="contact-form contact-form--light">
                <div className="form-header"><div><span>CONTACT ME</span><h3>Contact me</h3><p>Have an idea or question? Send a message and I’ll get back to you.</p></div><div className="form-header__icon"><Sparkles size={17} /></div></div>
                <div className="contact-form__prompts"><span>Let’s talk about</span><b>web apps</b><b>AI features</b><b>product ideas</b></div>
                <div className="form-row">
                  <label>Name<Input required value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} placeholder="Your name" /></label>
                  <label>Email<Input required type="email" value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} placeholder="you@email.com" /></label>
                </div>
                <label>Message<Textarea required value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} placeholder="Write your message..." /></label>
                <div className="form-footer"><small>{contactStatus === "error" ? "Delivery failed. Please try again or use the email link." : "Messages go directly to Thenjiwe’s email. No perfect pitch required."}</small><Button type="submit" disabled={contactStatus === "sending"} className="ember-button">{contactStatus === "sending" ? "Sending..." : "Start the conversation"} <Send size={14} /></Button></div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <PortfolioAssistant />

      <footer><span>© {new Date().getFullYear()} MBI T...</span><span>End-user software products / Cape Town</span><button type="button" onClick={() => goTo("top")}>Back to top <ArrowUpRight size={13} /></button></footer>
    </div>
  );
}
