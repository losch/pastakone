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

type SettingsAction = DefaultLanguageAction |
                      ChangeThemeAction;

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

/*
 * Reducer
 */

export interface SettingsState {
  defaultLanguage: string;
  theme: string;
}

const initialState: SettingsState = {
  defaultLanguage: 'plain_text',
  theme: 'monokai'
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

    default:
      return state;
  }
}
