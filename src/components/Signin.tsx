import { useSession, signIn, signOut } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        <button
          className="rounded border px-2 py-1 transition-colors hover:bg-slate-800"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <button
      className="rounded border px-2 py-1 transition-colors hover:bg-slate-800"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}
