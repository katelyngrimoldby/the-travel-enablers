import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Hero from "../components/Hero";
import WhiteBack from "../components/WhiteBack";
import Divider from "../icons/Divider";
import heroImg from "../public/hero-img.jpg";
import styles from "../styles/contact.module.scss";

const Contact: NextPage = () => {
  const [state, setState] = useState({
    fName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <Head>
        <title>Contact Us | The Travel Enablers</title>
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
              <a>take the quiz</a>
            </Link>
            .
          </p>
          <form name="contact" data-netlify="true" className={styles.form}>
            <div className={styles.infoWrapper}>
              <div className={styles.inputWrapper}>
                <label htmlFor="fName">Name</label>
                <input
                  name="name"
                  id="fName"
                  type="text"
                  value={state.fName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="subject">Subject</label>
              <input
                name="subject"
                id="subject"
                type="text"
                value={state.subject}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" onChange={handleChange}>
                {state.message}
              </textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </WhiteBack>
      </main>
    </>
  );
};

export default Contact;
