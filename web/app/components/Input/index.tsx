import Component from 'inferno-component';

interface InputProps {
  className?: string;
  value: string;
  placeholder?: string;

  // Callback for change event after input is blurred
  onChange?: (value) => void;

  // Callback for change event when input value changes
  onInput?: (value) => void;
}

export default class Input extends Component<InputProps, undefined> {
  private onChange: (e) => void | any;
  private onInput: (e) => any;

  constructor(props) {
    super(props);

    const {onChange, onInput} = this.props;

    if (onChange) {
      this.onChange = e => onChange(e.target.value);
    }

    if (onInput) {
      this.onInput = e => onInput(e.target.value);
    }
  }

  render() {
    return (
      <input type="text"
             className={this.props.className}
             value={this.props.value}
             placeholder={this.props.placeholder}
             onChange={this.onChange}
             onInput={this.onInput} />
    );
  }
}
