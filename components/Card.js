import Link from 'next/link';
import styles from '../styles/layout.module.css'

const Card = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className={styles.card}>
        {children}
      </a>
    </Link>
  );
}

export default Card;