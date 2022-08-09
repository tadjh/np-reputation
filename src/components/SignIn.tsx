import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      className="rounded border px-2 py-1 transition-colors hover:bg-slate-800"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}
