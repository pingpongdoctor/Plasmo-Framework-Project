import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Translation } from "../../mongo/interface";
import { getSession } from "@auth0/nextjs-auth0";

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
        destination: "/api/logout",
        permanent: false,
      },
    };
  }
};
// satisfies GetServerSideProps<{
//   userData: UserData;
// }>;

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <h1 className="plasmo-text-red-400 plasmo-font-roboto">
          Translate Text Chrome Extension
        </h1>
      </div>
    );
  }
}
