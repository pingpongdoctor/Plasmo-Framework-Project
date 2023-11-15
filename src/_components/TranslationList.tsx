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
    <ul>
      {user &&
        user.translations.map((translation: Translation & { _id: string }) => (
          <li
            key={translation._id}
            className="plasmo-flex plasmo-justify-between"
          >
            <p>{translation.translatedContent}</p>
            <button
              onClick={async () => {
                await deleteTranslation(translation._id);
                router.push("/");
              }}
              className="plasmo-text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}
