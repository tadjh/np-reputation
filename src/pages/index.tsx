import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Grid from "../components/Grid";
import Navigation from "../components/Navigation";
import Reputation from "../components/Reputation";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const gridRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Head>
        <title>{"Barry Briddle's Reputation"}</title>
        <meta
          name="description"
          content="Barry Briddle's Reputation Chart by Tadjh"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navigation />
        <div className="flex items-center justify-center gap-2 p-2 font-bold uppercase text-white/90 md:gap-4 md:p-4">
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
        </div>
      </header>

      <main className="relative flex flex-1 justify-center p-2 md:p-4">
        <Grid ref={gridRef}>
          <Reputation gridRef={gridRef} userId={session?.user?.id} />
        </Grid>
      </main>

      <footer className="flex justify-center gap-1 p-2 font-mono text-xs text-white/90">
        Made with 🧡 by
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/tadjh"
          className="underline"
        >
          Tadjh
        </a>
      </footer>

      <Toaster />
    </>
  );
};

export default Home;
