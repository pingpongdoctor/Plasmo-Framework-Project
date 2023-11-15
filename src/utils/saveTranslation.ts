export default async function saveTranslation(
  from: "en" | "fr" | "es",
  to: "en" | "fr" | "es",
  originalContent: string,
  translatedContent: string
): Promise<{ message: string }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/translation/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, originalContent, translatedContent }),
      }
    );
    if (!res.ok) {
      throw Error("Error when adding translation");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error in saving translation function");
  }
}
