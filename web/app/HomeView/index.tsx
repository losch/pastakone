import Component from 'inferno-component';
import {linkEvent} from 'inferno';
import {Link} from 'inferno-router';
import {debounce} from 'lodash';
import {format} from 'date-fns';
import InputGroup from '../components/InputGroup';
import Input from '../components/Input';
import Button from '../components/Button';
import * as Api from '../api';
import * as styles from './HomeView.css';

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

const orderByTitleAsc = () => ({ orderBy: 'title', order: 'asc' });
const orderByTitleDesc = () => ({ orderBy: 'title', order: 'desc' });
const orderByLanguageAsc = () => ({ orderBy: 'type', order: 'asc' });
const orderByLanguageDesc = () => ({ orderBy: 'type', order: 'desc' });
const orderByUpdatedAtAsc = () => ({ orderBy: 'updated_at', order: 'asc' });
const orderByUpdatedAtDesc = () => ({ orderBy: 'updated_at', order: 'desc' });

class PastaTable extends Component<PastaTableProps, undefined> {
  toggleOrderByTitle(instance) {
    const nextOrder = instance.props.orderBy == orderByTitleAsc ?
                                                orderByTitleDesc :
                                                orderByTitleAsc;
    instance.props.changeOrderBy(nextOrder);
  }

  toggleOrderByLanguage(instance) {
    const nextOrder = instance.props.orderBy == orderByLanguageAsc ?
                                                orderByLanguageDesc :
                                                orderByLanguageAsc;
    instance.props.changeOrderBy(nextOrder);
  }

  toggleOrderByUpdatedAt(instance) {
    const nextOrder = instance.props.orderBy == orderByUpdatedAtAsc ?
                                                orderByUpdatedAtDesc :
                                                orderByUpdatedAtAsc;
    instance.props.changeOrderBy(nextOrder);
  }

  renderCaret(asc, desc) {
    if (this.props.orderBy === asc) {
      return <span className={styles.AscCaret}/>;
    }
    else if (this.props.orderBy === desc) {
      return <span className={styles.DescCaret}/>;
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th className={styles.PastaHeader}
                onClick={linkEvent(this, this.toggleOrderByTitle)}>
              Title
              { this.renderCaret(orderByTitleAsc, orderByTitleDesc) }
            </th>
            <th className={styles.PastaHeader}
                onClick={linkEvent(this, this.toggleOrderByLanguage)}>
              Language
              { this.renderCaret(orderByLanguageAsc, orderByLanguageDesc) }
            </th>
            <th className={styles.PastaHeader}
                onClick={linkEvent(this, this.toggleOrderByUpdatedAt)}>
              Updated at
              { this.renderCaret(orderByUpdatedAtAsc, orderByUpdatedAtDesc) }
            </th>
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
      pastas: [],
      orderBy: orderByUpdatedAtDesc
    };

    this.debouncedQuery = debounce(this.runQuery.bind(this), QUERY_DELAY);
    this.onOrderByChanged = this.onOrderByChanged.bind(this);
  }

  private onOrderByChanged(orderBy) {
    this.setState({
      orderBy: orderBy
    }, this.runQuery);
  }

  private runQuery() {
    const {order, orderBy} = this.state.orderBy();

    const queryParams = {
      query: this.state.query,
      orderBy: orderBy,
      order: order
    };

    Api.fetchPastaIndex(queryParams)
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
              <Button buttonStyle="small"
                      onClick={() => this.queryChanged('', true)}>X</Button> :
              null
          }
        </InputGroup>

        {
          isLoading ?
            <div>Loading...</div> :
            <PastaTable pastas={pastas}
                        orderBy={this.state.orderBy}
                        changeOrderBy={this.onOrderByChanged} />
        }
      </div>
    );
  }
}
