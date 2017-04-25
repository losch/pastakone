import {linkEvent} from 'inferno';
import Component from 'inferno-component';
import {connect} from 'inferno-redux';
import {StoreInterface} from "../store/index";
import {Dispatch} from "redux";
import {
  createChangeThemeAction,
  createDefaultLanguageAction
} from "../store/settings/index";
import LANGUAGES from '../constants/languages';
import THEMES from '../constants/themes';
import InputGroup from '../components/InputGroup';
import CodeEditor from '../components/CodeEditor';
import * as styles from './UserSettingsView.css';

const TEST_DATA =
`import {createStore, combineReducers, Reducer, Store, compose} from 'redux';
import persistState from 'redux-localstorage'
import settings, {SettingsState} from './settings';

export interface StoreInterface {
  settings: SettingsState
}

// Root reducer
const rootReducer = combineReducers(
  {
    settings: settings
  }
) as Reducer<StoreInterface>;

// Middlewares
const enhancer = compose(
  persistState(['settings'], {key: 'pastakone'}),
);

const store: Store<StoreInterface> = createStore(rootReducer, enhancer);

export default store;
`;

class UserSettingsView extends Component<any, any> {
  onTypeChange(instance, e) {
    const language = e.target.value;
    instance.props.changeDefaultLanguage(language);
  }

  onThemeChange(instance, e) {
    const theme = e.target.value;
    instance.props.changeTheme(theme);
  }

  render() {
    return (
      <div>
        <h1 className={styles.Title}>User settings</h1>

        <div>
          <InputGroup>
            <label className={styles.Label}>Default language</label>

            <select value={this.props.defaultLanguage}
                    onChange={linkEvent(this, this.onTypeChange)}>
              {
                LANGUAGES.map(type => <option value={type}>{type}</option>)
              }
            </select>
          </InputGroup>
        </div>

        <div>
          <InputGroup>
            <label className={styles.Label}>Theme</label>

            <select value={this.props.theme}
                    onChange={linkEvent(this, this.onThemeChange)}>
              {
                THEMES.map(type => <option value={type}>{type}</option>)
              }
            </select>
          </InputGroup>

          <CodeEditor theme={this.props.theme}
                      type="typescript"
                      contents={TEST_DATA} />
        </div>
      </div>
    );
  }
}

const connectSettingsState = connect(
  (state: StoreInterface) => ({
    defaultLanguage: state.settings.defaultLanguage,
    theme: state.settings.theme
  }),
  (dispatch: Dispatch<StoreInterface>) => ({
    changeDefaultLanguage: (language: string) =>
      dispatch(createDefaultLanguageAction(language)),
    changeTheme: (theme: string) =>
      dispatch(createChangeThemeAction(theme))
  })
);

export default connectSettingsState(UserSettingsView);