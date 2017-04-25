import Component from 'inferno-component';
import * as ace from 'brace';

// Modes
import 'brace/mode/clojure';
import 'brace/mode/css';
import 'brace/mode/erlang';
import 'brace/mode/elixir';
import 'brace/mode/elm';
import 'brace/mode/dockerfile';
import 'brace/mode/gitignore';
import 'brace/mode/groovy';
import 'brace/mode/haskell';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/mode/markdown';
import 'brace/mode/makefile';
import 'brace/mode/php';
import 'brace/mode/plain_text'
import 'brace/mode/python';
import 'brace/mode/r';
import 'brace/mode/ruby';
import 'brace/mode/rust';
import 'brace/mode/sass';
import 'brace/mode/scala';
import 'brace/mode/sql';
import 'brace/mode/typescript';
import 'brace/mode/xquery';
import 'brace/mode/xml';

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

  componentDidMount() {
    this.editor = ace.edit(this.refEditor);

    if (this.props.contents) {
      this.editor.setValue(this.props.contents, -1);
    }

    const mode = this.props.type ?
                 `ace/mode/${this.props.type}` :
                 'ace/mode/plain';

    this.editor.getSession().setMode(mode);

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
      const mode = nextProps.type ?
                   `ace/mode/${nextProps.type}` :
                   'ace/mode/plain';
      this.editor.getSession().setMode(mode);
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
