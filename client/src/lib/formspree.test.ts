import { describe, expect, it, vi } from "vitest";
import { FORMSPREE_ENDPOINT, submitContact } from "./formspree";

const payload = {
  name: "A Visitor",
  email: "visitor@example.com",
  message: "I would like to discuss a web application.",
};

describe("submitContact", () => {
  it("posts the contact form to the configured Formspree endpoint", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({ ok: true } as Response);

    await submitContact(payload, fetchMock);

    expect(fetchMock).toHaveBeenCalledWith(FORMSPREE_ENDPOINT, expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    }));
    expect(JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string)).toMatchObject({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    });
  });

  it("throws when Formspree rejects the submission", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({ ok: false } as Response);

    await expect(submitContact(payload, fetchMock)).rejects.toThrow("Formspree submission failed");
  });
});
