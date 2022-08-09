import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { trpc } from "../utils/trpc";
import Grid, { reputation } from "../components/Grid";
import NewFactionModal from "../components/NewFactionModal";
import AddFactionModal from "../components/AddFactionModal";
import SignIn from "../components/Signin";
import Navigation from "../components/Navigation";

// const factions: Set<{ unaligned: boolean; name: string; nickname: string }> =
//   new Set([
//     { unaligned: true, name: "Angels", nickname: "Angels" },
//     { unaligned: true, name: "Aztecas", nickname: "Aztecas" },
//     { unaligned: true, name: "Bondi Boys MC", nickname: "BBMC" },
//     { unaligned: true, name: "Brouge Street Kingz", nickname: "B$K" },
//     { unaligned: true, name: "Cerebus", nickname: "Cerebus" },
//     { unaligned: true, name: "Chang Gang", nickname: "CG" },
//     { unaligned: true, name: "Cleanbois", nickname: "CB" },
//     { unaligned: true, name: "Eastside Vagos", nickname: "ESV" },
//     { unaligned: true, name: "Grove Street Ballas", nickname: "GSB" },
//     { unaligned: true, name: "Gulag Gang", nickname: "GG" },
//     { unaligned: true, name: "Hogs of Anarchy", nickname: "HOA" },
//     { unaligned: true, name: "Hydra", nickname: "Hydra" },
//     {
//       unaligned: true,
//       name: "Los Santos Policee Department",
//       nickname: "LSPD",
//     },
//     { unaligned: true, name: "Lost MC", nickname: "Lost" },
//     { unaligned: true, name: "Marabunta Grande", nickname: "MG" },
//     { unaligned: true, name: "Mayhem", nickname: "Mayhem" },
//     { unaligned: true, name: "Mortelle", nickname: "Mortelle" },
//     { unaligned: true, name: "Natural Born Crackheads", nickname: "NBC" },
//     { unaligned: true, name: "Paleto Bay Sheriff's Office", nickname: "PBSO" },
//     { unaligned: true, name: "Rangers", nickname: "Rangers" },
//     {
//       unaligned: true,
//       name: "Ray's Unfortunate Scuff Team",
//       nickname: "R.U.S.T",
//     },
//     {
//       unaligned: true,
//       name: "Senora Desert Sheriff's Office",
//       nickname: "SDSO",
//     },
//     { unaligned: true, name: "Seaside", nickname: "SS" },
//     { unaligned: true, name: "Sessanta Nove", nickname: "69" },
//     { unaligned: true, name: "Street Team", nickname: "ST" },
//     { unaligned: true, name: "The Clowns", nickname: "Clowns" },
//     { unaligned: true, name: "The Dons", nickname: "Dons" },
//     { unaligned: true, name: "The Families", nickname: "GSF" },
//     { unaligned: true, name: "The Guild", nickname: "Nerds" },
//     { unaligned: true, name: "The Hidden", nickname: "Hidden" },
//     { unaligned: true, name: "The Mandem", nickname: "MDM" },
//     { unaligned: true, name: "The Saints", nickname: "Saints" },
//     { unaligned: true, name: "Troopers", nickname: "Troopers" },
//     { unaligned: true, name: "Wastelanders", nickname: "WL" },
//   ]);

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
