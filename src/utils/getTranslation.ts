export default async function getTranslation(
  from: "en" | "fr" | "es",
  to: "en" | "fr" | "es",
  text: string
): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/translation/translate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, text }),
      }
    );
    if (!res.ok) {
      throw Error("Error getting translation");
    }

    const translation: { message: string } = await res.json();

    return translation.message;
  } catch (error) {
    console.log(error);
    throw Error("Error in getting translation function");
  }
}
