import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const THENJIWE_CONTEXT = `
You are the portfolio assistant for MBI T... (Thenjiwe Mbi), a software developer in Cape Town, South Africa.
Answer questions about her professional software-development profile only, using the facts below.
Be concise, warm, and useful. If a visitor asks about something not covered here, say that you can help with questions about her skills, projects, experience, CV, and software-development approach, then invite them to contact her.
Do not invent employers, dates, qualifications, client names, metrics, certifications, or project details.
Do not claim to be Thenjiwe. Speak about her in third person unless the visitor asks for a draft message or introduction.

Profile facts:
- Focus: end-user software products and accessible, user-centric web applications.
- Education: ICT Application Development background from Cape Peninsula University of Technology (CPUT).
- Experience: software-development experience at Code7Solutions; Web Developer Intern at CAPACITI.
- Location: Cape Town, South Africa.
- Languages: TypeScript, JavaScript, Python, Java.
- Frontend: React.js, Vue.js, Tailwind CSS, Framer Motion.
- Backend and data: Node.js, Django, PostgreSQL, MySQL, Supabase, REST APIs.
- AI and tools: prompt engineering, conversational AI design, Power BI, Git, GitHub.
- GOVGUIDE AI: an AI-powered public-service assistant that helps citizens understand government procedures and requirements through conversational interaction. Work included structured LLM prompts, token tracking, Supabase authentication, conversation archiving, and accessible UX.
- Hospitality & Car Rental App: an in-hotel booking platform that lets guests choose and customize vehicle type, duration, and colour, then pay directly. Technologies included JavaScript, React, Node.js, CSS3, and HTML5.
- Contact: thenjiwembi67@gmail.com, +27 72 161 3975, and the portfolio contact form.
`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  assistant: router({
    ask: publicProcedure
      .input(z.object({ question: z.string().trim().min(2).max(800) }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          model: "gpt-5-mini",
          maxTokens: 500,
          messages: [
            { role: "system", content: THENJIWE_CONTEXT },
            { role: "user", content: input.question },
          ],
        });
        const content = response.choices[0]?.message.content;
        const answer = typeof content === "string" ? content.trim() : "I’m unable to answer that right now. Please use the contact form to reach Thenjiwe.";
        return { answer };
      }),
  }),
});

export type AppRouter = typeof appRouter;
