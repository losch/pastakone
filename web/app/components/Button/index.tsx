import Component from 'inferno-component';
import * as styles from './Button.css';

type ButtonNormalStyle = 'normal';
type ButtonDangerStyle = 'danger';
type ButtonMediumStyle = 'medium';
type ButtonSmallStyle = 'small';
type ButtonStyle = ButtonNormalStyle |
                   ButtonMediumStyle |
                   ButtonDangerStyle |
                   ButtonSmallStyle;

interface ButtonProps {
  onClick: () => void;
  children: any;
  disabled?: boolean;
  buttonStyle?: ButtonStyle;
}

export default class Button extends Component<ButtonProps, undefined> {
  render() {
    const {onClick, children, disabled, buttonStyle} = this.props;

    let outerClass;
    let innerClass;

    switch (buttonStyle) {
      case 'small':
        outerClass = styles.SmallButtonOuter;
        innerClass = styles.SmallButton;
        break;

      case 'danger':
        outerClass = styles.DangerButtonOuter;
        innerClass = styles.DangerButton;
        break;

      case 'medium':
        outerClass = styles.MediumButtonOuter;
        innerClass = styles.MediumButton;
        break;

      default:
        outerClass = styles.ButtonOuter;
        innerClass = styles.Button;
    }

    return (
      <div className={outerClass}>
        <button className={innerClass}
                disabled={disabled}
                onClick={onClick}>{children}</button>
      </div>
    )
  }
}