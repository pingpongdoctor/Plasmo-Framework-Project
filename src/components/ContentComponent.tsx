import { useState } from "react";

interface Props {
  name?: string;
}

export function ContentComponent({ name = "Extension" }: Props) {
  const [data, setData] = useState("");

  return (
    <div className="w-[300px] h-[300px]">
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> {name}!
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />

      <a href="https://docs.plasmo.com">READ THE DOCS!</a>
    </div>
  );
}
