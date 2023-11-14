import Link from "next/link";
import type { GetServerSideProps } from "next";
import getUser from "../utils/getUser";
import { Translation } from "../../mongo/interface";

export const getServerSideProps = (async (context: any) => {
  const user: UserWithPopulatedTransactions = await getUser(
    context.req,
    context.res
  );

  if (!user) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}) satisfies GetServerSideProps<{
  user: UserWithPopulatedTransactions;
}>;

export default function Home({
  user,
}: {
  user: UserWithPopulatedTransactions;
}) {
  console.log(user);
  return (
    <div className="plasmo-flex plasmo-justify-between plasmo-px-[2rem]">
      <div>
        <h1 className="plasmo-text-red-400 plasmo-font-roboto">
          Translate Text
        </h1>
        <p className="plasmo-mb-4">Welcome back {user.name}</p>
        <p className="plasmo-font-bold">Your translations are</p>
        <ul>
          {user.translations.map(
            (translation: Translation & { _id: string }) => (
              <li key={translation._id}>{translation.translatedContent}</li>
            )
          )}
        </ul>
      </div>
      <Link href={`/api/auth/logout?returnTo=http://localhost:1947`}>
        Logout
      </Link>
    </div>
  );
}
