import {Link} from 'inferno-router';
import * as styles from './NavBar.css';

export default function NavBar() {
  return (
    <div className={styles.NavBar}>
      <Link className={styles.BrandText} to="/">Pastakone</Link>
      <Link className={styles.RightText} to="/settings">Settings</Link>
    </div>
  );
}
