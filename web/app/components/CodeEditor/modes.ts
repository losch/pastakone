import 'brace/mode/plain_text'

declare let require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[],
           callback: (require: <T>(path: string) => T) => void) => void;
};

export const MODES = [
  'plain_text',
  'html',
  'css',
  'java',
  'jsp',
  'javascript',
  'haskell',
  'c_cpp',
  'csharp',
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
  'mysql',
  'pgsql',
  'typescript',
  'xquery',
  'xml'
];

/**
 * Loads mode asynchronously
 * @param mode - Mode to load
 * @param callback - Done callback
 */
export function loadMode(mode, callback) {
  switch (mode) {
    case 'c_cpp':      require(['brace/mode/c_cpp'], callback); break;
    case 'clojure':    require(['brace/mode/clojure'], callback); break;
    case 'csharp':     require(['brace/mode/csharp'], callback); break;
    case 'css':        require(['brace/mode/css'], callback); break;
    case 'erlang':     require(['brace/mode/erlang'], callback); break;
    case 'elixir':     require(['brace/mode/elixir'], callback); break;
    case 'elm':        require(['brace/mode/elm'], callback); break;
    case 'dockerfile': require(['brace/mode/dockerfile'], callback); break;
    case 'gitignore':  require(['brace/mode/gitignore'], callback); break;
    case 'groovy':     require(['brace/mode/groovy'], callback); break;
    case 'haskell':    require(['brace/mode/haskell'], callback); break;
    case 'html':       require(['brace/mode/html'], callback); break;
    case 'java':       require(['brace/mode/java'], callback); break;
    case 'javascript': require(['brace/mode/javascript'], callback); break;
    case 'json':       require(['brace/mode/json'], callback); break;
    case 'jsp':        require(['brace/mode/jsp'], callback); break;
    case 'jsx':        require(['brace/mode/jsx'], callback); break;
    case 'kotlin':     require(['brace/mode/kotlin'], callback); break;
    case 'markdown':   require(['brace/mode/markdown'], callback); break;
    case 'makefile':   require(['brace/mode/makefile'], callback); break;
    case 'mysql':      require(['brace/mode/mysql'], callback); break;
    case 'pgsql':      require(['brace/mode/pgsql'], callback); break;
    case 'php':        require(['brace/mode/php'], callback); break;
    case 'python':     require(['brace/mode/python'], callback); break;
    case 'r':          require(['brace/mode/r'], callback); break;
    case 'ruby':       require(['brace/mode/ruby'], callback); break;
    case 'rust':       require(['brace/mode/rust'], callback); break;
    case 'sass':       require(['brace/mode/sass'], callback); break;
    case 'scala':      require(['brace/mode/scala'], callback); break;
    case 'sql':        require(['brace/mode/sql'], callback); break;
    case 'typescript': require(['brace/mode/typescript'], callback); break;
    case 'xquery':     require(['brace/mode/xquery'], callback); break;
    case 'xml':        require(['brace/mode/xml'], callback); break;
    default:           throw new Error(`Unknown mode: ${mode}`);
  }
}
