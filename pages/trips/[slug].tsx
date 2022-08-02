import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import Hero from "../../components/Hero";
import PaymentComponent from "../../components/PaymentComponent";
import Divider from "../../icons/Divider";
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
    itenerary,
    packageDetails,
    packageNames,
    packagePrices,
    test,
    title,
  } = trip.fields;
  const amounts = packagePrices.map((e) => {
    return parseInt(e);
  });
  return (
    <main>
      <Hero
        imgSrc={`https:${test[0].fields.file.url}`}
        height={test[0].fields.file.details.image?.height}
        width={test[0].fields.file.details.image?.width}
      >
        <h1>{title.toUpperCase()}</h1>
        <span>{dates}</span>
        <Divider />
      </Hero>
    </main>
  );
};

export default Trip;
