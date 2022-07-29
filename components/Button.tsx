import Link from 'next/link';
import styles from '../styles/Button.module.scss';

type ButtonProps = {
  buttonType: string;
  location: string;
  value: string;
};

const Button = ({ buttonType, location, value }: ButtonProps) => {
  return (
    <Link href={location}>
      <a className={styles[buttonType]}>{value}</a>
    </Link>
  );
};

export default Button;
