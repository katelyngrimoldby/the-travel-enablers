import Image, { StaticImageData } from "next/image";
import styles from "../styles/DividerImg.module.scss";

type DividerImgProps = {
  children?: React.ReactNode;
  imgSrc: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
};

const DividerImg = ({
  children,
  imgSrc,
  alt,
  width,
  height,
}: DividerImgProps) => {
  return (
    <div className={styles.dividerImg}>
      <div className={styles.content}>{children}</div>
        <Image
          src={imgSrc}
          alt={alt}
          height={height}
          width={width}
          className={styles.img}
        />
    </div>
  );
};

export default DividerImg;
