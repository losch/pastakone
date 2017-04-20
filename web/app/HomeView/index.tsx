import Component from 'inferno-component';
import {format} from 'date-fns';
import * as Api from '../api';

interface Pasta {
  id: string;
  title: string;
  type: string;
  updated_at: string;
}

function PastaRow({id, type, updated_at, title}) {
  return (
    <tr>
      <td><a href={`/pastas/${id}`}>{title}</a></td>
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
            <th>Type</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">
              <a href="/pastas/new">New pasta...</a>
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
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pastas: []
    };
  }

  componentWillMount() {
    document.title = `Pastakone - Hall of Spaghetti`;

    Api.fetchPastaIndex()
      .then(pastas => {
        console.log('Got response', pastas);
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

  render() {
    const {pastas, isLoading} = this.state;

    return (
      <div>
        {
          isLoading ?
            <div>Loading...</div> :
            <PastaTable pastas={pastas} />
        }
      </div>
    );
  }
}
