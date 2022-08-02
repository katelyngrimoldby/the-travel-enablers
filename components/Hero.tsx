import Image, { StaticImageData } from "next/image";
import styles from "../styles/Hero.module.scss";

type HeroProps = {
  children: React.ReactNode;
  imgSrc: StaticImageData | string;
  width?: number;
  height?: number;
};

const Hero = ({ children, imgSrc, width, height }: HeroProps) => {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>{children}</div>
      <div className={styles.imgWrapper}>
        {typeof imgSrc === "string" ? (
          <Image
            src={imgSrc}
            alt=""
            className={styles.heroImg}
            layout="responsive"
            priority={true}
            height={height}
            width={width}
          />
        ) : (
          <Image
            src={imgSrc}
            alt=""
            className={styles.heroImg}
            layout="responsive"
            priority={true}
          />
        )}
      </div>
    </header>
  );
};

export default Hero;
