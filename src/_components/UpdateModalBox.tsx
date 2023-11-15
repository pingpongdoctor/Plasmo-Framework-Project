import React from "react";
import { Translation } from "../../mongo/interface";
import { useState } from "react";

export default function UpdateModalBox({
  translation,
}: {
  translation: Translation;
}) {
  const [text, setText] = useState<string>(translation.originalContent);
  const [from, setFrom] = useState<"en" | "fr" | "es">(translation.from);
  const [to, setTo] = useState<"en" | "fr" | "es">(translation.to);
  const [translatedText, setTranslatedText] = useState<string>(
    translation.translatedContent
  );

  const handleSubmit = function () {};
  return (
    <div className="plasmo-flex plasmo-justify-center plasmo-items-center plasmo-w-[100vw] plasmo-h-[100vh] plasmo-bg-slate-300 plasmo-rounded-md plasmo-fixed plasmo-top-0 plasmo-left-0">
      <form className="plasmo-w-[30vw] plasmo-relative plasmo-flex plasmo-flex-col plasmo-gap-8 plasmo-p-10 plasmo-bg-blue-500 plasmo-rounded-md">
        <select
          id="to"
          className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
          defaultValue={from}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <select
          id="to"
          className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
          defaultValue={to}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <label htmlFor="text" className="plasmo-flex plasmo-items-center">
          Original Text
          <textarea
            id="text"
            className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md plasmo-w-full"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
            }}
            value={text}
          />
        </label>
        <label
          htmlFor="translated-text"
          className="plasmo-flex plasmo-items-center"
        >
          Translated Text
          <textarea
            id="translated-text"
            className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md plasmo-w-full"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setTranslatedText(e.target.value);
            }}
            value={translatedText}
          />
        </label>
        <div className="plasmo-absolute plasmo-top-2 plasmo-right-2 plasmo-font-bold plasmo-text-xl">
          X
        </div>
      </form>
    </div>
  );
}
