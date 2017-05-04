import {linkEvent} from 'inferno';
import Component from 'inferno-component';
import {connect} from 'inferno-redux';
import * as Api from '../api';
import CodeEditor from '../components/CodeEditor';
import PASTA_TYPES from '../constants/languages';
import Button from '../components/Button';
import Input from '../components/Input';
import InputGroup from '../components/InputGroup';
import * as styles from './PastaView.css';
import {StoreInterface} from "../store/index";

class PastaView extends Component<any, any> {
  private codeEditor: any;
  private onTitleChange: (title) => void;
  private onTypeChange: (type) => void;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      type: this.props.settings.defaultLanguage,
      contents: '',
      isLoading: true,
      isSaving: false,
      isSaved: false
    };

    this.onTitleChange = title => this.setState({title: title});
    this.onTypeChange = e => this.setState({type: e.target.value});
  }

  componentDidMount() {
    const id = this.props.params.id;

    if (id === "new") {
      document.title = `Pastakone - New pasta`;
    }

    if (id && id !== 'new') {
      Api.fetchPasta(id)
        .then(response => {
          console.log('Got response', response);
          const pasta = response.data;
          this.setState({
            title: pasta.title,
            type: pasta.type,
            contents: pasta.contents,
            isLoading: false,
            isSaving: false,
            isSaved: false
          });

          document.title = `Pastakone - ${pasta.title} [${pasta.type}]`;
        })
        .catch(err => {
          console.log('Got error', err);
          this.setState({
            isLoading: false,
            isSaving: false,
            isSaved: false
          });
        });
    }
    else {
      this.setState({
        isLoading: false,
        isSaving: false,
        isSaved: false
      });
    }
  }

  private onSave(instance: PastaView) {
    const id = instance.props.params.id;

    const pasta = {
      title: instance.state.title,
      contents: instance.codeEditor.value(),
      type: instance.state.type
    };

    const saving = id === 'new' ?
                   Api.createPasta(pasta) :
                   Api.updatePasta(id, pasta);

    instance.setState({isSaving: true, isSaved: false}, () => {
      saving
        .then(response => {
          // Route to new ID upon saving
          if (id === 'new') {
            const newId = response.data.id;
            instance.context.router.push(`/pastas/${newId}`);
          }

          instance.setState({isSaving: false, isSaved: true});
        })
        .then(err => {
          console.log('*** err', err);
          instance.setState({isSaving: false});
        });
    });
  }

  private onDelete(instance: PastaView) {
    if (confirm("Are you sure?")) {
      const id = instance.props.params.id;

      if (id) {
        Api.deletePasta(id)
          .then(() => {
            // Route back to index view
            instance.context.router.push('/');
          })
          .catch(err => {
            console.log('*** err', err);
          });
      }
    }
  }

  private createRawLink(): string | null {
    const id = this.props.params.id;

    return id && id !== 'new' ?
           `/pastas/${id}/raw` :
           null;
  }

  render() {
    const rawLink = this.createRawLink();

    return (
      <div>
        <InputGroup>
          <label className={styles.Label}>Title</label>
          <Input className={styles.TitleInput}
                 value={this.state.title}
                 onChange={this.onTitleChange}
                 placeholder="Title" />
        </InputGroup>

        <InputGroup>
          <select value={this.state.type} onChange={this.onTypeChange}>
            {
              PASTA_TYPES.map(type => <option value={type}>{type}</option>)
            }
          </select>
        </InputGroup>

        <Button onClick={linkEvent(this, this.onSave)}>{
          this.state.isSaving ? 'Saving...' :
                                this.state.isSaved ? 'Saved!' :
                                                     'Save'
        }</Button>

        {
          rawLink ?
            <a href={`/pastas/${this.props.params.id}/raw`}>
              <Button>Raw pasta</Button>
            </a> :
            <Button disabled={true}>Raw pasta</Button>
        }

        <Button buttonStyle="danger"
                onClick={linkEvent(this, this.onDelete)}>Delete</Button>

        {
          this.state.isLoading ?
            <div>Loading...</div> :
            <CodeEditor ref={ref => this.codeEditor = ref}
                        title={this.state.title}
                        type={this.state.type}
                        contents={this.state.contents}
                        theme={this.props.settings.theme}
                        fontSize={this.props.settings.fontSize} />
        }
      </div>
    );
  }
}

const connectSettingsState = connect(
  (state: StoreInterface) => ({
    settings: state.settings
  })
);

export default connectSettingsState(PastaView);
