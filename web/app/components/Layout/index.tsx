import * as styles from './Layout.css';
import NavBar from '../NavBar';

export default function Layout({children}) {
  return (
    <div className={styles.Layout}>
      <NavBar />
      <div className={styles.Container}>
        {children}
      </div>
    </div>
  );
}
