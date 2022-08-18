import Link from "next/link";
import styles from "../styles/Button.module.scss";

type ButtonProps = {
  buttonType: string;
  location: string;
  value: string;
  onClick?: () => void;
};

const Button = ({ buttonType, location, value, onClick }: ButtonProps) => {
  return (
    <Link href={location}>
      <a className={styles[buttonType]} onClick={onClick}>
        {value}
      </a>
    </Link>
  );
};

export default Button;
