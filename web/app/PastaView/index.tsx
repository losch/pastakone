import Component from 'inferno-component';
import {IndexLink} from 'inferno-router';
import * as Api from '../api';
import CodeEditor from '../components/CodeEditor';
import {PASTA_TYPES} from '../components/CodeEditor';
import Button from '../components/Button';
import Input from '../components/Input';
import * as styles from './PastaView.css';

export default class PastaView extends Component<any, any> {
  private codeEditor: any;
  private onTitleChange: (title) => void;
  private onTypeChange: (type) => void;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      type: 'plain_text',
      contents: '',
      isLoading: true,
      isSaving: false,
      isSaved: false
    };

    this.onTitleChange = title => this.setState({title: title});
    this.onTypeChange = e => this.setState({type: e.target.value});
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillMount() {
    const id = this.props.params.id;
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

  onSave() {
    const id = this.props.params.id;

    const pasta = {
      title: this.state.title,
      contents: this.codeEditor.value(),
      type: this.state.type
    };

    const saving = id == 'new' ?
                   Api.createPasta(pasta) :
                   Api.updatePasta(id, pasta);

    this.setState({isSaving: true, isSaved: false}, () => {
      saving
        .then(response => {
          console.log('**** OK', response);
          this.setState({isSaving: false, isSaved: true});
        })
        .then(err => {
          console.log('*** err', err);
          this.setState({isSaving: false});
        });
    });
  }

  onCancel() {
  }

  render() {
    return (
      <div>
        <div className={styles.InputGroup}>
          <label className={styles.Label}>Title</label>
          <Input className={styles.TitleInput}
                 value={this.state.title}
                 onChange={this.onTitleChange}
                 placeholder="Title" />
        </div>

        <div className={styles.InputGroup}>
          <select value={this.state.type} onChange={this.onTypeChange}>
            {
              PASTA_TYPES.map(type => <option value={type}>{type}</option>)
            }
          </select>
        </div>

        <Button onClick={this.onSave}>{
          this.state.isSaving ?
            'Saving...' :
            this.state.isSaved ?
              'Saved!' :
              'Save'
        }</Button>
        <IndexLink><Button onClick={this.onCancel}>Show all pastas</Button></IndexLink>
        {
          this.state.isLoading ?
            <div>Loading...</div> :
            <CodeEditor ref={ref => this.codeEditor = ref}
                        title={this.state.title}
                        type={this.state.type}
                        contents={this.state.contents} />
        }
      </div>
    );
  }
}
