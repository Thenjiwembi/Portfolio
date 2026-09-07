import { Award, ArrowLeft, ArrowUpRight, Download, ExternalLink } from "lucide-react";

const certificates = [
  { title: "AI For Everyone", issuer: "DeepLearning.AI · Coursera", date: "13 Aug 2026", file: "/manus-storage/ThenjiweMbi_AI For Everyone_02a59411.pdf" },
  { title: "AI For Everyone", issuer: "DeepLearning.AI · Coursera", date: "13 Aug 2026", file: "/manus-storage/ThenjiweMbi_Coursera AI for Everyone_1aab6c67.pdf" },
  { title: "Discover the Art of Prompting", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/ThenjiweMbi_Discover the Art of Prompting_f0bcb386.pdf" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI and Amazon Web Services · Coursera", date: "24 Aug 2026", file: "/manus-storage/ThenjiweMbi_Genarative AI with large language Models_3a6d5829.pdf" },
  { title: "Introduction to AI", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/ThenjiweMbi_Introduction to AI_fe27e7b2.pdf" },
  { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM · Coursera", date: "17 Aug 2026", file: "/manus-storage/ThenjiweMbi_Introduction to Artificial Intelligence (AI)_2ec64471.pdf" },
  { title: "Introduction to Generative AI", issuer: "Google Cloud · Coursera", date: "20 Aug 2026", file: "/manus-storage/ThenjiweMbi_Introduction to Generative AI_13183791.pdf" },
  { title: "Maximize Productivity With AI Tools", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/ThenjiweMbi_Maximize Productivity With AI Tools_264d6d99.pdf" },
  { title: "Generative AI: Prompt Engineering Basics", issuer: "IBM · Coursera", date: "12 Aug 2026", file: "/manus-storage/ThenjiweMbi_Prompt Engineering Basics_49d1d0d3.pdf" },
  { title: "Python for Data Science, AI & Development", issuer: "IBM · Coursera", date: "20 Aug 2026", file: "/manus-storage/ThenjiweMbi_PythonForDataScience,AI andDeelopment_fe8529c8.pdf" },
  { title: "Stay Ahead of the AI Curve", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/ThenjiweMbi_Stay Ahead of the AI Curve_cb6aeb98.pdf" },
  { title: "Unsupervised Learning, Recommenders, Reinforcement Learning", issuer: "DeepLearning.AI and Stanford Online · Coursera", date: "27 Aug 2026", file: "/manus-storage/ThenjiweMbi_Unsupervised Learning, Recommenders,_b385ca79.pdf" },
  { title: "Use AI Responsibly", issuer: "Google · Coursera", date: "11 Aug 2026", file: "/manus-storage/ThenjiweMbi_Use AI Responsibly_bc4f2259.pdf" },
  { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI and Stanford Online · Coursera", date: "25 Aug 2026", file: "/manus-storage/ThenjiwMbi_Supervised Machine LearningRegression and_9c254358.pdf" },
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
    </main>
  );
}
