import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <button
      className="rounded border px-2 py-1 transition-colors hover:bg-slate-800"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
