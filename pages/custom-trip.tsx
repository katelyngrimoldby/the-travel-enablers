import { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Hero from "../components/Hero";
import WhiteBack from "../components/WhiteBack";
import heroImg from "../public/custom-trip-hero-img.jpg";
import img1 from "../public/custom-trip-1.jpg";
import img2 from "../public/custom-trip-2.jpg";
import img3 from "../public/custom-trip-3.jpg";
import img4 from "../public/custom-trip-4.jpg";
import Divider from "../icons/Divider";
import styles from "../styles/customTrip.module.scss";

const CustomTrip: NextPage = () => {
  return (
    <>
      <Head>
        <title>Custom Trip Planning | The Travel Enablers</title>
        <meta
          name="description"
          content="Maybe you don’t have the time or desire to plan out your next vacation. We can handle as much or as little as you like. You want help getting the best deals, not worrying about making all the reservations and having the gift of time handed right to you. Discover your travel style and choose your level of service; we take care of the rest."
        />

        <meta
          property="og:title"
          content="Custom Trip Planning | The Travel Enablers"
        />
        <meta
          property="og:description"
          content="Maybe you don’t have the time or desire to plan out your next vacation. We can handle as much or as little as you like. You want help getting the best deals, not worrying about making all the reservations and having the gift of time handed right to you. Discover your travel style and choose your level of service; we take care of the rest."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thetravelenablers.com/custom-trip" />
        <meta property="og:image" content="https://www.thetravelenablers.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.thetravelenablers.com/og-image.jpg" />
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>CUSTOM TRIP PLANNING</h1>
          <Divider />
        </Hero>
        <WhiteBack>
          <section id="pitch" className={styles.section}>
            <h2>Why Use Travel Planning</h2>
            <article className={styles.contentTop}>
              <p>
                Maybe you don’t have the time or desire to plan out your next
                vacation. We can handle as much or as little as you like. We are
                The Travel Enablers, after all! Is your family planning a road
                trip down the Pacific Coast Highway or do you want help with
                your honeymoon to New Zealand or is it a friends’ trip to Bali?
                You want help getting the best deals, not worrying about making
                all the reservations, and having the gift of time handed right
                to you. Discover your travel style and choose your level of
                service; we take care of the rest.
              </p>
              <div className={styles.imgWrapper}>
                <Image src={img1} alt="Picnic in a city" />
              </div>
            </article>
          </section>
          <section id="packages" className={styles.section}>
            <h2>Levels of Service</h2>
            <article>
              <p>
                All of our packages are available for 1-4 travelers for 3-10
                days. If you have a larger group or a longer stay we can chat
                and get you a more accurate quote.
              </p>
            </article>
            <div className={styles.cardWrapper}>
              <article className={styles.card}>
                <h3>Poco Package - $199</h3>
                <p>
                  This is for those that have a clear idea of what they want and
                  need but would rather not spend their time looking for the
                  best fit. Through this option, we will present to you the best
                  flight options, show you the best accommodations, and a list
                  of local recommendations. All you have to do is book it with
                  your credit card.
                </p>
                <div className={styles.cardImgWrapper}>
                  <Image src={img2} alt="Group around statues" />
                </div>
              </article>

              <article className={styles.card}>
                <h3>Get Me There Package - $299</h3>
                <p>
                  Here we really get the planning happening. We start with
                  getting everything booked PLUS then we build your itinerary
                  (as detailed or relaxed as you like) and give a bit more
                  structure to the trip planning. This will be presented to you
                  with a live itinerary you can pull up on your phone and
                  include all the important info. As a bonus, we will also keep
                  you updated on international travel restrictions &
                  suggestions.
                </p>
                <div className={styles.cardImgWrapper}>
                  <Image src={img3} alt="Paddleboarders by small island" />
                </div>
              </article>

              <article className={styles.card}>
                <h3>Take My Money Package - $499</h3>
                <p>
                  We do it all, you only need to show up! Planning travel is
                  time-consuming, sometimes tedious and for a lot of people, it
                  makes the trip part less enjoyable. That’s why we have this
                  offering where we do it all from all forms of transport,
                  interactive maps, accommodations, itinerary, booking
                  tours/activities/appointments, and a checklist of what to do
                  before travel full of helpful information. It is a truly
                  bespoke experience.
                </p>
                <div className={styles.cardImgWrapper}>
                  <Image src={img4} alt="Group by Arizona cliff" />
                </div>
              </article>
            </div>
          </section>
          <section id="action" className={styles.section}>
            <h2>Start Your Custom Trip Planning</h2>
            <article className={styles.contentBottom}>
              <p>
                Want a trip planned just for you, with none of the work? Find
                your travel personality to start the process.
              </p>
              <a href="https://forms.gle/sFHQcq42WKjDG4hXA" className={styles.quizLink}>Take the Quiz</a>
            </article>
          </section>
        </WhiteBack>
      </main>
    </>
  );
};

export default CustomTrip;
