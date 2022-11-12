import Image, { StaticImageData } from "next/image";
import styles from "../styles/Hero.module.scss";

type HeroProps = {
  children: React.ReactNode;
  imgSrc: StaticImageData | string;
  width?: number;
  height?: number;
  home?: boolean;
};

const Hero = ({ children, imgSrc, width, height, home }: HeroProps) => {
  return (
    <header className={home ? styles.homeHero : styles.hero}>
      <div className={styles.heroContent}>{children}</div>
      {typeof imgSrc === "string" ? (
        <Image
          src={imgSrc}
          alt=""
          className={styles.img}
          priority={true}
          height={height}
          width={width}
        />
      ) : (
        <Image
          src={imgSrc}
          alt=""
          className={styles.img}
          priority={true}
          placeholder="blur"
        />
      )}
    </header>
  );
};

export default Hero;
