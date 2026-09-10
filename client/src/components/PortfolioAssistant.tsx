import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Bot, Loader2, RotateCcw, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

type AssistantMessage = { role: "user" | "assistant"; content: string };

const promptSuggestions = [
  "What can Thenjiwe do?",
  "What did she study?",
  "What certificates does she have?",
  "How can I contact her?",
];

export default function PortfolioAssistant() {
  const [assistantOpen, setAssistantOpen] = useState(() => new URLSearchParams(window.location.search).get("assistant") === "open");
  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
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

  return (
    <div className="assistant-widget-root">
      {assistantOpen ? <div className="assistant-widget-popover" role="dialog" aria-label="MBI T software development assistant">
        <div className="assistant-panel__header"><span><i /> MBI T / DEV ASSIST</span><button type="button" onClick={() => setAssistantOpen(false)} aria-label="Close assistant"><X size={15} /></button></div>
        <div className="assistant-widget__intro"><Bot size={19} /><div><strong>Ask me anything about my portfolio.</strong><small>Work, education, skills, projects, certificates, CV, and contact.</small></div></div>
        <div className="assistant-messages" aria-live="polite">
          {assistantMessages.length === 0 ? <div className="assistant-empty"><p>What would you like to know?</p><small>Ask about Thenjiwe’s work, education, skills, projects, certificates, CV, or contact details.</small></div> : null}
          {assistantMessages.map((message, index) => <div key={`${message.role}-${index}`} className={`assistant-message assistant-message--${message.role}`}><span>{message.role === "user" ? "YOU" : "MBI T"}</span><div>{message.role === "assistant" ? <Streamdown>{message.content}</Streamdown> : message.content}</div></div>)}
          {assistantMutation.isPending ? <div className="assistant-message assistant-message--assistant"><span>MBI T</span><div className="assistant-thinking"><Loader2 size={14} className="animate-spin" /> Thinking through it...</div></div> : null}
          {assistantError ? <div className="assistant-error" role="alert"><div><strong>Couldn’t reach the assistant.</strong><small>Try again or use the contact form below.</small></div><button type="button" onClick={retryAssistant}>Retry <RotateCcw size={11} /></button></div> : null}
        </div>
        {assistantMessages.length === 0 ? <div className="assistant-widget__suggestions">{promptSuggestions.map(prompt => <button key={prompt} type="button" onClick={() => setAssistantQuestion(prompt)}>{prompt}</button>)}</div> : null}
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
  );
}
