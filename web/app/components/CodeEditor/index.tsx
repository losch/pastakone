import Component from 'inferno-component';
import * as ace from 'brace';

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

import 'brace/theme/monokai';
import * as AceAjax from 'brace';
import * as styles from './CodeEditor.css';

export const PASTA_TYPES = [
  'plain_text',
  'html',
  'css',
  'java',
  'javascript',
  'haskell',
  'clojure',
  'erlang',
  'elixir',
  'elm',
  'dockerfile',
  'gitignore',
  'groovy',
  'json',
  'jsx',
  'markdown',
  'makefile',
  'php',
  'python',
  'r',
  'ruby',
  'rust',
  'sass',
  'scala',
  'sql',
  'typescript',
  'xquery',
  'xml'
];

interface CodeEditorProps {
  title?: string;
  type?: string;
  contents?: string;
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
    this.editor.setTheme('ace/theme/monokai');
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
