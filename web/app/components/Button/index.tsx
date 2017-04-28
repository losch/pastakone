import Component from 'inferno-component';
import * as styles from './Button.css';

type ButtonNormalStyle = 'normal';
type ButtonSmallStyle = 'small';
type ButtonStyle = ButtonNormalStyle | ButtonSmallStyle;


interface ButtonProps {
  onClick: () => void;
  children: any;
  disabled?: boolean;
  style?: ButtonStyle;
}

export default class Button extends Component<ButtonProps, undefined> {
  render() {
    const {onClick, children, disabled, style} = this.props;

    return (
      <div className={style === 'small' ? styles.SmallButtonOuter :
                                          styles.ButtonOuter }>
        <button className={style === 'small' ? styles.SmallButton :
                                               styles.Button}
                disabled={disabled}
                onClick={onClick}>{children}</button>
      </div>
    )
  }
}