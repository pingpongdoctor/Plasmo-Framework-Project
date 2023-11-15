import React from "react";
import { Translation } from "../../mongo/interface";
import deleteTranslation from "@/utils/deleteTranslation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateModalBox from "./UpdateModalBox";

interface Languages {
  [index: string]: string;
  en: string;
  es: string;
  fr: string;
}
const languages: Languages = {
  en: "English",
  es: "Spanish",
  fr: "French",
};

export default function TranslationList({
  user,
}: {
  user: UserWithPopulatedTransactions;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleUpdateIsOpen = function (value: boolean) {
    setIsOpen(value);
  };
  return (
    <div>
      {" "}
      <table className="plasmo-w-[50vw] plasmo-text-sm plasmo-font-light">
        <thead className="plasmo-border-b plasmo-font-medium">
          <tr>
            <th scope="col" className="plasmo-px-6 plasmo-py-4">
              #
            </th>
            <th scope="col" className="plasmo-px-6 plasmo-py-4">
              From
            </th>
            <th scope="col" className="plasmo-px-6 plasmo-py-4">
              To
            </th>
            <th scope="col" className="plasmo-px-6 plasmo-py-4">
              Original Text
            </th>
            <th scope="col" className="plasmo-px-6 plasmo-py-4">
              Translated Text
            </th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.translations.map(
              (translation: Translation & { _id: string }, index: number) => (
                <tr className="plasmo-border-b" key={translation._id}>
                  <td className="plasmo-px-6 plasmo-py-4 plasmo-font-medium">
                    {index + 1}
                  </td>
                  <td className="plasmo-px-6 plasmo-py-4">
                    {languages[translation.from]}
                  </td>
                  <td className="plasmo-px-6 plasmo-py-4">
                    {languages[translation.to]}
                  </td>
                  <td className="plasmo-px-6 plasmo-py-4">
                    {translation.originalContent}
                  </td>
                  <td className="plasmo-px-6 plasmo-py-4">
                    {translation.translatedContent}
                  </td>
                  <td className="plasmo-px-6 plasmo-py-4">
                    <button
                      onClick={async () => {
                        await deleteTranslation(translation._id);
                        router.push("/");
                      }}
                      className="plasmo-text-red-500 plasmo-font-medium plasmo-bg-black plasmo-p-2 plasmo-rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="plasmo-px-6 plasmo-py-4">
                    <button
                      onClick={() => {
                        if (!isOpen) {
                          setIsOpen(true);
                        }
                      }}
                      className="plasmo-text-red-500 plasmo-font-medium plasmo-bg-black plasmo-p-2 plasmo-rounded-md"
                    >
                      Update
                    </button>
                  </td>
                  {isOpen && (
                    <UpdateModalBox
                      translation={translation}
                      handleUpdateIsOpen={handleUpdateIsOpen}
                    />
                  )}
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
