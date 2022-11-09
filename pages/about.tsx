import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Hero from "../components/Hero";
import WhiteBack from "../components/WhiteBack";
import Divider from "../icons/Divider";
import heroImg from "../public/about-hero-img.jpg";
import mandy from "../public/mandy.jpg";
import ian from "../public/ian.jpg";
import styles from "../styles/about.module.scss";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | The Travel Enabers</title>
        <meta
          name="description"
          content="We are your Travel Enablers. Mandy & Ian! We both grew up in Alberta, Canada and that’s about where our similarities end! They say opposites attract, we are living proof."
        />

        <meta property="og:title" content="About Us | The Travel Enablers" />
        <meta
          property="og:description"
          content="We are your Travel Enablers, Mandy & Ian! We both grew up in Alberta, Canada and that’s about where our similarities end! They say opposites attract, we are living proof."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thetravelenablers.com/about" />
        <meta property="og:image" content="https://www.thetravelenablers.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.thetravelenablers.com/og-image.jpg" />
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>ABOUT US</h1>
          <Divider />
        </Hero>
        <WhiteBack>
          <section id="Mandy" className={styles.section}>
            
            <div className={styles.left}>
              <div className={styles.imgWrapper}>
                <Image src={mandy} alt="Mandy on a boat" />
              </div>
              
              <div className={styles.textWrapper}>
              <h2>About Mandy</h2>
                <p>
                  Mandy is a mother of two and wife, she balances running her
                  business as a yoga teacher, yoga retreat host, and yoga
                  teacher trainer while travelling, raising children, and being
                  a wife seemingly with ease.
                </p>
                <p>
                  Her love of travel and planning is second only to her love of
                  family. When she isn’t raising kids you will find her planning
                  her next adventure, and even at times when she is on an
                  adventure, she will already be planning her next one.
                </p>
                <p>
                  She explored the world including Europe, South America, Asia,
                  and North America. The Camino trail from Portugal to Spain and
                  Bali are two of Mandy’s favourites and while her home base may
                  be in Alberta, Canada, Puerto Vallarta has Mandy’s heart and
                  eventually will be our home.
                </p>
                <p>-Ian</p>
              </div>
            </div>
          </section>
          <section id="Ian" className={styles.section}>
            
            <div className={styles.right}>
              <div className={styles.imgWrapper}>
                <Image src={ian} alt="Ian in a restaurant" />
              </div>
              <div className={styles.textWrapper}>
              <h2>About Ian</h2>
                <p>
                  My husband Ian is probably the most organized person I know.
                  He really can keep it all together via spreadsheets and
                  timelines. It’s his gift! In his “day job,” he does this on a
                  large scale. He keeps me balanced this way. He does all the
                  behind-the-scenes for The Travel Enablers.
                </p>
                <p>
                  Ian’s travel style is as a vacationer. By that, I mean he
                  travels maybe 4 weeks a year and when he does it’s usually
                  with me and it feels like a time to relax and rejuvenate. He
                  loves great food, some downtime on the beach or by the pool,
                  cold beers, and nice wine! Sprinkle in a few adventures and he
                  is happy.
                </p>
                <p>-Mandy</p>
              </div>
            </div>
          </section>
        </WhiteBack>
      </main>
    </>
  );
};

export default About;
