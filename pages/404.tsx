import Head from "next/head";
import Button from "../components/Button";
import Hero from "../components/Hero";
import Divider from "../icons/Divider";
import heroImg from "../public/hero-img.jpg";

const custom404 = () => {
  return (
    <>
      <Head>
        <title>404 | The Travel Enablers</title>
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>SOMETHING WENT WRONG</h1>
          <Divider />
          <Button buttonType="main" value="Go to Home" location="/" />
        </Hero>
      </main>
    </>
  );
};

export default custom404;
