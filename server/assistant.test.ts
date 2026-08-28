import { describe, expect, it, vi } from "vitest";

const invokeLLMMock = vi.fn();

vi.mock("./_core/llm", () => ({
  invokeLLM: invokeLLMMock,
}));

const { appRouter } = await import("./routers");

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

  it("rejects empty or overlong questions before invoking the model", async () => {
    invokeLLMMock.mockClear();
    const caller = appRouter.createCaller(createContext());

    await expect(caller.assistant.ask({ question: " " })).rejects.toThrow();
    await expect(caller.assistant.ask({ question: "x".repeat(801) })).rejects.toThrow();
    expect(invokeLLMMock).not.toHaveBeenCalled();
  });
});
