import React, { ChangeEvent, FormEvent } from "react";
import { Translation } from "../../mongo/interface";
import { useState } from "react";
import updateTranslation from "@/utils/updateTranslation";

export default function UpdateModalBox({
  translation,
}: {
  translation: Translation & { _id: string };
}) {
  const [text, setText] = useState<string>(translation.originalContent);
  const [from, setFrom] = useState<"en" | "fr" | "es">(translation.from);
  const [to, setTo] = useState<"en" | "fr" | "es">(translation.to);
  const [translatedText, setTranslatedText] = useState<string>(
    translation.translatedContent
  );
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateTranslation(from, to, text, translatedText, translation._id);
    if (isChanged && text && translatedText) {
    }
  };
  return (
    <div className="plasmo-flex plasmo-justify-center plasmo-items-center plasmo-w-[100vw] plasmo-h-[100vh] plasmo-bg-slate-300 plasmo-rounded-md plasmo-fixed plasmo-top-0 plasmo-left-0">
      <form className="plasmo-w-[30vw] plasmo-relative plasmo-flex plasmo-flex-col plasmo-gap-8 plasmo-p-10 plasmo-bg-blue-500 plasmo-rounded-md">
        <select
          id="to"
          className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
          defaultValue={from}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setFrom(e.target.value as "en" | "fr" | "es");
            setIsChanged(true);
          }}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <select
          id="to"
          className="plasmo-border plasmo-border-black focus:plasmo-outline-none plasmo-rounded-md"
          defaultValue={to}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setTo(e.target.value as "en" | "fr" | "es");
            setIsChanged(true);
          }}
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
              setIsChanged(true);
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setTranslatedText(e.target.value);
              setIsChanged(true);
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
