import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Hero from "../components/Hero";
import WhiteBack from "../components/WhiteBack";
import Divider from "../icons/Divider";
import heroImg from "../public/contact-hero-img.jpg";
import styles from "../styles/contact.module.scss";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us | The Travel Enablers</title>

        <meta property="og:title" content="Contact Us | The Travel Enablers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thetravelenablers.com/contact" />
        <meta property="og:image" content="https://www.thetravelenablers.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.thetravelenablers.com/og-image.jpg" />
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>CONTACT US</h1>
          <Divider />
        </Hero>
        <WhiteBack>
          <p className={styles.p}>
            Questions? Suggestions? Collaborations? Fill out the form below and
            we&apos;ll get back to you as soon as possible. To plan a trip,
            please{" "}
            <Link href="/custom-trip">
            take the quiz
            </Link>
            .
          </p>
          <form
            name="contact"
            method="POST"
            action="/form-submitted"
            data-netlify="true"
            className={styles.form}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className={styles.infoWrapper}>
              <div className={styles.inputWrapper}>
                <label htmlFor="fName">Name</label>
                <input name="name" id="fName" type="text" />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="subject">Subject</label>
              <input name="subject" id="subject" type="text" />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message"></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </WhiteBack>
      </main>
    </>
  );
};

export default Contact;
