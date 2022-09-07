import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import heroImg from "../public/contact-hero-img.jpg";
import Divider from "../icons/Divider";

const FormSubmit: NextPage = () => {
  return (
    <>
      <Head>
        <title>Form Sent | The Travel Enablers</title>
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>THANK YOU FOR YOUR MESSAGE</h1>
          <span>We&apos;ll get back to you as soon as possible!</span>
          <Divider />
        </Hero>
      </main>
    </>
  );
};

export default FormSubmit;
