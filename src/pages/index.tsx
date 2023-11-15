import Link from "next/link";
import getUser from "../utils/getUser";
import TranslationForm from "@/_components/TranslationForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import TranslationList from "@/_components/TranslationList";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context: any) {
    const user: UserWithPopulatedTransactions | null = await getUser(
      context.req,
      context.res
    );

    if (!user) {
      return {
        redirect: {
          destination: "/api/auth/logout",
          permanent: false,
        },
      };
    }

    return {
      props: { user },
    };
  },
});

export default function Home({
  user,
}: {
  user: UserWithPopulatedTransactions;
}) {
  if (user) {
    return (
      <div className="plasmo-flex plasmo-justify-between plasmo-px-[2rem]">
        <div>
          <h1 className="plasmo-text-red-400 plasmo-font-roboto">
            Translate Text
          </h1>
          <p className="plasmo-mb-4">Welcome back {user.name}</p>
          <p className="plasmo-font-bold">Your translations are</p>
          <TranslationList user={user} />
          <TranslationForm />
        </div>
        <Link href={`/api/auth/logout`}>Logout</Link>
      </div>
    );
  }
}
