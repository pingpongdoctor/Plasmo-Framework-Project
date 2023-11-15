import React from "react";
import { Translation } from "../../mongo/interface";
import deleteTranslation from "@/utils/deleteTranslation";
import { useRouter } from "next/navigation";
export default function TranslationList({
  user,
}: {
  user: UserWithPopulatedTransactions;
}) {
  const router = useRouter();
  return (
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
              <tr className="plasmo-border-b">
                <td className="plasmo-px-6 plasmo-py-4 plasmo-font-medium">
                  {index + 1}
                </td>
                <td className="plasmo-px-6 plasmo-py-4">{translation.from}</td>
                <td className="plasmo-px-6 plasmo-py-4">{translation.to}</td>
                <td className="plasmo-px-6 plasmo-py-4">
                  {translation.originalContent}
                </td>
                <td className="plasmo-px-6 plasmo-py-4">
                  abcabcabcabcabcabcabcabcabcabcabc
                  abcabcabcabcabcabcabcabcabcabcabc
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
                    onClick={async () => {}}
                    className="plasmo-text-red-500 plasmo-font-medium plasmo-bg-black plasmo-p-2 plasmo-rounded-md"
                  >
                    Update
                  </button>
                </td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
}
