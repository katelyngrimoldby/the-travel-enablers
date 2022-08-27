import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  TypeArticle,
  TypeArticleFields,
  TypeGroupTrip,
  TypeGroupTripFields,
} from "../types";
import Button from "../components/Button";
import Hero from "../components/Hero";
import TripCard from "../components/TripCard";
import ArticleCard from "../components/ArticleCard";
import WhiteBack from "../components/WhiteBack";
import Divider from "../icons/Divider";
import heroImg from "../public/hero-img.jpg";
import gtImg from "../public/group-trip-img.jpg";
import ctImg from "../public/custom-trip-img.jpg";
import styles from "../styles/index.module.scss";

type PageProps = {
  trips: TypeGroupTrip[];
  articles: TypeArticle[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC__ACCESS}`,
  });

  const trips = await client.getEntries<TypeGroupTripFields>({
    content_type: "groupTrip",
  });

  const articles = await client.getEntries<TypeArticleFields>({
    content_type: "article",
  });

  return {
    props: {
      trips: trips.items,
      articles: articles.items,
    },
  };
}

const Home: NextPage<PageProps> = ({ trips, articles }) => {
  const sortedTrips = trips.sort((a, b) => {
    const splitA: string[] = a.fields.startDate.split("-");
    const splitB: string[] = b.fields.startDate.split("-");

    const numA = splitA.map((e) => {
      return parseInt(e);
    });
    const numB = splitB.map((e) => {
      return parseInt(e);
    });

    return numA[0] - numB[0] || numA[1] - numB[1] || numA[2] - numB[2];
  });

  const trimmedTrips = sortedTrips.slice(0, 4);
  const trimmedArticles = articles.slice(0, 4);

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
          <Button
            location="/custom-trip"
            buttonType="main"
            value="Take the Quiz"
          />
        </Hero>

        <section id="services" className={styles.light}>
          <WhiteBack>
            <h2>What We Do</h2>
            <section className={styles.content}>
              <h3>Small Group Trips</h3>
              <div className={styles.left}>
                <div className={styles.sectionImg}>
                  <Image src={gtImg} alt="Group sitting under table on beach" />
                </div>
                <div id="groupTrips" className={styles.textWrapper}>
                  <p>
                    Let’s be honest, some places are just better in a group
                    dynamic! We create boutique travel experiences so that if
                    you’re a duo or solo traveler, you will have the opportunity
                    to share the wonders of the world in our small groups hosted
                    & curated by Mandy McPherson.
                  </p>
                  <p>
                    She has traveled the globe and from her years of exploring
                    does all the research, planning, booking and organizing.
                    From active adventures to luxurious long weekends away, at
                    Travel Enablers we offer an array of bespoke vacations.
                    Everything is thought of: accommodations, transport, tours,
                    must see/eat/do lists and even off the beaten path
                    recommendations. We even offer payment plans so that no
                    matter your budget, everyone can make their travel dreams a
                    reality.
                  </p>
                  <Button
                    buttonType="light"
                    location="/trips"
                    value="View Trips"
                  />
                </div>
              </div>
            </section>
            <section id="customTrip" className={styles.content}>
              <h3>Custom Trip Planning</h3>
              <div className={styles.right}>
                <div className={styles.sectionImg}>
                  <Image
                    src={ctImg}
                    alt="View of breach from behind palm trees"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <p>
                    Maybe you don’t have the time or desire to plan out your
                    next vacation. We can handle as much or as little as you
                    like. We are The Travel Enablers, after all! Is your family
                    planning a road trip down the Pacific Coast Highway or you
                    want help with your honeymoon to New Zealand or is it a
                    friends’ trip to Bali? You want help getting the best deals,
                    not worrying about making all the reservations and having
                    the gift of time handed right to you. Discover your travel
                    style and choose your level of service; we take care of the
                    rest.
                  </p>
                  <Button
                    buttonType="light"
                    location="/custom-trip"
                    value="Take the Quiz"
                  />
                </div>
              </div>
            </section>
          </WhiteBack>
        </section>
        <section id="trips" className={styles.dark}>
          <h2>Upcoming Trips</h2>

          {trimmedTrips.length > 0 ? (
            <>
              <div className={styles.cardWrapper}>
                {trimmedTrips.map((e: TypeGroupTrip) => {
                  return <TripCard key={e.sys.id} trip={e} buttonType="dark" />;
                })}
              </div>
              <Button
                buttonType="main"
                location="/trips"
                value="View All Trips"
              />
            </>
          ) : (
            <div className={styles.cardWrapper}>
              <span>There are no articles right now</span>
            </div>
          )}
        </section>
        <section id="articles" className={styles.dark}>
          <h2>Articles</h2>

          {trimmedArticles.length > 0 ? (
            <>
              <div className={styles.cardWrapper}>
                {trimmedArticles.map((e: TypeArticle) => {
                  return (
                    <ArticleCard key={e.sys.id} article={e} buttonType="dark" />
                  );
                })}
              </div>
              <Button
                buttonType="main"
                location="/articles"
                value="View All Articles"
              />
            </>
          ) : (
            <div className={styles.cardWrapper}>
              <span>There are no articles right now</span>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
