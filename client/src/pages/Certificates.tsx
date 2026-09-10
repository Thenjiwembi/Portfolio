import PortfolioAssistant from "@/components/PortfolioAssistant";
import { Award, ArrowLeft, ArrowUpRight, Download, ExternalLink } from "lucide-react";

const certificates = [
  { title: "AI For Everyone", issuer: "DeepLearning.AI · Coursera", date: "13 Aug 2026", file: "/manus-storage/certificate-01-ai-for-everyone_138d0ae7.pdf" },
  { title: "AI For Everyone", issuer: "DeepLearning.AI · Coursera", date: "13 Aug 2026", file: "/manus-storage/certificate-02-ai-for-everyone_39b1d396.pdf" },
  { title: "Discover the Art of Prompting", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/certificate-03-discover-the-art-of-prompting_d1e98125.pdf" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI and Amazon Web Services · Coursera", date: "24 Aug 2026", file: "/manus-storage/certificate-04-generative-ai-large-language-models_537bde14.pdf" },
  { title: "Introduction to AI", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/certificate-05-introduction-to-ai_a80609c3.pdf" },
  { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM · Coursera", date: "17 Aug 2026", file: "/manus-storage/certificate-06-introduction-to-artificial-intelligence_c8a2fb50.pdf" },
  { title: "Introduction to Generative AI", issuer: "Google Cloud · Coursera", date: "20 Aug 2026", file: "/manus-storage/certificate-07-introduction-to-generative-ai_74a53cdf.pdf" },
  { title: "Maximize Productivity With AI Tools", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/certificate-08-maximize-productivity-with-ai-tools_aa78dc8f.pdf" },
  { title: "Generative AI: Prompt Engineering Basics", issuer: "IBM · Coursera", date: "12 Aug 2026", file: "/manus-storage/certificate-09-prompt-engineering-basics_29ee32e8.pdf" },
  { title: "Python for Data Science, AI & Development", issuer: "IBM · Coursera", date: "20 Aug 2026", file: "/manus-storage/certificate-10-python-data-science-ai-development_9e3fedfd.pdf" },
  { title: "Stay Ahead of the AI Curve", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/certificate-11-stay-ahead-of-the-ai-curve_dd1c5fc3.pdf" },
  { title: "Unsupervised Learning, Recommenders, Reinforcement Learning", issuer: "DeepLearning.AI and Stanford Online · Coursera", date: "27 Aug 2026", file: "/manus-storage/certificate-12-unsupervised-learning-recommenders_a301e414.pdf" },
  { title: "Use AI Responsibly", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/certificate-13-use-ai-responsibly_30c3e5fb.pdf" },
  { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI and Stanford Online · Coursera", date: "25 Aug 2026", file: "/manus-storage/certificate-14-supervised-machine-learning_8453c275.pdf" },
];

export default function Certificates() {
  return (
    <main className="standalone-page">
      <header className="standalone-header">
        <a href="/" className="standalone-brand" aria-label="Back to Thenjiwe Mbi portfolio">MBI T...</a>
        <a href="/" className="standalone-back"><ArrowLeft size={14} /> Back to portfolio</a>
      </header>

      <section className="standalone-hero">
        <p className="standalone-kicker">03 / Continuous learning</p>
        <h1>Certificates</h1>
        <p>A growing collection of verified learning and professional development milestones.</p>
      </section>

      <section className="standalone-content" aria-label="Certificates">
        <div className="certificate-summary"><Award size={18} /><span><strong>{certificates.length} certificates</strong> across AI, prompt engineering, machine learning, and data science.</span></div>
        <div className="certificate-grid">
          {certificates.map((certificate, index) => (
            <article className="certificate-card" key={`${certificate.title}-${certificate.file}`}>
              <div className="certificate-card__top"><span>0{index + 1}</span><Award size={16} /></div>
              <p className="certificate-card__date">{certificate.date}</p>
              <h2>{certificate.title}</h2>
              <p className="certificate-card__issuer">{certificate.issuer}</p>
              <div className="certificate-card__actions">
                <a href={certificate.file} target="_blank" rel="noreferrer"><ExternalLink size={13} /> Preview</a>
                <a href={certificate.file} download><Download size={13} /> Download</a>
              </div>
              <a href={certificate.file} target="_blank" rel="noreferrer" className="certificate-card__open">Open certificate <ArrowUpRight size={13} /></a>
            </article>
          ))}
        </div>
      </section>
      <PortfolioAssistant />
    </main>
  );
}
