import 'brace/mode/plain_text'

declare let require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[],
           callback: (require: <T>(path: string) => T) => void) => void;
};

export const MODES = [
  'abap',
  'abc',
  'actionscript',
  'ada',
  'apache_conf',
  'applescript',
  'asciidoc',
  'assembly_x86',
  'autohotkey',
  'batchfile',
  'bro',
  'c9search',
  'c_cpp',
  'cirru',
  'clojure',
  'cobol',
  'coffee',
  'coldfusion',
  'csharp',
  'css',
  'curly',
  'd',
  'dart',
  'diff',
  'django',
  'dockerfile',
  'dot',
  'drools',
  'eiffel',
  'ejs',
  'elixir',
  'elm',
  'erlang',
  'forth',
  'fortran',
  'ftl',
  'gcode',
  'gherkin',
  'gitignore',
  'glsl',
  'gobstones',
  'golang',
  'groovy',
  'haml',
  'handlebars',
  'haskell',
  'haskell_cabal',
  'haxe',
  'hjson',
  'html',
  'html_elixir',
  'html_ruby',
  'ini',
  'io',
  'jack',
  'jade',
  'java',
  'javascript',
  'json',
  'jsoniq',
  'jsp',
  'jsx',
  'julia',
  'kotlin',
  'latex',
  'lean',
  'less',
  'liquid',
  'lisp',
  'live_script',
  'livescript',
  'logiql',
  'lsl',
  'lua',
  'luapage',
  'lucene',
  'makefile',
  'markdown',
  'mask',
  'matlab',
  'mavens_mate_log',
  'maze',
  'mel',
  'mips_assembler',
  'mipsassembler',
  'mushcode',
  'mysql',
  'nix',
  'nsis',
  'objectivec',
  'ocaml',
  'pascal',
  'perl',
  'pgsql',
  'php',
  'plain_text',
  'powershell',
  'praat',
  'prolog',
  'properties',
  'protobuf',
  'python',
  'r',
  'razor',
  'rdoc',
  'rhtml',
  'rst',
  'ruby',
  'rust',
  'sass',
  'scad',
  'scala',
  'scheme',
  'scss',
  'sh',
  'sjs',
  'smarty',
  'snippets',
  'soy_template',
  'space',
  'sql',
  'sqlserver',
  'stylus',
  'svg',
  'swift',
  'swig',
  'tcl',
  'tex',
  'text',
  'textile',
  'toml',
  'tsx',
  'twig',
  'typescript',
  'vala',
  'vbscript',
  'velocity',
  'verilog',
  'vhdl',
  'wollok',
  'xml',
  'xquery',
  'yaml'
];

/**
 * Loads mode asynchronously
 * @param mode - Mode to load
 * @param callback - Done callback
 */
export function loadMode(mode, callback) {
  switch (mode) {
    case 'abap': require(['brace/mode/abap'], callback); break;
    case 'abc': require(['brace/mode/abc'], callback); break;
    case 'actionscript': require(['brace/mode/actionscript'], callback); break;
    case 'ada': require(['brace/mode/ada'], callback); break;
    case 'apache_conf': require(['brace/mode/apache_conf'], callback); break;
    case 'applescript': require(['brace/mode/applescript'], callback); break;
    case 'asciidoc': require(['brace/mode/asciidoc'], callback); break;
    case 'assembly_x86': require(['brace/mode/assembly_x86'], callback); break;
    case 'autohotkey': require(['brace/mode/autohotkey'], callback); break;
    case 'batchfile': require(['brace/mode/batchfile'], callback); break;
    case 'bro': require(['brace/mode/bro'], callback); break;
    case 'c9search': require(['brace/mode/c9search'], callback); break;
    case 'c_cpp': require(['brace/mode/c_cpp'], callback); break;
    case 'cirru': require(['brace/mode/cirru'], callback); break;
    case 'clojure': require(['brace/mode/clojure'], callback); break;
    case 'cobol': require(['brace/mode/cobol'], callback); break;
    case 'coffee': require(['brace/mode/coffee'], callback); break;
    case 'coldfusion': require(['brace/mode/coldfusion'], callback); break;
    case 'csharp': require(['brace/mode/csharp'], callback); break;
    case 'css': require(['brace/mode/css'], callback); break;
    case 'curly': require(['brace/mode/curly'], callback); break;
    case 'd': require(['brace/mode/d'], callback); break;
    case 'dart': require(['brace/mode/dart'], callback); break;
    case 'diff': require(['brace/mode/diff'], callback); break;
    case 'django': require(['brace/mode/django'], callback); break;
    case 'dockerfile': require(['brace/mode/dockerfile'], callback); break;
    case 'dot': require(['brace/mode/dot'], callback); break;
    case 'drools': require(['brace/mode/drools'], callback); break;
    case 'eiffel': require(['brace/mode/eiffel'], callback); break;
    case 'ejs': require(['brace/mode/ejs'], callback); break;
    case 'elixir': require(['brace/mode/elixir'], callback); break;
    case 'elm': require(['brace/mode/elm'], callback); break;
    case 'erlang': require(['brace/mode/erlang'], callback); break;
    case 'forth': require(['brace/mode/forth'], callback); break;
    case 'fortran': require(['brace/mode/fortran'], callback); break;
    case 'ftl': require(['brace/mode/ftl'], callback); break;
    case 'gcode': require(['brace/mode/gcode'], callback); break;
    case 'gherkin': require(['brace/mode/gherkin'], callback); break;
    case 'gitignore': require(['brace/mode/gitignore'], callback); break;
    case 'glsl': require(['brace/mode/glsl'], callback); break;
    case 'gobstones': require(['brace/mode/gobstones'], callback); break;
    case 'golang': require(['brace/mode/golang'], callback); break;
    case 'groovy': require(['brace/mode/groovy'], callback); break;
    case 'haml': require(['brace/mode/haml'], callback); break;
    case 'handlebars': require(['brace/mode/handlebars'], callback); break;
    case 'haskell': require(['brace/mode/haskell'], callback); break;
    case 'haskell_cabal': require(['brace/mode/haskell_cabal'], callback); break;
    case 'haxe': require(['brace/mode/haxe'], callback); break;
    case 'hjson': require(['brace/mode/hjson'], callback); break;
    case 'html': require(['brace/mode/html'], callback); break;
    case 'html_elixir': require(['brace/mode/html_elixir'], callback); break;
    case 'html_ruby': require(['brace/mode/html_ruby'], callback); break;
    case 'ini': require(['brace/mode/ini'], callback); break;
    case 'io': require(['brace/mode/io'], callback); break;
    case 'jack': require(['brace/mode/jack'], callback); break;
    case 'jade': require(['brace/mode/jade'], callback); break;
    case 'java': require(['brace/mode/java'], callback); break;
    case 'javascript': require(['brace/mode/javascript'], callback); break;
    case 'json': require(['brace/mode/json'], callback); break;
    case 'jsoniq': require(['brace/mode/jsoniq'], callback); break;
    case 'jsp': require(['brace/mode/jsp'], callback); break;
    case 'jsx': require(['brace/mode/jsx'], callback); break;
    case 'julia': require(['brace/mode/julia'], callback); break;
    case 'kotlin': require(['brace/mode/kotlin'], callback); break;
    case 'latex': require(['brace/mode/latex'], callback); break;
    case 'lean': require(['brace/mode/lean'], callback); break;
    case 'less': require(['brace/mode/less'], callback); break;
    case 'liquid': require(['brace/mode/liquid'], callback); break;
    case 'lisp': require(['brace/mode/lisp'], callback); break;
    case 'live_script': require(['brace/mode/live_script'], callback); break;
    case 'livescript': require(['brace/mode/livescript'], callback); break;
    case 'logiql': require(['brace/mode/logiql'], callback); break;
    case 'lsl': require(['brace/mode/lsl'], callback); break;
    case 'lua': require(['brace/mode/lua'], callback); break;
    case 'luapage': require(['brace/mode/luapage'], callback); break;
    case 'lucene': require(['brace/mode/lucene'], callback); break;
    case 'makefile': require(['brace/mode/makefile'], callback); break;
    case 'markdown': require(['brace/mode/markdown'], callback); break;
    case 'mask': require(['brace/mode/mask'], callback); break;
    case 'matlab': require(['brace/mode/matlab'], callback); break;
    case 'mavens_mate_log': require(['brace/mode/mavens_mate_log'], callback); break;
    case 'maze': require(['brace/mode/maze'], callback); break;
    case 'mel': require(['brace/mode/mel'], callback); break;
    case 'mips_assembler': require(['brace/mode/mips_assembler'], callback); break;
    case 'mipsassembler': require(['brace/mode/mipsassembler'], callback); break;
    case 'mushcode': require(['brace/mode/mushcode'], callback); break;
    case 'mysql': require(['brace/mode/mysql'], callback); break;
    case 'nix': require(['brace/mode/nix'], callback); break;
    case 'nsis': require(['brace/mode/nsis'], callback); break;
    case 'objectivec': require(['brace/mode/objectivec'], callback); break;
    case 'ocaml': require(['brace/mode/ocaml'], callback); break;
    case 'pascal': require(['brace/mode/pascal'], callback); break;
    case 'perl': require(['brace/mode/perl'], callback); break;
    case 'pgsql': require(['brace/mode/pgsql'], callback); break;
    case 'php': require(['brace/mode/php'], callback); break;
    case 'powershell': require(['brace/mode/powershell'], callback); break;
    case 'praat': require(['brace/mode/praat'], callback); break;
    case 'prolog': require(['brace/mode/prolog'], callback); break;
    case 'properties': require(['brace/mode/properties'], callback); break;
    case 'protobuf': require(['brace/mode/protobuf'], callback); break;
    case 'python': require(['brace/mode/python'], callback); break;
    case 'r': require(['brace/mode/r'], callback); break;
    case 'razor': require(['brace/mode/razor'], callback); break;
    case 'rdoc': require(['brace/mode/rdoc'], callback); break;
    case 'rhtml': require(['brace/mode/rhtml'], callback); break;
    case 'rst': require(['brace/mode/rst'], callback); break;
    case 'ruby': require(['brace/mode/ruby'], callback); break;
    case 'rust': require(['brace/mode/rust'], callback); break;
    case 'sass': require(['brace/mode/sass'], callback); break;
    case 'scad': require(['brace/mode/scad'], callback); break;
    case 'scala': require(['brace/mode/scala'], callback); break;
    case 'scheme': require(['brace/mode/scheme'], callback); break;
    case 'scss': require(['brace/mode/scss'], callback); break;
    case 'sh': require(['brace/mode/sh'], callback); break;
    case 'sjs': require(['brace/mode/sjs'], callback); break;
    case 'smarty': require(['brace/mode/smarty'], callback); break;
    case 'snippets': require(['brace/mode/snippets'], callback); break;
    case 'soy_template': require(['brace/mode/soy_template'], callback); break;
    case 'space': require(['brace/mode/space'], callback); break;
    case 'sql': require(['brace/mode/sql'], callback); break;
    case 'sqlserver': require(['brace/mode/sqlserver'], callback); break;
    case 'stylus': require(['brace/mode/stylus'], callback); break;
    case 'svg': require(['brace/mode/svg'], callback); break;
    case 'swift': require(['brace/mode/swift'], callback); break;
    case 'swig': require(['brace/mode/swig'], callback); break;
    case 'tcl': require(['brace/mode/tcl'], callback); break;
    case 'tex': require(['brace/mode/tex'], callback); break;
    case 'text': require(['brace/mode/text'], callback); break;
    case 'textile': require(['brace/mode/textile'], callback); break;
    case 'toml': require(['brace/mode/toml'], callback); break;
    case 'tsx': require(['brace/mode/tsx'], callback); break;
    case 'twig': require(['brace/mode/twig'], callback); break;
    case 'typescript': require(['brace/mode/typescript'], callback); break;
    case 'vala': require(['brace/mode/vala'], callback); break;
    case 'vbscript': require(['brace/mode/vbscript'], callback); break;
    case 'velocity': require(['brace/mode/velocity'], callback); break;
    case 'verilog': require(['brace/mode/verilog'], callback); break;
    case 'vhdl': require(['brace/mode/vhdl'], callback); break;
    case 'wollok': require(['brace/mode/wollok'], callback); break;
    case 'xml': require(['brace/mode/xml'], callback); break;
    case 'xquery': require(['brace/mode/xquery'], callback); break;
    case 'yaml': require(['brace/mode/yaml'], callback); break;
    default: throw new Error(`Unknown mode: ${mode}`);
  }
}
