import { ChangeEvent, FormEvent, useState } from "react";
import getTranslation from "@/utils/getTranslation";

export default function TranslationForm() {
  const [text, setText] = useState<string>("");
  const [from, setFrom] = useState<"en" | "fr" | "es">("en");
  const [to, setTo] = useState<"en" | "fr" | "es">("fr");
  const [translatedText, setTranslatedText] = useState<string>("");

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    console.log("running");
    e.preventDefault();
    try {
      if (!text) {
        alert("Please insert text");
        return;
      }

      const translation = await getTranslation(from, to, text);
      console.log(translation);
      setTranslatedText(translation);
    } catch (error) {
      console.log(error);
      setText("");
    }
  };
  return (
    <div>
      <form className="plasmo-flex plasmo-flex-col" onSubmit={handleSubmit}>
        <label
          htmlFor="inputText"
          className="plasmo-font-bold plasmo-flex plasmo-flex-col"
        >
          Enter text for translation:
          <textarea
            id="inputText"
            className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
            }}
          />
        </label>

        <label
          htmlFor="from"
          className="plasmo-font-bold plasmo-flex plasmo-flex-col"
        >
          From language:
          <select
            id="from"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setFrom(e.target.value as "en" | "fr" | "es");
            }}
            className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
            defaultValue={"en"}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>

        <label
          htmlFor="to"
          className="plasmo-font-bold plasmo-flex plasmo-flex-col"
        >
          From language:
          <select
            id="to"
            className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setTo(e.target.value as "en" | "fr" | "es");
            }}
            defaultValue={"fr"}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>

        <button
          className="plasmo-text-blue-400 plasmo-font-semibold plasmo-bg-black plasmo-mt-[1rem]"
          type="submit"
        >
          Translate now
        </button>
      </form>

      <div className="plasmo-mt-[2rem]">
        <p className="plasmo-font-bold">Here is translated text</p>
        {translatedText && <p>{translatedText}</p>}
        {translatedText && (
          <button className="plasmo-text-blue-400 plasmo-font-semibold plasmo-bg-black plasmo-mt-[1rem] plasmo-p-[5px]">
            Save this translation
          </button>
        )}
      </div>
    </div>
  );
}
