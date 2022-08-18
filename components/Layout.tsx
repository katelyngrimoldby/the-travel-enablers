import { useState } from "react";
import Link from "next/link";
import ColorfulCompass from "../icons/ColorfulCompass/ColorfulCompass";
import MenuOpen from "../icons/MenuOpen";
import MenuClose from "../icons/MenuClose";
import ColorfulFullText from "../icons/ColorfulFullText/ColorfulFullText";
import Button from "../components/Button";
import styles from "../styles/Layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [visible, setVisible] = useState(false);

  const clickHandler = () => {
    setVisible(!visible);
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <ColorfulCompass />
          </a>
        </Link>
        <button
          className={styles.menuButton}
          type="button"
          onClick={clickHandler}
        >
          <MenuOpen />
        </button>
        <nav className={visible ? styles.visible : undefined}>
          <button
            className={styles.menuButton}
            type="button"
            onClick={clickHandler}
          >
            <MenuClose />
          </button>
          <ul>
            <li>
              <Link href="/trips">
                <a onClick={clickHandler}>Upcoming Trips</a>
              </Link>
            </li>
            <li>
              <Link href="/articles">
                <a onClick={clickHandler}>Articles</a>
              </Link>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <Button
                buttonType={"main"}
                location="/custom-trip"
                value="Take the Quiz"
              />
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <footer>
        <div className={styles.topFooter}>
          <ColorfulFullText />
          <div className={styles.wrapper}>
            <section>
              <h2>Explore</h2>
              <ul>
                <li>
                  <Link href="/trips">
                    <a>Upcoming Trips</a>
                  </Link>
                </li>
                <li>
                  <Link href="/custom-trip">
                    <a>Custom Trip Planning</a>
                  </Link>
                </li>
                <li>
                  <Link href="/articles">
                    <a>Articles</a>
                  </Link>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                {/* <li>
                  <a href="#">Contact</a>
                </li> */}
              </ul>
            </section>
            <section>
              <h2>Get In Touch</h2>
              <ul>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Phone</a>
                </li>
                <li>
                  <a href="#">Email</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <span>The Travel Enablers © 2022</span>
          <span>
            Designed and built by{" "}
            <a
              href="https://katelyngrimoldby.com"
              target="_blank"
              rel="noreferrer"
            >
              Katelyn Grimoldby
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
