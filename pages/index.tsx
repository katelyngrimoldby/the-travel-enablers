import type { NextPage } from 'next';
import { createClient } from 'contentful';
import Head from 'next/head';
import Image from 'next/image';
import {
  TypeArticle,
  TypeArticleFields,
  TypeGroupTrip,
  TypeGroupTripFields,
} from '../types';
import Button from '../components/Button';
import Hero from '../components/Hero';
import TripCard from '../components/TripCard';
// import ArticleCard from '../components/ArticleCard';
import Divider from '../icons/Divider';
import heroImg from '../public/hero-img.jpg';
import abtImg from '../public/abt-img.jpg';
import ctaImg from '../public/email-img.jpg';
import styles from '../styles/index.module.scss';
import DividerImg from '../components/DividerImg';

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
    content_type: 'groupTrip',
  });

  const articles = await client.getEntries<TypeArticleFields>({
    content_type: 'article',
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

  const trimmedTrips = sortedTrips.slice(0, 4);
  const trimmedArticles = articles.slice(0, 4);

  return (
    <>
      <Head>
        <title>Home | Travelling Foodie Tours</title>

        {/* <meta
          name='description'
          content='Welcome aboard! We love to travel and we are here to help you travel, too! We specialize in hosting small group trips all around the world, and also help you plan the trip of your dreams. We do all the work, so you can have all the fun!'
        /> */}

        <meta
          property='og:title'
          content='Home | Travelling Foodie Tours'
        />
        {/* <meta
          property='og:description'
          content='Welcome aboard! We love to travel and we are here to help you travel, too! We specialize in hosting small group trips all around the world, and also help you plan the trip of your dreams. We do all the work, so you can have all the fun!'
        /> */}
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content='https://www.travellingfoodietours.com'
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
        <Hero
          imgSrc={heroImg}
          home={true}
        >
          <h1>Travelling Foodie Tours</h1>
          <span>Taste Every Place</span>
          <Divider />
        </Hero>

        {/* <section
          id='services'
          className={styles.light}
        >
          <h2>What We Do</h2>
          <section
            id='groupTrips'
            className={styles.content}
          >
            <div className={styles.left}>
              <Image
                src={gtImg}
                alt='Group sitting under table on beach'
                className={styles.sectionImg}
                placeholder='blur'
              />
              <div className={styles.textWrapper}>
                <h3>Small Group Trips</h3>
                <p>
                  Let’s be honest, some places are just better in a group
                  dynamic! We create boutique travel experiences so that if
                  you’re a duo or solo traveler, you will have the opportunity
                  to share the wonders of the world. Each small group experience
                  is curated & hosted by Mandy McPherson.
                </p>
                <p>
                  She has traveled the globe and from her years of exploring
                  does all the research, planning, booking, and organizing. From
                  active adventures to luxurious long weekends away, at The
                  Travel Enablers, we offer an array of bespoke vacations.
                  Everything is thought of: accommodations, transport, tours,
                  must-see/eat/do lists and even off-the-beaten-path
                  recommendations. We even offer payment plans so that no matter
                  your budget, everyone can make their travel dreams a reality.
                </p>
                <Button
                  buttonType='light'
                  location='/trips'
                  value='Take a Trip'
                />
              </div>
            </div>
          </section>
          <section
            id='customTrip'
            className={styles.content}
          >
            <div className={styles.right}>
              <Image
                src={ctImg}
                alt='View of breach from behind palm trees'
                className={styles.sectionImg}
                placeholder='blur'
              />
              <div className={styles.textWrapper}>
                <h3>Custom Trip Planning</h3>
                <p>
                  Maybe you don’t have the time or desire to plan out your next
                  vacation. We can handle as much or as little as you like. We
                  are The Travel Enablers, after all! Is your family planning a
                  road trip down the Pacific Coast Highway or do you want help
                  with your honeymoon to New Zealand or is it a friends’ trip to
                  Bali? You want help getting the best deals, not worrying about
                  making all the reservations, and having the gift of time
                  handed right to you. Discover your travel style and choose
                  your level of service; we take care of the rest.
                </p>
                <Button
                  buttonType='light'
                  location='/custom-trip#packages'
                  value='Choose Your Service Level'
                />
              </div>
            </div>
          </section>
        </section> */}
        <section
          id='trips'
          className={styles.dark}
        >
          <h2>Upcoming Trips</h2>

          {trimmedTrips.length > 0 ? (
            <>
              <div className={styles.cardWrapper}>
                {trimmedTrips.map((e: TypeGroupTrip) => {
                  return (
                    <TripCard
                      key={e.sys.id}
                      trip={e}
                      buttonType='dark'
                    />
                  );
                })}
              </div>
              {trips.length > 3 && (
                <Button
                  buttonType='main'
                  location='/trips'
                  value='View All Trips'
                />
              )}
            </>
          ) : (
            <div className={styles.cardWrapper}>
              <span>There are no trips right now</span>
            </div>
          )}
        </section>
        <section
          id='about'
          className={styles.light}
        >
          <h2>About Us</h2>
          <div className={styles.left}>
            <Image
              src={abtImg}
              alt='Mandy posing with friends at dinner'
              className={styles.sectionImg}
              placeholder='blur'
            />
            <div className={styles.textWrapper}>
              <p>
                Food has been a source of memory making for me, since childhood!
                Our family, though struggling often to make ends meet,
                celebrated milestones at a Korean bulgogi restaurant. On
                vacation, we often went crabbing and clam digging in Newport,
                Oregon. At 18 I discovered pho & other Vietnamese dishes. I was
                taught to cook as the eldest girl in my family and can whip up a
                dinner out of just about anything! Food TV was my favourite
                channel and I learned so much, from French cooking terms to
                knife skills! And as I grew and travelled, the world of food
                became my literal oyster. From street food to fancy seafood
                towers, I love it all. Sharing foods is not only a memory maker
                but direct access to the region’s people. As my foodie hero,
                Anthony Bourdain says: to learn the food is to know the people.
              </p>
            </div>
          </div>
        </section>
        {/* <section id="articles" className={styles.dark}>
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
        </section> */}
        <section id='cta'>
          <DividerImg
            imgSrc={ctaImg}
            alt=''
          >
            <h2>
              Subscribe to our newsletter to be the first to hear of new tours!
            </h2>
            <form
              name='newsletter'
              method='POST'
              action='/'
              data-netlify='true'
              className={styles.form}
            >
              <input
                type='hidden'
                name='form-name'
                value='newsletter'
              />
              <input
                type='email'
                name='email'
                id='email'
              />
              <button type='submit'>Subscribe</button>
            </form>
          </DividerImg>
        </section>
      </main>
    </>
  );
};

export default Home;
