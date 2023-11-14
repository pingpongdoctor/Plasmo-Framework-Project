export default async function getTranslation(
  from: "en" | "fr" | "es",
  to: "en" | "fr" | "es",
  text: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/api/translation/translate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, text }),
    }
  );
  if (!res.ok) {
    return null;
  }

  const translation = await res.json();

  return translation.message;
}
