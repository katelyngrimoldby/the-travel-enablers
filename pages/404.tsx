import { NextPage } from "next";
import Head from "next/head";
import Button from "../components/Button";
import WhiteBack from "../components/WhiteBack";
import Hero from "../components/Hero";
import Divider from "../icons/Divider";
import heroImg from "../public/hero-img.jpg";
import styles from "../styles/custom404.module.scss";

const custom404 = () => {
  return (
    <>
      <Head>
        <title>404 | The Travel Enablers</title>
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1> 404 - PAGE NOT FOUND</h1>
          <Divider />
        </Hero>
        <WhiteBack>
          <div className={styles.textWrapper}>
            <p>Sorry, this page doesn&apos;t seem to exist</p>
            <Button buttonType="main" value="Go to Home" location="/" />
          </div>
        </WhiteBack>
      </main>
    </>
  );
};

export default custom404;
