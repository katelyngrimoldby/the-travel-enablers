import type { NextPage } from 'next';
import { createClient } from 'contentful';
import Head from 'next/head';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Hero from '../../components/Hero';
import PaymentComponent from '../../components/PaymentComponent';
import DividerImg from '../../components/DividerImg';
import WhiteBack from '../../components/WhiteBack';
import Gallery from '../../components/Gallery';
import Divider from '../../icons/Divider';
import styles from '../../styles/[tripSlug].module.scss';
import { Document } from '@contentful/rich-text-types';
import { TypeGroupTrip, TypeGroupTripFields } from '../../types';

const client = createClient({
  space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
  accessToken: `${process.env.NEXT_PUBLIC_ACCESS}`,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries<TypeGroupTripFields>({
    content_type: 'groupTrip',
  });

  const paths = res.items.map((e) => {
    return { params: { slug: e.fields.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

type StaticProps = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: StaticProps) => {
  const res = await client.getEntries<TypeGroupTripFields>({
    content_type: 'groupTrip',
    'fields.slug': params.slug,
  });

  return {
    props: { trip: res.items[0] },
  };
};

type PageProps = {
  trip: TypeGroupTrip;
};

const Trip: NextPage<PageProps> = ({ trip }) => {
  const {
    closingDescription,
    dates,
    deposit,
    initialDescription,
    plainDescription,
    itinerary,
    packageDetails,
    packageNames,
    packagePrices,
    images,
    title,
    slug,
    gallery,
  } = trip.fields;

  //prices as numbers to pass to PaymentComponent
  const amounts = packagePrices.map((e) => {
    return parseInt(e);
  });

  return (
    <>
      <Head>
        <title>{`${title} | The Travel Enablers`}</title>
        <meta
          name='description'
          content={plainDescription}
        />
        <meta
          property='og:title'
          content={`${title} | The Travel Enablers`}
        />
        <meta
          property='og:description'
          content={plainDescription}
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content={`https://www.thetravelenablers.com/trips/${slug}`}
        />
        <meta
          property='og:image'
          content={`https:${images[0].fields.file.url}`}
        />
        <meta
          property='og:image:secure_url'
          content={`https:${images[0].fields.file.url}`}
        />
      </Head>

      <main>
        <Hero
          imgSrc={`https:${images[0].fields.file.url}`}
          height={images[0].fields.file.details.image?.height}
          width={images[0].fields.file.details.image?.width}
        >
          <h1>{title.toUpperCase()}</h1>
          <span>{dates}</span>
          <Divider />
        </Hero>
        <section
          id='details'
          className={styles.section}
        >
          <WhiteBack>
            <h2>About The Trip</h2>
            <div className={styles.content}>
              <div className={styles.pWrapper}>
                {documentToReactComponents(initialDescription as Document)}
              </div>
              <Image
                src={`https:${images[1].fields.file.url}`}
                alt={images[1].fields.description}
                height={images[1].fields.file.details.image?.height}
                width={images[1].fields.file.details.image?.width}
                className={styles.sectionImg}
              />
            </div>
            <h3>Itinerary</h3>
            <div className={styles.pWrapper}>
              {documentToReactComponents(itinerary as Document)}
            </div>
            <div className={styles.content}>
              <Image
                src={`https:${images[2].fields.file.url}`}
                alt={images[2].fields.description}
                height={images[2].fields.file.details.image?.height}
                width={images[2].fields.file.details.image?.width}
                className={styles.sectionImg}
              />
              <div className={styles.pWrapper}>
                {documentToReactComponents(closingDescription as Document)}
              </div>
            </div>
          </WhiteBack>
        </section>
        <DividerImg
          imgSrc={`https:${images[3].fields.file.url}`}
          alt={images[3].fields.description}
          height={images[3].fields.file.details.image?.height}
          width={images[3].fields.file.details.image?.width}
        />
        <div className={styles.section}>
          <WhiteBack>
            <section id='book'>
              <h2>Book Your Spot</h2>
              <div className={styles.pWrapper}>
                {documentToReactComponents(packageDetails as Document)}
              </div>
              <div className={styles.pckgWrapper}>
                <h3>Available Packages</h3>
                <ul className={styles.pckgList}>
                  {packageNames.map((e, i) => {
                    return (
                      <li key={i}>
                        {e}: {amounts[i]}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <PaymentComponent
                deposit={deposit}
                amounts={amounts}
                product={title}
                packages={packageNames}
              />
            </section>
            <Gallery gallery={gallery} />
          </WhiteBack>
        </div>
      </main>
    </>
  );
};

export default Trip;
