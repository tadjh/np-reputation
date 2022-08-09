import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { composeKey } from "../utils";
import { useSession, signIn, signOut } from "next-auth/react";
// import { trpc } from "../utils/trpc";

const factions: Map<string, boolean> = new Map([
  ["Angels", true],
  ["Aztecas", true],
  ["Bondi Boys MC", true],
  ["Brouge Street Kingz", true],
  ["Cerebus", true],
  ["Chang Gang", true],
  ["Cleanbois", true],
  ["Eastside Vagos", true],
  ["Grove Street Ballas", true],
  ["Hogs of Anarchy", true],
  ["Hydra", true],
  ["LSPD", true],
  ["Lost MC", true],
  ["Marabunta Grande", true],
  ["Mayhem", true],
  ["Mortelle", true],
  ["Natural Born Crackheads", true],
  ["PBSO", true],
  ["Rangers", true],
  ["Ray's Unfortunate Scuff Team", true],
  ["SDSO", true],
  ["Seaside", true],
  ["Sessanta Nove", true],
  ["Street Team", true],
  ["The Clowns", true],
  ["The Dons", true],
  ["The Families", true],
  ["The Guild", true],
  ["The Guild", true],
  ["The Hidden", true],
  ["The Mandem", true],
  ["The Saints", true],
  ["Troopers", true],
  ["Wastelanders", true],
]);

const reputation: Readonly<string[][]> = [
  [" ", ""],
  ["Rank 1", ""],
  ["Rank 2", ""],
  ["Rank 3", ""],
  ["Rank 4", ""],
  ["Rank 1", ""],
  ["Neutral", "hover:bg-slate-100/5"],
  ["Accepted", "bg-emerald-900/20 hover:bg-emerald-900/30"],
  ["Liked", "bg-emerald-900/40 hover:bg-emerald-900/50"],
  ["Idolized", "bg-emerald-900/60 hover:bg-emerald-900/70"],
  ["Rank 2", ""],
  ["Shunned", "bg-red-900/20 hover:bg-red-900/30"],
  ["Mixed", "hover:bg-slate-100/5"],
  ["Smiling Troublemaker", "bg-emerald-900/20 hover:bg-emerald-900/30"],
  ["Good-Natued Rascal", "bg-emerald-900/40 hover:bg-emerald-900/50"],
  ["Rank 3", ""],
  ["Hated", "bg-red-900/40 hover:bg-red-900/50"],
  ["Sneering Punk", "bg-red-900/20 bg-red-900/30"],
  ["Unpredictable", "hover:bg-slate-100/5"],
  ["Dark Hero", "bg-emerald-900/20 hover:bg-emerald-900/30"],
  ["Rank 4", ""],
  ["Vilified", "bg-red-900/60 hover:bg-red-900/70"],
  ["Merciful Thug", "bg-red-900/40 hover:bg-red-900/50"],
  ["Soft-Hearted Devil", "bg-red-900/20 hover:bg-red-900/30"],
  ["Wild Child", "hover:bg-slate-100/5"],
];

function SignIn() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>Sign in</button>;
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Barry Briddle&apos;s Reputation</title>
        <meta
          name="description"
          content="Barry Briddle's Reputation Chart by Tadjh"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute top-0 right-0 p-2 font-mono text-sm text-white/90">
        <SignIn />
      </div>

      <header className="flex items-center justify-center gap-4 p-2 font-bold uppercase text-white/90 md:p-8">
        <div
          className="break-all text-4xl md:text-7xl"
          style={{ fontFamily: "'Mouse Memoirs', sans-serif" }}
        >
          Briddle&apos;s
        </div>
        <div className="relative h-14 w-14 md:h-28 md:w-28">
          <Image alt="Barry Stare" src="/uhnBb.png" layout="fill" />
        </div>
        <div
          className="flex flex-col text-base md:text-4xl"
          style={{ fontFamily: "'Trade Winds', cursive" }}
        >
          <span>Fame &</span>
          <span>Infamy</span>
        </div>
      </header>

      <main className="flex flex-1 justify-center p-2 font-mono md:p-8">
        {/* <div>
            <h3>Unaligned</h3>
            <ul>
              {Array.from(factions.keys()).map((key, index) => (
                <li key={composeKey(key, index + 1)}>{key}</li>
              ))}
            </ul>
          </div> */}
        <div
          className="grid gap-1 text-xs md:gap-2"
          style={{
            gridTemplateColumns: "16px repeat(4, minmax(0, 1fr))",
            gridTemplateRows: "16px repeat(4, minmax(0, 1fr))",
          }}
        >
          {Array.from(reputation).map(([alignment, color], index) => (
            <div
              key={composeKey("alignment", index + 1)}
              className={clsx(
                "flex items-center justify-center rounded shadow",
                index > 4 && index % 5 !== 0
                  ? "border border-slate-700 p-2 text-slate-400 transition-colors hover:text-slate-300"
                  : "text-white/70",
                color
              )}
            >
              <span
                className={clsx(
                  index > 4 && index % 5 !== 0
                    ? "whitespace-normal break-all"
                    : "whitespace-nowrap",
                  index % 5 === 0 && "-rotate-90"
                )}
              >
                {alignment}
              </span>
            </div>
          ))}
        </div>

        <footer></footer>
      </main>
    </>
  );
};

export default Home;
