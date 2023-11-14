import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Translation } from "../../mongo/interface";
import { getSession, Session } from "@auth0/nextjs-auth0";

interface UserData {
  _id: string;
  name: string;
  translations: Translation & { _id: string };
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/login`,
        permanent: false,
      },
    };
  }
  console.log(session);
  return {
    props: {},
  };
};

// satisfies GetServerSideProps<{
//   userData: UserData;
// }>;

export default function Home() {
  return (
    <div>
      <h1 className="plasmo-text-red-400 plasmo-font-roboto">
        Translate Text Chrome Extension
      </h1>
      <Link href={`/api/auth/logout?returnTo=http://localhost:1947`}>
        Logout
      </Link>
    </div>
  );
}
