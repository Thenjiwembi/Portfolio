export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeqqjyz";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function submitContact(
  payload: ContactPayload,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  const response = await fetchImpl(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...payload,
      _subject: `Portfolio message from ${payload.name}`,
    }),
  });

  if (!response.ok) {
    throw new Error("Formspree submission failed");
  }
}
