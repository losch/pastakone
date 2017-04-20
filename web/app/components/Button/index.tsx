import Component from 'inferno-component';
import * as styles from './Button.css';

interface ButtonProps {
  onClick: () => void;
  children: any;
}

export default class Button extends Component<ButtonProps, undefined> {
  render() {
    const {onClick, children} = this.props;
    return (
      <div className={styles.ButtonOuter}>
        <button className={styles.Button}
                onClick={onClick}>{children}</button>
      </div>
    )
  }
}