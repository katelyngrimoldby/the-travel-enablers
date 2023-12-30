import { useState } from 'react';
import Link from 'next/link';
import ColorfulCompass from '../icons/ColorfulCompass/ColorfulCompass';
import MenuOpen from '../icons/MenuOpen';
import MenuClose from '../icons/MenuClose';
import ColorfulFullText from '../icons/ColorfulFullText/ColorfulFullText';
import styles from '../styles/Layout.module.scss';

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
        <Link
          href='/'
          aria-label='Go to Home'
          onClick={visible ? clickHandler : undefined}
        >
          <ColorfulCompass />
        </Link>
        <button
          className={styles.menuButton}
          type='button'
          onClick={clickHandler}
          aria-label='Open nav menu'
        >
          <MenuOpen />
        </button>
        <nav className={visible ? styles.visible : undefined}>
          <button
            className={styles.menuButton}
            type='button'
            onClick={clickHandler}
            aria-label='Close nav menu'
          >
            <MenuClose />
          </button>
          <ul>
            <li>
              <Link
                href='/trips'
                onClick={clickHandler}
              >
                Upcoming Trips
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                onClick={clickHandler}
              >
                Contact
              </Link>
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
                  <Link href='/trips'>Upcoming Trips</Link>
                </li>
              </ul>
            </section>
            <section>
              <h2>Get In Touch</h2>
              <ul>
                <li>
                  <Link href='/contact'>Contact</Link>
                </li>
                <li>
                  <a
                    href='https://www.instagram.com/travellingfoodietours/'
                    rel='noreferrer'
                    target='_blank'
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.facebook.com/thetravelenablers/'
                    rel='noreferrer'
                    target='_blank'
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:travellingfoodietours@gmail.com'
                    rel='noreferrer'
                    target='_blank'
                  >
                    Email
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <span>The Travel Enablers © 2022</span>
          <span>
            Designed and built by{' '}
            <a
              href='https://katelyngrimoldby.com'
              target='_blank'
              rel='noreferrer'
            >
              Katelyn Grimoldby
            </a>
          </span>
          <span>
            <a
              href='../privacy-policy.pdf'
              target='_blank'
              rel='noreferrer'
            >
              Privacy Policy
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
