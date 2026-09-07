import { ArrowLeft, BookOpen, GraduationCap, MapPin } from "lucide-react";

const education = [
  {
    qualification: "Diploma in ICT Application Development",
    institution: "Cape Peninsula University of Technology",
    period: "2022 – 2025",
    detail: "A practical foundation in application development, software design, data, and problem-solving.",
    icon: GraduationCap,
  },
  {
    qualification: "National Senior Certificate (Matric)",
    institution: "Leseding Technical Secondary School",
    period: "2020",
    detail: "Completed secondary education with a technical foundation for further study in information and communication technology.",
    icon: BookOpen,
  },
];

export default function Education() {
  return (
    <main className="standalone-page">
      <header className="standalone-header">
        <a href="/" className="standalone-brand" aria-label="Back to Thenjiwe Mbi portfolio">MBI T...</a>
        <a href="/" className="standalone-back"><ArrowLeft size={14} /> Back to portfolio</a>
      </header>

      <section className="standalone-hero">
        <p className="standalone-kicker">02 / Background</p>
        <h1>Education</h1>
        <p>Academic foundations that shaped how I approach software development, product thinking, and practical problem-solving.</p>
      </section>

      <section className="standalone-content" aria-label="Education history">
        <div className="education-list">
          {education.map(({ qualification, institution, period, detail, icon: Icon }, index) => (
            <article className="education-card" key={qualification}>
              <div className="education-card__index">0{index + 1}</div>
              <div className="education-card__icon"><Icon size={22} /></div>
              <div className="education-card__body">
                <p className="education-card__period">{period}</p>
                <h2>{qualification}</h2>
                <p className="education-card__institution"><MapPin size={14} /> {institution}</p>
                <p className="education-card__detail">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
