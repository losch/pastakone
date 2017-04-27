declare let require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[],
           callback: (require: <T>(path: string) => T) => void) => void;
};

export const THEMES = [
  'ambiance',
  'chaos',
  'chrome',
  'clouds',
  'clouds_midnight',
  'cobalt',
  'crimson_editor',
  'dawn',
  'dreamweaver',
  'eclipse',
  'github',
  'idle_fingers',
  'iplastic',
  'katzenmilch',
  'kr_theme',
  'kuroir',
  'merbivore',
  'merbivore_soft',
  'mono_industrial',
  'monokai',
  'pastel_on_dark',
  'solarized_dark',
  'solarized_light',
  'sqlserver',
  'terminal',
  'textmate',
  'tomorrow',
  'tomorrow_night',
  'tomorrow_night_blue',
  'tomorrow_night_bright',
  'tomorrow_night_eighties',
  'twilight',
  'vibrant_ink',
  'xcode'
];

export function loadTheme(theme: string, callback: () => void) {
  switch (theme) {
    case 'ambiance': require(['brace/theme/ambiance'], callback); break;
    case 'chaos': require(['brace/theme/chaos'], callback); break;
    case 'chrome': require(['brace/theme/chrome'], callback); break;
    case 'clouds': require(['brace/theme/clouds'], callback); break;
    case 'clouds_midnight': require(['brace/theme/clouds_midnight'], callback); break;
    case 'cobalt': require(['brace/theme/cobalt'], callback); break;
    case 'crimson_editor': require(['brace/theme/crimson_editor'], callback); break;
    case 'dawn': require(['brace/theme/dawn'], callback); break;
    case 'dreamweaver': require(['brace/theme/dreamweaver'], callback); break;
    case 'eclipse': require(['brace/theme/eclipse'], callback); break;
    case 'github': require(['brace/theme/github'], callback); break;
    case 'idle_fingers': require(['brace/theme/idle_fingers'], callback); break;
    case 'iplastic': require(['brace/theme/iplastic'], callback); break;
    case 'katzenmilch': require(['brace/theme/katzenmilch'], callback); break;
    case 'kr_theme': require(['brace/theme/kr_theme'], callback); break;
    case 'kuroir': require(['brace/theme/kuroir'], callback); break;
    case 'merbivore': require(['brace/theme/merbivore'], callback); break;
    case 'merbivore_soft': require(['brace/theme/merbivore_soft'], callback); break;
    case 'mono_industrial': require(['brace/theme/mono_industrial'], callback); break;
    case 'monokai': require(['brace/theme/monokai'], callback); break;
    case 'pastel_on_dark': require(['brace/theme/pastel_on_dark'], callback); break;
    case 'solarized_dark': require(['brace/theme/solarized_dark'], callback); break;
    case 'solarized_light': require(['brace/theme/solarized_light'], callback); break;
    case 'sqlserver': require(['brace/theme/sqlserver'], callback); break;
    case 'terminal': require(['brace/theme/terminal'], callback); break;
    case 'textmate': require(['brace/theme/textmate'], callback); break;
    case 'tomorrow': require(['brace/theme/tomorrow'], callback); break;
    case 'tomorrow_night': require(['brace/theme/tomorrow_night'], callback); break;
    case 'tomorrow_night_blue': require(['brace/theme/tomorrow_night_blue'], callback); break;
    case 'tomorrow_night_bright': require(['brace/theme/tomorrow_night_bright'], callback); break;
    case 'tomorrow_night_eighties': require(['brace/theme/tomorrow_night_eighties'], callback); break;
    case 'twilight': require(['brace/theme/twilight'], callback); break;
    case 'vibrant_ink': require(['brace/theme/vibrant_ink'], callback); break;
    case 'xcode': require(['brace/theme/xcode'], callback); break;
    default: throw new Error(`Unknown theme ${theme}`);
  }
}
