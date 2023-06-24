import * as Contentful from 'contentful';
import Image from 'next/image';
import styles from '../styles/Gallery.module.scss';

const Gallery = ({ gallery }: { gallery: Contentful.Asset[] }) => {
  return (
    <section
      id='gallery'
      className={styles.section}
    >
      <h2>Gallery</h2>
      <div className={styles.grid}>
        <div className={styles.col}>
          <Image
            src={`https:${gallery[0].fields.file.url}`}
            alt={gallery[0].fields.description}
            height={gallery[0].fields.file.details.image?.height}
            width={gallery[0].fields.file.details.image?.width}
          />
          <Image
            src={`https:${gallery[1].fields.file.url}`}
            alt={gallery[1].fields.description}
            height={gallery[1].fields.file.details.image?.height}
            width={gallery[1].fields.file.details.image?.width}
          />
        </div>
        <div className={styles.col}>
          <Image
            src={`https:${gallery[2].fields.file.url}`}
            alt={gallery[2].fields.description}
            height={gallery[2].fields.file.details.image?.height}
            width={gallery[2].fields.file.details.image?.width}
          />
          <Image
            src={`https:${gallery[3].fields.file.url}`}
            alt={gallery[3].fields.description}
            height={gallery[3].fields.file.details.image?.height}
            width={gallery[3].fields.file.details.image?.width}
          />
        </div>
        <div className={styles.col}>
          <Image
            src={`https:${gallery[4].fields.file.url}`}
            alt={gallery[4].fields.description}
            height={gallery[4].fields.file.details.image?.height}
            width={gallery[4].fields.file.details.image?.width}
          />
          <Image
            src={`https:${gallery[5].fields.file.url}`}
            alt={gallery[5].fields.description}
            height={gallery[5].fields.file.details.image?.height}
            width={gallery[5].fields.file.details.image?.width}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
