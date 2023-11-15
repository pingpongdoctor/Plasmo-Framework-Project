export default async function updateTranslation(
  from: "en" | "fr" | "es",
  to: "en" | "fr" | "es",
  originalContent: string,
  translatedContent: string,
  translationId: string
): Promise<void> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/translation/${translationId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ from, to, originalContent, translatedContent }),
      }
    );

    if (!res.ok) {
      throw new Error("Error deleting translation");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in updating translation function");
  }
}
