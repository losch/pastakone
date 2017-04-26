import Component from 'inferno-component';
import * as ace from 'brace';

import {loadMode} from './modes';

// Light themes
import 'brace/theme/chrome';
import 'brace/theme/github';

// Dark themes
import 'brace/theme/ambiance';
import 'brace/theme/merbivore';
import 'brace/theme/monokai';

import * as AceAjax from 'brace';
import * as styles from './CodeEditor.css';


interface CodeEditorProps {
  title?: string;
  type?: string;
  contents?: string;
  theme?: string;
}

export default class CodeEditor extends Component<CodeEditorProps, any> {
  refEditor: any;
  private editor: AceAjax.Editor | null;

  constructor(props) {
    super(props);
  }

  loadMode(props) {
    const mode = props.type ?
                 `ace/mode/${props.type}` :
                 'ace/mode/plain_text';

    const setMode = () => {
      if (this.editor) {
        console.log('Mode loaded, setting', mode);
        this.editor.getSession().setMode(mode);
      }
    };

    if (props.type && props.type !== 'plain_text') {
      console.log('Loading mode', props.type);
      loadMode(props.type, setMode);
    }
    else {
      setMode();
    }
  }

  componentDidMount() {
    this.editor = ace.edit(this.refEditor);

    if (this.props.contents) {
      this.editor.setValue(this.props.contents, -1);
    }

    this.loadMode(this.props);

    const theme = this.props.theme ?
                  `ace/theme/${this.props.theme}` :
                  'ace/theme/monokai';
    this.editor.setTheme(theme);
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
    this.editor = null;
  }

  componentWillReceiveProps(nextProps: CodeEditorProps) {
    if (this.editor && this.props.type !== nextProps.type) {
      this.loadMode(nextProps);
    }

    if (this.editor && this.props.theme !== nextProps.theme) {
      const theme = nextProps.theme ?
                    `ace/theme/${nextProps.theme}` :
                    'ace/theme/monokai';
      this.editor.setTheme(theme);
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
           className={styles.CodeEditor}
           ref={ref => this.refEditor = ref} />
    );
  }
}
