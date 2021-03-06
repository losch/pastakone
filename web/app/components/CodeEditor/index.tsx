import Component from 'inferno-component';
import * as ace from 'brace';
import {loadTheme} from './themes';
import {loadMode} from './modes';
import * as AceAjax from 'brace';
import * as styles from './CodeEditor.css';

interface CodeEditorProps {
  title?: string;
  type?: string;
  contents?: string;
  theme?: string;
  fontSize?: string;
  className?: string;
}

export default class CodeEditor extends Component<CodeEditorProps, any> {
  refEditor: any;
  private editor: AceAjax.Editor | null;

  constructor(props) {
    super(props);
  }

  private loadMode(props) {
    const mode = props.type || 'plain_text';

    const setMode = () => {
      if (this.editor) {
        console.log('Mode loaded, setting', mode);
        this.editor.getSession()
                   .setMode(`ace/mode/${props.type}`);
      }
    };

    if (mode === 'plain_text') {
      setMode();
    }
    else {
      console.log('Loading mode', props.type);
      loadMode(mode, setMode);
    }
  }

  private loadTheme(props) {
    const theme = props.theme || 'monokai';

    loadTheme(props.theme, () => {
      if (this.editor) {
        this.editor.setTheme(`ace/theme/${theme}`);
      }
    });
  }

  private setFontSize(props) {
    if (this.editor && props.fontSize !== undefined) {
      this.editor.setFontSize(props.fontSize + 'px');
    }
  }

  componentDidMount() {
    this.editor = ace.edit(this.refEditor);

    if (this.props.contents) {
      // Load contents and set cursor to the beginning
      this.editor.setValue(this.props.contents, -1);
    }

    this.loadTheme(this.props);
    this.loadMode(this.props);
    this.setFontSize(this.props);
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
    this.editor = null;
  }

  componentWillReceiveProps(nextProps: CodeEditorProps) {
    if (this.editor) {
      if (this.props.type !== nextProps.type) {
        this.loadMode(nextProps);
      }

      if (this.props.theme !== nextProps.theme) {
        this.loadTheme(nextProps);
      }

      if (this.props.fontSize !== nextProps.fontSize) {
        this.setFontSize(nextProps);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  value() {
    return this.editor ?
           this.editor.getValue() :
           '';
  }

  render() {
    return (
      <div id="javascript-editor"
           className={this.props.className || styles.CodeEditor}
           ref={ref => this.refEditor = ref} />
    );
  }
}
