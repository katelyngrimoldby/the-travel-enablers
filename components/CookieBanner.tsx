import styles from "../styles/CookieBanner.module.scss";

const CookieBanner = () => {
  return (
    <div className={styles.banner}>
      <p>
        This website uses cookies to ensure the best online experience for you.
        They help us analyze how the site is used and better personalize the
        website to you.
      </p>
      <button type="button" id="accept" className={styles.accept}>
        Accept all
      </button>
      <button type="button" id="reject" className={styles.reject}>
        Rejet all
      </button>
    </div>
  );
};

export default CookieBanner;
