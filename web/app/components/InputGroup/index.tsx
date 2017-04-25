import * as styles from './InputGroup.css';

export default function InputGroup({children}) {
  return (
    <div className={styles.InputGroup}>{children}</div>
  );
}