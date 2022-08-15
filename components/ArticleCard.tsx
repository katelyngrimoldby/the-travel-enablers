import Image from "next/image";
import Button from "../components/Button";
import styles from "../styles/ArticleCard.module.scss";
import { TypeArticle } from "../types";

type CardProps = {
  article: TypeArticle;
  buttonType: string;
};

const ArticleCard = ({ article, buttonType }: CardProps) => {
  const { title, slug, coverImage } = article.fields;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        {coverImage.fields.file.details.image && (
          <Image
            className={styles.img}
            src={`https:${coverImage.fields.file.url}`}
            alt={coverImage.fields.description}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}
            layout="fill"
          />
        )}
      </div>
      <span>{title}</span>
      <Button
        buttonType={buttonType}
        value="Learn More"
        location={`/trips/${slug}`}
      />
    </div>
  );
};

export default ArticleCard;
