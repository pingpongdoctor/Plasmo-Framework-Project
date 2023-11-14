import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Translation } from "../../mongo/interface";
import getUser from "../utils/getUser";

interface UserData {
  _id: string;
  name: string;
  translations: Translation & { _id: string };
}

export const getServerSideProps = (async (context: any) => {
  const user: UserData = await getUser(context.req, context.res);

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
  user: UserData;
}>;

export default function Home({ user }: { user: UserData }) {
  return (
    <div>
      <h1 className="plasmo-text-red-400 plasmo-font-roboto">Translate Text</h1>
      <h3>Hi {user.name}</h3>
      <Link href={`/api/auth/logout?returnTo=http://localhost:1947`}>
        Logout
      </Link>
    </div>
  );
}
