import styles from "../styles/CookieBanner.module.scss";

type BannerTypes = {
  accept: () => void;
  reject: () => void;
};

const CookieBanner = ({ accept, reject }: BannerTypes) => {
  return (
    <div className={styles.banner}>
      <p>
        This website uses cookies to ensure the best online experience for you.
        They help us analyze how the site is used and better personalize the
        website to you.
      </p>
      <button
        type="button"
        id="accept"
        className={styles.accept}
        onClick={accept}
      >
        Accept all
      </button>
      <button
        type="button"
        id="reject"
        className={styles.reject}
        onClick={reject}
      >
        Rejet all
      </button>
    </div>
  );
};

export default CookieBanner;
