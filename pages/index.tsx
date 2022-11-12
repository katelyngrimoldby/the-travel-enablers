import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
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
import abtImg from "../public/mandy_and_ian.jpg";
import ctaImg from "../public/cta-img.jpg";
import styles from "../styles/index.module.scss";
import DividerImg from "../components/DividerImg";

type PageProps = {
  trips: TypeGroupTrip[];
  articles: TypeArticle[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC_ACCESS}`,
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

        <meta
          name="description"
          content="Welcome aboard! We love to travel and we are here to help you travel, too! We specialize in hosting small group trips all around the world, and also help you plan the trip of your dreams. We do all the work, so you can have all the fun!"
        />

        <meta property="og:title" content="Home | The Travel Enablers" />
        <meta
          property="og:description"
          content="Welcome aboard! We love to travel and we are here to help you travel, too! We specialize in hosting small group trips all around the world, and also help you plan the trip of your dreams. We do all the work, so you can have all the fun!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thetravelenablers.com" />
        <meta property="og:image" content="https://www.thetravelenablers.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.thetravelenablers.com/og-image.jpg" />
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
            <section id="groupTrips" className={styles.content}>
              <div className={styles.left}>
                <Image src={gtImg} alt="Group sitting under table on beach" className={styles.sectionImg} placeholder="blur" />
                <div className={styles.textWrapper}>
                <h3>Small Group Trips</h3>
                  <p>
                    Let’s be honest, some places are just better in a group
                    dynamic! We create boutique travel experiences so that if
                    you’re a duo or solo traveler, you will have the opportunity
                    to share the wonders of the world. Each small group
                    experience is curated & hosted by Mandy McPherson.
                  </p>
                  <p>
                    She has traveled the globe and from her years of exploring
                    does all the research, planning, booking, and organizing.
                    From active adventures to luxurious long weekends away, at
                    The Travel Enablers, we offer an array of bespoke vacations.
                    Everything is thought of: accommodations, transport, tours,
                    must-see/eat/do lists and even off-the-beaten-path
                    recommendations. We even offer payment plans so that no
                    matter your budget, everyone can make their travel dreams a
                    reality.
                  </p>
                  <Button
                    buttonType="light"
                    location="/trips"
                    value="Take a Trip"
                  />
                </div>
              </div>
            </section>
            <section id="customTrip" className={styles.content}>
              
              <div className={styles.right}>
                <Image
                  src={ctImg}
                  alt="View of breach from behind palm trees"
                  className={styles.sectionImg}
                  placeholder="blur"
                />
                <div className={styles.textWrapper}>
                <h3>Custom Trip Planning</h3>
                  <p>
                    Maybe you don’t have the time or desire to plan out your
                    next vacation. We can handle as much or as little as you
                    like. We are The Travel Enablers, after all! Is your family
                    planning a road trip down the Pacific Coast Highway or do
                    you want help with your honeymoon to New Zealand or is it a
                    friends’ trip to Bali? You want help getting the best deals,
                    not worrying about making all the reservations, and having
                    the gift of time handed right to you. Discover your travel
                    style and choose your level of service; we take care of the
                    rest.
                  </p>
                  <Button
                    buttonType="light"
                    location="/custom-trip#packages"
                    value="Choose Your Service Level"
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
              {trips.length > 3 && (
                <Button
                  buttonType="main"
                  location="/trips"
                  value="View All Trips"
                />
              )}
            </>
          ) : (
            <div className={styles.cardWrapper}>
              <span>There are no trips right now</span>
            </div>
          )}
        </section>
        <section id="about" className={styles.light}>
          <WhiteBack>
            <h2>About Us</h2>
            <div className={styles.left}>
              <Image src={abtImg} alt="Mandy and Ian on a boat" className={styles.sectionImg} placeholder="blur" />
              <div className={styles.textWrapper}>
                <p>
                  We are your Travel Enablers. Mandy & Ian! We both grew up in
                  Alberta, Canada and that’s about where our similarities end!
                  They say opposites attract, we are living proof.
                </p>
                <Button
                  buttonType="light"
                  value="More About Us"
                  location="/about"
                />
              </div>
            </div>
          </WhiteBack>
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
              {articles.length > 3 && (
                <Button
                  buttonType="main"
                  location="/articles"
                  value="View All Articles"
                />
              )}
            </>
          ) : (
            <div className={styles.cardWrapper}>
              <span>There are no articles right now</span>
            </div>
          )}
        </section>
        <section id="cta">
          <DividerImg imgSrc={ctaImg} alt="">
            <h2>Planning Your Custom Vacation With None of the Work</h2>
            <Divider />
            <Button
              buttonType="main"
              value="Take the Quiz"
              location="/custom-trip"
            />
          </DividerImg>
        </section>
      </main>
    </>
  );
};

export default Home;
