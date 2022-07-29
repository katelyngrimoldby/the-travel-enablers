import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/Button";
import PaymentComponent from "../components/PaymentComponent";
import Divider from "../icons/Divider";
import heroImg from "../public/hero-img.jpg";
import styles from "../styles/index.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | The Travel Enablers</title>
      </Head>

      <main>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>THE TRAVEL ENABLERS</h1>
            <span>How can we enable you?</span>
            <Divider />
            <Button location="#" buttonType="main" value="Take the Quiz" />
          </div>
          <div className={styles.imgWrapper}>
            {/* <Image
              src={heroImg}
              alt=""
              className={styles.heroImg}
              layout="responsive"
              priority={true}
            /> */}
          </div>
        </header>
        <div>
          <PaymentComponent />
        </div>
      </main>
    </>
  );
};

export default Home;
