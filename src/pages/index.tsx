import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { trpc } from "../utils/trpc";
import Grid from "../components/Grid";
import Navigation from "../components/Navigation";
import { reputation } from "../config";

const Home: NextPage = () => {
  const factions = trpc.useQuery(["faction.getAll"]);

  React.useEffect(() => {
    console.log("factions", factions);
  });

  const gridRefs = Array.from(reputation).map(() =>
    React.createRef<HTMLDivElement>()
  );

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

      <header className="flex items-center justify-center gap-2 p-2 font-bold uppercase text-white/90 md:gap-4 md:p-8">
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

      <Navigation factions={factions.data} />

      <main className="flex flex-1 justify-center p-2 md:p-8">
        <Grid gridRefs={gridRefs} />
      </main>
    </>
  );
};

export default Home;
