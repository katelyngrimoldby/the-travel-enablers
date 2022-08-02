import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Hero from "../../components/Hero";
import PaymentComponent from "../../components/PaymentComponent";
import Divider from "../../icons/Divider";
import { Document } from "@contentful/rich-text-types";
import { TypeGroupTrip, TypeGroupTripFields } from "../../types";

const client = createClient({
  space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
  accessToken: `${process.env.NEXT_PUBLIC__ACCESS}`,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries<TypeGroupTripFields>({
    content_type: "groupTrip",
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
    content_type: "groupTrip",
    "fields.slug": params.slug,
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
    itinerary,
    packageDetails,
    packageNames,
    packagePrices,
    images,
    title,
  } = trip.fields;

  //prices as numbers to pass to PaymentComponent
  const amounts = packagePrices.map((e) => {
    return parseInt(e);
  });

  return (
    <>
      <Head>
        <title>{`${title} | The Travel Enablers`}</title>
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

        <section>
          <h2>About The Trip</h2>
          {documentToReactComponents(initialDescription as Document)}
          <Image
            src={`https:${images[1].fields.file.url}`}
            alt={images[1].fields.description}
            height={images[1].fields.file.details.image?.height}
            width={images[1].fields.file.details.image?.width}
          />
          <h3>Itinerary</h3>
          {documentToReactComponents(itinerary as Document)}
          <Image
            src={`https:${images[2].fields.file.url}`}
            alt={images[2].fields.description}
            height={images[2].fields.file.details.image?.height}
            width={images[2].fields.file.details.image?.width}
          />
          {documentToReactComponents(closingDescription as Document)}
        </section>
        <div>
          <Image
            src={`https:${images[3].fields.file.url}`}
            alt={images[3].fields.description}
            height={images[3].fields.file.details.image?.height}
            width={images[3].fields.file.details.image?.width}
          />
        </div>
        <section>
          <h2>Book Your Spot</h2>
          {documentToReactComponents(packageDetails as Document)}
          <PaymentComponent
            deposit={deposit}
            amounts={amounts}
            product={title}
            packages={packageNames}
          />
        </section>
      </main>
    </>
  );
};

export default Trip;
