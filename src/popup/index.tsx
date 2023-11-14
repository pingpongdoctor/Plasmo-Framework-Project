import "@/_styles/globals.css";
import { useState, useEffect } from "react";

function IndexPopup() {
  const [text, setText] = useState<string>("");
  const [from, setFrom] = useState<"en" | "fr" | "es">("en");
  const [to, setTo] = useState<"en" | "fr" | "es">("fr");
  const [translatedText, setTranslatedText] = useState<string>("");
  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!text) {
        alert("Please insert text");
        return;
      }

      const res = await fetch(
        `${process.env.PLASMO_PUBLIC_BASE_URL}/api/translation/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from, to, text }),
        }
      );

      if (!res.ok) {
        throw Error("Error translating");
      }

      const translation: { message: string } = await res.json();
      console.log(translation.message);
      setTranslatedText(translation.message);
    } catch (error) {
      console.log(error);
      setText("");
    }
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-p-[1rem] plasmo-w-[250px]">
      <form
        className="plasmo-flex plasmo-flex-col plasmo-w-full"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="inputText"
          className="plasmo-font-bold plasmo-flex plasmo-flex-col"
        >
          Enter text for translation:
          <textarea
            id="inputText"
            className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setTo(e.target.value as "en" | "fr" | "es");
            }}
            defaultValue={"fr"}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>

        <p
          className={`plasmo-font-bold plasmo-mt-[1rem] ${
            translatedText ? "" : "plasmo-mb-[1rem]"
          }`}
        >
          Here is translated text:
        </p>
        {translatedText && <p className="plasmo-my-[1rem]">{translatedText}</p>}

        <button
          className={`plasmo-text-blue-400 plasmo-font-semibold plasmo-bg-black plasmo-p-2 plasmo-rounded-md ${
            translatedText ? "plasmo-mb-[1rem]" : ""
          }`}
          type="submit"
        >
          Translate now
        </button>
      </form>
    </div>
  );
}

export default IndexPopup;
