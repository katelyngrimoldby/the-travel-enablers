import styles from "../styles/WhiteBack.module.scss";

type WhiteBackProps = {
  children: React.ReactNode;
};

const WhiteBack = ({ children }: WhiteBackProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default WhiteBack;
