import Image from "next/image";
import Button from "../components/Button";
import { TypeGroupTrip } from "../types";
import styles from "../styles/TripCard.module.scss";

type CardProps = {
  trip: TypeGroupTrip;
  buttonType: string;
};

const TripCard = ({ trip, buttonType }: CardProps) => {
  const { slug, thumbImg } = trip.fields;
  return (
    <div className={styles.wrapper}>
      {thumbImg.fields.file.details.image && (
        <Image
          src={`https:${thumbImg.fields.file.url}`}
          alt={thumbImg.fields.description}
          width={thumbImg.fields.file.details.image.width}
          height={thumbImg.fields.file.details.image.height}
        />
      )}
      <Button
        buttonType={buttonType}
        value="View Trip"
        location={`/trips/${slug}`}
      />
    </div>
  );
};

export default TripCard;
