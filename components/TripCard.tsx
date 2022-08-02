import Image from "next/image";
import Button from "../components/Button";
import { TypeGroupTrip } from "../types";

type CardProps = {
  trip: TypeGroupTrip;
};

const TripCard = ({ trip }: CardProps) => {
  const { slug, thumbImg } = trip.fields;
  return (
    <div>
      {thumbImg.fields.file.details.image && (
        <Image
          src={`https:${thumbImg.fields.file.url}`}
          alt={thumbImg.fields.description}
          width={thumbImg.fields.file.details.image.width}
          height={thumbImg.fields.file.details.image.height}
        />
      )}
      <Button
        buttonType="dark"
        value="Learn More"
        location={`/trips/${slug}`}
      />
    </div>
  );
};

export default TripCard;
