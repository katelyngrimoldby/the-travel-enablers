import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { TypeGroupTrip, TypeGroupTripFields } from "../types";
import Button from "../components/Button";
import Hero from "../components/Hero";
import TripCard from "../components/TripCard";
import Divider from "../icons/Divider";
import heroImg from "../public/hero-img.jpg";
import styles from "../styles/index.module.scss";

type PageProps = {
  trips: TypeGroupTrip[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC__ACCESS}`,
  });

  const res = await client.getEntries<TypeGroupTripFields>({
    content_type: "groupTrip",
  });

  return {
    props: {
      trips: res.items,
    },
  };
}

const Home: NextPage<PageProps> = ({ trips }) => {
  const sortedTrips = trips.sort((a, b) => {
    const splitA = a.fields.startDate.split("-");
    const splitB = b.fields.startDate.split("-");

    const numA = splitA.map((e) => {
      return parseInt(e);
    });
    const numB = splitB.map((e) => {
      return parseInt(e);
    });

    return numA[0] - numB[0] || numA[1] - numB[1] || numA[2] - numB[2];
  });

  return (
    <>
      <Head>
        <title>Home | The Travel Enablers</title>
      </Head>

      <main>
        <Hero imgSrc={heroImg}>
          <h1>THE TRAVEL ENABLERS</h1>
          <span>How can we enable you?</span>
          <Divider />
          <Button location="#" buttonType="main" value="Take the Quiz" />
        </Hero>
        <div>
          {sortedTrips.map((e: TypeGroupTrip) => {
            return <TripCard key={e.sys.id} trip={e} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
