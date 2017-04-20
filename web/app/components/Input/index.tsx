import Component from 'inferno-component';

interface InputProps {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (value) => void;
}

export default class Input extends Component<InputProps, undefined> {
  private onChange: (e) => void | any;

  constructor(props) {
    super(props);
    this.onChange = e => this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input type="text"
             className={this.props.className}
             value={this.props.value}
             placeholder={this.props.placeholder}
             onChange={this.onChange} />
    );
  }
}
