import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.mainContainer}>
      <img src="/images/Logo.svg" alt="logo" />
    </header>
  );
}
