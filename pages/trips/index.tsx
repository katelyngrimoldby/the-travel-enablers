import type { NextPage } from 'next';
import { createClient } from 'contentful';
import Head from 'next/head';
import { TypeGroupTrip, TypeGroupTripFields } from '../../types';
import Hero from '../../components/Hero';
import TripCard from '../../components/TripCard';
import Divider from '../../icons/Divider';
import heroImg from '../../public/hero-img.jpg';
import styles from '../../styles/cardPage.module.scss';

type PageProps = {
  trips: TypeGroupTrip[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC_ACCESS}`,
  });

  const trips = await client.getEntries<TypeGroupTripFields>({
    content_type: 'groupTrip',
  });

  return {
    props: {
      trips: trips.items,
    },
  };
}

const Trips: NextPage<PageProps> = ({ trips }) => {
  const sortedTrips = trips.sort((a, b) => {
    const splitA: string[] = a.fields.startDate.split('-');
    const splitB: string[] = b.fields.startDate.split('-');

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
        <title>Upcoming Trips | Travelling Foodie Tours</title>
        <meta
          name='description'
          content='View all of the upcoming trips here. Pick your favourite and reserve your spot!'
        />
        <meta
          property='og:title'
          content='Upcoming Trips | Travelling Foodie Tours'
        />
        <meta
          property='og:description'
          content='View all of the upcoming trips here. Pick your favourite and reserve your spot!'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content='https://www.travellingfoodietours.com/trips'
        />
        <meta
          property='og:image'
          content='https://www.travellingfoodietours.com/og-image.jpg'
        />
        <meta
          property='og:image:secure_url'
          content='https://www.travellingfoodietours.com/og-image.jpg'
        />
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>UPCOMING TRIPS</h1>
          <Divider />
        </Hero>
        <div className={styles.content}>
          {sortedTrips.length < 1 ? (
            <p>There are no upcoming trips right now.</p>
          ) : (
            sortedTrips.map((e, i) => {
              return (
                <TripCard
                  key={i}
                  trip={e}
                  buttonType='light'
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

export default Trips;
