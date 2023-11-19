import Link from "next/link";
import styles from './Header.module.sass'

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href={'/'}>Домой</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;