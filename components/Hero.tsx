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
