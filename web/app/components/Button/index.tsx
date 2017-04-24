import Component from 'inferno-component';
import * as styles from './Button.css';

interface ButtonProps {
  onClick: () => void;
  children: any;
  disabled?: boolean;
}

export default class Button extends Component<ButtonProps, undefined> {
  render() {
    const {onClick, children, disabled} = this.props;
    return (
      <div className={styles.ButtonOuter}>
        <button className={styles.Button}
                disabled={disabled}
                onClick={onClick}>{children}</button>
      </div>
    )
  }
}