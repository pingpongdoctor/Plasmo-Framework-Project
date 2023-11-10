import { Inter } from "next/font/google";
import { ContentComponent } from "@/components/ContentComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <ContentComponent name="App" />;
}
