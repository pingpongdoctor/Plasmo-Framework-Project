import Translate from "translate";

export async function translateFunc(
  text: string,
  from: "en" | "fr" | "es",
  to: "en" | "fr" | "es"
): Promise<string> {
  try {
    const translatedText: string = await Translate(text, {
      from,
      to,
      key: process.env.TRANSLATE_API_KEY,
    });
    return translatedText;
  } catch (error) {
    throw new Error(`Error translating text:${error}`);
  }
}
