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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setState({ fName: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Head>
        <title>Contact Us | The Travel Enablers</title>

        <meta property="og:title" content="Contact Us | The Travel Enablers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:secure_url" content="" />
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
            please
            <Link href="/custom-trip">
              <a>&#x20;take the quiz</a>
            </Link>
            .
          </p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className={styles.form}
          >
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
              <textarea
                name="message"
                id="message"
                value={state.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </WhiteBack>
      </main>
    </>
  );
};

export default Contact;
