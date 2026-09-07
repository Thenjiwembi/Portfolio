import { Award, ArrowLeft, FileUp } from "lucide-react";

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
        <div className="certificate-empty">
          <div className="certificate-empty__icon"><Award size={26} /></div>
          <div>
            <p className="standalone-kicker">Ready for your uploads</p>
            <h2>Your certificates will appear here.</h2>
            <p>Upload your certificate PDFs or clear image scans in the chat. I’ll organize each one with its name, issuing institution, date, and a Preview or Download action without inventing any details.</p>
            <span className="certificate-empty__note"><FileUp size={15} /> Multiple files or one ZIP folder are supported.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
