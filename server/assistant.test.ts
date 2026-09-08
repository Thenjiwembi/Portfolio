import { describe, expect, it, vi } from "vitest";

const invokeLLMMock = vi.fn();

vi.mock("./_core/llm", () => ({
  invokeLLM: invokeLLMMock,
}));

const { appRouter, THENJIWE_CONTEXT } = await import("./routers");

type TestContext = Parameters<typeof appRouter.createCaller>[0];

const createContext = (): TestContext => ({
  user: null,
  req: { protocol: "https", headers: {} } as TestContext["req"],
  res: {} as TestContext["res"],
});

describe("assistant.ask", () => {
  it("returns the assistant response for a valid software question", async () => {
    invokeLLMMock.mockResolvedValueOnce({
      choices: [{ message: { content: "Thenjiwe works with React, TypeScript, and Node.js." } }],
    });

    const caller = appRouter.createCaller(createContext());
    const result = await caller.assistant.ask({ question: "Which tools does Thenjiwe use?" });

    expect(result.answer).toContain("React");
    expect(invokeLLMMock).toHaveBeenCalledWith(expect.objectContaining({
      model: "gpt-5-mini",
      messages: expect.arrayContaining([
        expect.objectContaining({ role: "user", content: "Which tools does Thenjiwe use?" }),
      ]),
    }));
  });

  it("grounds the model prompt in the complete portfolio context", () => {
    expect(THENJIWE_CONTEXT).toContain("Cape Peninsula University of Technology (CPUT)");
    expect(THENJIWE_CONTEXT).toContain("Code7Solutions");
    expect(THENJIWE_CONTEXT).toContain("AI Content Muse / Prompt Craft Studio");
    expect(THENJIWE_CONTEXT).toContain("Sentiment Atlas");
    expect(THENJIWE_CONTEXT).toContain("14 Coursera certificates");
    expect(THENJIWE_CONTEXT).toContain("thenjiwembi67@gmail.com");
    expect(THENJIWE_CONTEXT).toContain("Do not invent employers, dates, qualifications");
  });

  it("returns grounded answers for broad portfolio question categories", async () => {
    invokeLLMMock.mockReset();
    const responses = [
      ["What did she study?", "Thenjiwe studied for a Diploma in ICT Application Development at CPUT.", "Diploma in ICT Application Development"],
      ["What certificates does she have?", "The Certificates page lists 14 Coursera certificates across AI and machine learning.", "14 Coursera certificates"],
      ["Tell me about Sentiment Atlas.", "Sentiment Atlas compares VADER and Hugging Face sentiment results.", "Sentiment Atlas"],
      ["How can I contact her?", "You can email Thenjiwe at thenjiwembi67@gmail.com.", "thenjiwembi67@gmail.com"],
      ["Where can I find her CV?", "Use the Preview CV or Download CV controls on the homepage.", "Preview CV and Download CV"],
    ] as const;

    for (const [question, answer] of responses) {
      invokeLLMMock.mockResolvedValueOnce({ choices: [{ message: { content: answer } }] });
    }

    const caller = appRouter.createCaller(createContext());
    for (const [question, expectedAnswer, groundingFact] of responses) {
      const result = await caller.assistant.ask({ question });
      expect(result.answer).toBe(expectedAnswer);
      const call = invokeLLMMock.mock.calls[invokeLLMMock.mock.calls.length - 1]?.[0];
      const systemMessage = call?.messages?.find((message: { role: string }) => message.role === "system");
      expect(systemMessage?.content).toBe(THENJIWE_CONTEXT);
      expect(systemMessage?.content).toContain(groundingFact);
    }

    expect(invokeLLMMock).toHaveBeenCalledTimes(responses.length);
    for (const [question] of responses) {
      expect(invokeLLMMock).toHaveBeenCalledWith(expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({ role: "user", content: question }),
        ]),
      }));
    }
  });

  it("constrains unsupported questions to the portfolio scope", () => {
    expect(THENJIWE_CONTEXT).toContain("For unrelated questions");
    expect(THENJIWE_CONTEXT).toContain("grounded in Thenjiwe’s portfolio");
    expect(THENJIWE_CONTEXT).toContain("Do not invent employers, dates, qualifications");
  });

  it("rejects empty or overlong questions before invoking the model", async () => {
    invokeLLMMock.mockClear();
    const caller = appRouter.createCaller(createContext());

    await expect(caller.assistant.ask({ question: " " })).rejects.toThrow();
    await expect(caller.assistant.ask({ question: "x".repeat(801) })).rejects.toThrow();
    expect(invokeLLMMock).not.toHaveBeenCalled();
  });
});
