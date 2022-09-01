import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import { TypeGroupTrip, TypeGroupTripFields } from "../../types";
import Hero from "../../components/Hero";
import TripCard from "../../components/TripCard";
import WhiteBack from "../../components/WhiteBack";
import Divider from "../../icons/Divider";
import heroImg from "../../public/hero-img.jpg";
import styles from "../../styles/cardPage.module.scss";

type PageProps = {
  trips: TypeGroupTrip[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC__ACCESS}`,
  });

  const trips = await client.getEntries<TypeGroupTripFields>({
    content_type: "groupTrip",
  });

  return {
    props: {
      trips: trips.items,
    },
  };
}

const Trips: NextPage<PageProps> = ({ trips }) => {
  return (
    <>
      <Head>
        <title>Upcoming Trips | The Travel Enablers</title>
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>UPCOMING TRIPS</h1>
          <Divider />
        </Hero>
        <WhiteBack>
          <div className={styles.content}>
            {trips.length < 1 ? (
              <p>There are no upcoming trips right now.</p>
            ) : (
              trips.map((e, i) => {
                return <TripCard key={i} trip={e} buttonType="light" />;
              })
            )}
          </div>
        </WhiteBack>
      </main>
    </>
  );
};

export default Trips;
