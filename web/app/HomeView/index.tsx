import Component from 'inferno-component';
import {Link} from 'inferno-router';
import {debounce} from 'lodash';
import {format} from 'date-fns';
import InputGroup from '../components/InputGroup';
import Input from '../components/Input';
import Button from '../components/Button';
import * as Api from '../api';

const QUERY_DELAY = 250; // ms

interface Pasta {
  id: string;
  title: string;
  type: string;
  updated_at: string;
}

function PastaRow({id, type, updated_at, title}) {
  return (
    <tr>
      <td><Link to={`/pastas/${id}`}>{title}</Link></td>
      <td>{type}</td>
      <td>{format(updated_at, 'YYYY-MM-DD HH:mm:ss')}</td>
    </tr>
  );
}

interface PastaTableProps {
  pastas: Pasta[];
}

class PastaTable extends Component<PastaTableProps, undefined> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Language</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">
              <Link to="/pastas/new">New pasta...</Link>
            </td>
          </tr>
          {
            this.props.pastas.map((pasta, i) =>
              <PastaRow key={`pasta-${i}`} {...pasta} />
            )
          }
        </tbody>
      </table>
    );
  }
}

export default class HomeView extends Component<any, any> {
  private debouncedQuery: any;

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isLoading: true,
      pastas: []
    };

    this.debouncedQuery = debounce(this.runQuery.bind(this), QUERY_DELAY);
  }

  private runQuery() {
    Api.fetchPastaIndex(this.state.query)
      .then(pastas => {
        this.setState({
          pastas: pastas,
          isLoading: false
        });
      })
      .catch(err => {
        console.log('Got error', err);
        this.setState({
          pastas: [],
          isLoading: false
        });
      });
  }

  componentWillMount() {
    document.title = `Pastakone - Hall of Spaghetti`;
    this.runQuery();
  }

  private queryChanged(query, immediate=false) {
    const runQuery = immediate ? this.runQuery :
                                 this.debouncedQuery;
    this.setState({query: query}, runQuery);
  }

  render() {
    const {pastas, isLoading, query} = this.state;

    return (
      <div>
        <InputGroup>
          <label>Search</label>
          <Input value={query}
                 onInput={(query) => this.queryChanged(query)} />
          {
            query ?
              <Button style="small"
                      onClick={() => this.queryChanged('', true)}>X</Button> :
              null
          }
        </InputGroup>

        {
          isLoading ?
            <div>Loading...</div> :
            <PastaTable pastas={pastas} />
        }
      </div>
    );
  }
}
