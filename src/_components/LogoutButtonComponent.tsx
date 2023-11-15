import React from "react";
import { useRouter } from "next/router";

export default function LogoutButtonComponent() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/api/auth/logout");
      }}
      className="plasmo-bg-black plasmo-text-white plasmo-p-2 plasmo-rounded-md"
    >
      Logout
    </button>
  );
}
