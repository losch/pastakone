/*
 * User settings state
 */

/*
 * Actions
 */

interface DefaultLanguageAction {
  type: 'CHANGE_DEFAULT_LANGUAGE';
  language: string;
}

interface ChangeThemeAction {
  type: 'CHANGE_THEME';
  theme: string;
}

interface ChangeFontSizeAction {
  type: 'CHANGE_FONT_SIZE';
  fontSize: string;
}

type SettingsAction = DefaultLanguageAction |
                      ChangeThemeAction |
                      ChangeFontSizeAction;

/*
 * Action creators
 */

export function
createDefaultLanguageAction(language: string): DefaultLanguageAction
{
  return {
    type: 'CHANGE_DEFAULT_LANGUAGE',
    language: language
  };
}

export function createChangeThemeAction(theme: string): ChangeThemeAction {
  return {
    type: 'CHANGE_THEME',
    theme: theme
  };
}

export function createFontSizeChangeAction(fontSize: string): ChangeFontSizeAction {
  return {
    type: 'CHANGE_FONT_SIZE',
    fontSize: fontSize
  };
}

/*
 * Reducer
 */

export interface SettingsState {
  defaultLanguage: string;
  theme: string;
  fontSize: string;
}

const initialState: SettingsState = {
  defaultLanguage: 'plain_text',
  theme: 'monokai',
  fontSize: '12'
};

export default function reducer(state: SettingsState = initialState,
                                action: SettingsAction) {
  switch (action.type) {
    case 'CHANGE_DEFAULT_LANGUAGE':
      return {
        ...state,
        defaultLanguage: action.language
      };

    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme
      };

    case 'CHANGE_FONT_SIZE':
      return {
        ...state,
        fontSize: action.fontSize
      };

    default:
      return state;
  }
}
